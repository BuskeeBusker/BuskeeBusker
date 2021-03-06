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
var initialZoom = 15;

var zoomArray = {20 : 1128.497220,
                19 : 2256.994440,
                18 : 4513.988880,
                17 : 9027.977761,
                16 : 18055.955520,
                15 : 36111.911040,
                14 : 72223.822090,
                13 : 144447.644200,
                12 : 288895.288400,
                11 : 577790.576700,
                10 : 1155581.153000,
                9  : 2311162.307000,
                8  : 4622324.614000,
                7  : 9244649.227000,
                6  : 18489298.450000,
                5  : 36978596.910000,
                4  : 73957193.820000,
                3  : 147914387.600000,
                2  : 295828775.300000,
                1  : 591657550.500000};

$(document).ready(function() {

});

function getEventFromDB() {
    info.once("value", function(snapshot) {
        if (snapshot.val() != null) {
            var keys = Object.keys(snapshot.val());
            var entries = snapshot.val();
            for (var i = 0; i < keys.length; i++) {
                var obj = entries[keys[i]];
                var buskerName = obj["Name"];
                var events = obj["Events"];
                var eventKeys = Object.keys(events);
                for (var j = 0; j <events.length; j++) {
                    var event = events[eventKeys[j]];
                    var locObj = event["Location"];
                    var time = event["StartTime"];
                    time = formatDate(time);
                    var isToday = (time.getDate() == "22");
                    if (!isToday) {
                        continue;
                    }
                    time = matchFormat(time);
                    var location = {
                        lat: Number(locObj["LTT"]),
                        lng: Number(locObj["LGT"]),
                    };
                    var locationName = locObj["Region"];
                    addEvent(location, buskerName, time, locationName);
                    map.setCenter(location);
                }
            }
            if (markers.length != 0) {
                addCircle(markers[0].getPosition());
            }

        }
    });
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
        zoom: initialZoom,
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

    var currentControlDiv = document.createElement('div');
    var currentControl = new CurrentControl(currentControlDiv, map);

    centerControlDiv.index = 3;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(currentControlDiv);

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
    //console.log(map.getZoom());
    var initDistance = zoomArray[initialZoom];
    var currentDisance = zoomArray[map.getZoom()];
    var scaleRatio = currentDisance / initDistance;
    var cityCircle = new google.maps.Circle({
        strokeColor: '#ff69b4',
        strokeOpacity: 0.8,
        strokeWeight: 0.3,
        fillColor: '#ff69b4',
        fillOpacity: 0.35,
        map: map,
        center: location,
        radius: Math.sqrt(10) * 100 * scaleRatio
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
    controlUI.style.backgroundColor = '#ff69b4';
    controlUI.style.border = '1.5px solid #ff69b4';
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
    controlText.style.lineHeight = '44px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Clear Results';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        deleteMarkers()
    });
}

function CurrentControl(controlDiv, map) {
    /*
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#ff69b4';
    controlUI.style.border = '1.5px solid #ff69b4';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to delete all circles';
    controlDiv.appendChild(controlUI);
    */
    var controlBox = document.createElement('div');
    //controlBox.setAttribute("class", "current-location ui icon button");
    controlBox.setAttribute("data-tooltip", "Add users to your feed");
    //controlBox.style.backgroundColor="white";
    //var controlUI = `<i class="location arrow icon"></i>`;
    var controlUI = document.createElement('i');
    controlUI.className += " location";
    controlUI.className += " arrow";
    controlUI.className += " icon";
    controlUI.className += " huge";
    controlUI.style.color = 'rgba(10,10,10, 0.7)';
    controlUI.style.cursor = "pointer";

    controlBox.append(controlUI);
    controlDiv.appendChild(controlBox);
    controlUI.addEventListener('click', function() {
       moveToCurrentPosition();
    });

    /*
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
    */

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
    <div class="ui fluid pink card">
        <div class="header">${name}</div>
        <div class="description"><i class="calendar icon"></i>${time}</div>
        <div class="description"><i class="map pin icon"></i>${location}</div>
    </div>
    `

    return card;
}

function formatDate(date_str) {
    var date_time = date_str.split("T");
    const [year, month, day] = date_time[0].split('-');
    const [hour, min, second] = date_time[1].split(':');

    return new Date(year, month-1, day, hour, min, second);
}

function matchFormat(date) {
    var d = date;
    /*
    var monthNames = [
        "Jan", "Feb", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var time = date.getHours();

    var result = year + "-" + monthIndex + "-" + day + " " + time;
    */
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    var year = d.getFullYear();
    var month = ("0"+(d.getMonth()+1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var result = year + "-" + month + "-" + day + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

    return result;
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
}

function moveToCurrentPosition() {
    //var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            //handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
    }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}