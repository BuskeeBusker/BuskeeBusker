// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
var circles = [];
var currentInfo = null;
var cardIds =[];

var config = {
    apiKey: "AIzaSyDtYfBRd2SFynGz7FplveLrkgjT1Nqa1dE",
    databaseURL: "https://buskeebusker-656a6.firebaseio.com"
};

firebase.initializeApp(config);
var database = firebase.database();
var info = database.ref("info");

$(document).ready(function() {

});

function getEventFromDB() {
    info.once("value", function(snapshot) {
        if (snapshot.val() != null) {
            var keys = Object.keys(snapshot.val());
            var entries = snapshot.val();
            for (var i = 0; i < keys.length; i++) {
                var obj = entries[keys[i]];
                //console.log(keys[i]);
                //console.log(obj);
                var buskerName = obj["Name"];
                var events = obj["Events"];
                var eventKeys = Object.keys(events);
                for (var j = 0; j <events.length; j++) {
                    var event = events[eventKeys[i]];
                    var locObj = event["Location"];
                    var time = event["StartTime"];
                    var location = {
                        lat: Number(locObj["LTT"]),
                        lng: Number(locObj["LGT"]),
                    };
                    var locationName = locObj["Region"];
                    //console.log(time);
                    //console.log(location)
                    addEvent(location, buskerName, time, locationName);
                    map.setCenter(location);
                }
            }
            if (markers.length != 0) {
                addCircle(markers[markers.length - 1].getPosition());
            }

        }
    })
}



function initMap() {
    //var haightAshbury = {lat: 37.769, lng: -122.446};
    var sinchon = {
        lat: 37.559479,
        lng: 126.943584,
    }

    var sinchon2 = {
        lat: 37.559479,
        lng: 126.942584,
    }

    var sinchon3 = {
        lat: 37.558479,
        lng: 126.943584,
    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: sinchon,
        mapTypeId: 'roadmap',
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addCircle(event.latLng);
        if (currentInfo != null) {
            currentInfo.close();
            currentInfo = null;
        }
    });

    // Adds a marker at the center of the map.
    //addEvent(sinchon);
    //addCircle(sinchon);
    //addEvent(sinchon2);
    //addEvent(sinchon3);

    /*
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var descControlDiv = document.createElement('div');
    var descControl = new DescriptionControl(descControlDiv, map);

    descControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(descControlDiv);
    */

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

    getEventFromDB();
}

// Adds a marker to the map and push to the array.

function addEvent(location, buskerName, time, locationName) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: buskerName,
    });
    marker.buskerName = buskerName;
    marker.time = time;
    marker.locationName = locationName;

    var contentString =
        `<div>
            <h5>${buskerName}</h5>
            ${time}<br/>
            ${locationName}
        </div>`;

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });


    marker.addListener('click', function() {
        if (currentInfo != null) {
            currentInfo.close();
        }
        if (currentInfo != infowindow) {
            infowindow.open(map, marker);
        }
        currentInfo = infowindow;
    });


    markers.push(marker);
}
function addCircle(location) {
    var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 0.3,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: location,
        radius: Math.sqrt(10) * 100
    });
    for (var j = 0; j < markers.length; j++) {
        var marker = markers[j];

        var isSame = false;
        if (circleContainsLocation(cityCircle, marker.getPosition())) {
            for (var i = 0; i < cardIds.length; i++) {
                if (cardIds[i] == marker.buskerName) {
                    isSame = true;
                    break;
                }
            }
            if (!isSame) {
                var card = makeCard(marker.buskerName, marker.time, marker.locationName);
                cardIds.push(marker.buskerName);
                $("#card_content").append(card);
            }
        }
    }

    circles.push(cityCircle);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    circles = [];
    cardIds = [];
    $("#card_content").html("");
}

function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fea6aa';
    controlUI.style.border = '1.5px solid #fea6aa';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to delete all circles';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgba(255,255,255, 0.9)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Delete circles';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        deleteMarkers()
    });
}

function DescriptionControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'How to use';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Click on the map to know about events';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
}

function circleContainsLocation(circle,latlng) {
    var center = circle.getCenter();
    var radius = circle.getRadius();
    return google.maps.geometry.spherical.computeDistanceBetween(latlng, center) <= radius;
}

function makeCard(name, time, location) {
    var card = `
    <div class="ui card fluid">
        <div class="header">${name}</div>
        <div class="description">${time}</div>
        <div class="description">${location}</div>
    </div>
    `

    return card;
}