var config = {
    apiKey: "AIzaSyDtYfBRd2SFynGz7FplveLrkgjT1Nqa1dE",
    databaseURL: "https://buskeebusker-656a6.firebaseio.com"
};

firebase.initializeApp(config);
var database = firebase.database();
var info = database.ref("info");
var allowLocation = ["All", "Seoul", "Sinchon", "Hongdae", "Itaewon", "Apgujeong", "Seoul/Others"];

$(document).ready(function() {
    getBuskerInfo(true);
    $('.ui.checkbox').checkbox();

	$(".ui.dropdown.filter").dropdown({
          allowCategorySelection: true
	  });
    $(".ui.dropdown.filter").dropdown('set selected', 'All');
    /*
	$("#search-button").on("click", function() {
        $("#search-result").text("1 result is found for the keyword");
		this.html("");
		this.append(`
            <div id="busker0" class="ui message search">
                <div class="row">
                    <div class="ui sixteen wide column grid">
                        <div class="six wide column">
                            <a href = "busker_info.html">
                                <img class="ui image centered" id="search_example1" src="img/BuskerHu.png" style="height: 250px;" />
                            </a>
                        </div>
                        <div class="ten wide column">
                            <div class="row">
                                Name: Seong Jung Hu
                            </div>
                            <div class="row">
                                Genre: R&B
                            </div>
                            <div class="row">
                                Location: Hongdea, Sinchon, Gangnam
                            </div>
                            <div class="row">
                                Hashtags: #subway #guitar
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			`)
        $("#busker0").css("cursor", "pointer");
        $("#busker0").on("click", function() {
            console.log("hi");
            window.location.href = "./busker_info.html";
            });

    }.bind($("#search-content")));
    */

    $("#search-button").on("click", function() {
        getBuskerInfo(false);
    });

});

function getBuskerInfo(isAll) {
    $('#search_box').append(`
      <div class="ui segment" id='loading' style="height: 250px">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading Buskers</div>
        </div>
      </div>`)

    info.once("value", function(snapshot) {
        var buskers = [];
        if (snapshot.val() != null) {
            var keys = Object.keys(snapshot.val());
            var entries = snapshot.val();
            for (var i = 0; i < keys.length; i++) {
                var obj = entries[keys[i]];
                buskers.push(obj);
                //console.log(keys[i]);
                //console.log(obj);
                /*
                var buskerName = obj["Name"];
                var gender = obj["Genre"];
                var hashTag = obj["HashTag"];
                var intro = obj["IntroText"];
                var imageUrl = obj["ProfileImage"];
                */
            }
        }
        if (!isAll) {
            buskers = filterBuskers(buskers);
        }
        $('#loading').remove();
        addBuskersToView(buskers);
    });
}

function filterBuskers(buskers) {
    //console.log("filter start");
    var result, temp;
    var genre = $('input[name="genre"]:checked').val();
    temp = filterBuskersByKey(buskers, "Genre", genre);

    var gender = $('input[name="gender"]:checked').val();
    temp = filterBuskersByKey(temp, "Gender", gender);

    var location = $(".ui.dropdown.filter").dropdown('get value');
    temp = filterBuskersByKey(temp, "Location", location);

    var tag = $("#search-input").val();
    result = filterBuskersByKey(temp, "Name", tag);
    var temp2 = filterBuskersByKey(temp, "HashTag", tag);


    for (var i = 0; i < temp2.length; i++) {
        var temp2Name = temp2[i]["Name"];
        var overlapFlag = false;
        for (var j = 0; j < result.length; j++) {
            var resultName = result[j]["Name"];
            if (resultName == temp2Name) {
                overlapFlag = true;
            }
        }
        if (!overlapFlag) {
            result.push(temp2[i])
        }
    }

    return result;
}

function filterBuskersByKey(buskers, keyName, valueName) {
    var result = [];
    valueName = $.trim(valueName);

    if (keyName == "Location") {
        if (allowLocation.indexOf(valueName) != -1) {
            result = buskers;
        }
        return result;
    }

    if (valueName == "All") {
        result = buskers;
    }
    else {
        for (var i = 0; i < buskers.length; i++) {
            var value = buskers[i][keyName];
            //console.log(keyName);
            //console.log(value);
            //string.indexOf(substring) !== -1; <-- substring is in the string.
            var subString = $.trim(valueName.toLowerCase());
            if (value.constructor == Array) {
                for (var j = 0; j < value.length; j++) {
                    var targetValue = $.trim(value[j].toLowerCase());
                    var mainString = targetValue;
                    if (mainString.indexOf(subString) !== -1) {
                        result.push(buskers[i]);
                        break;
                    }
                }
            } else {
                var mainString = $.trim(value.toLowerCase());

                if (mainString.indexOf(subString) !== -1) {
                    result.push(buskers[i]);
                }
            }
        }
    }
    return result;
}

function addBuskersToView(buskers) {
    var resultNum = buskers.length;
    //console.log(resultNum);
    var message;
    if (resultNum <= 1) {
        message = "Found " + resultNum + " busker in total."
    } else {
        message = "Found " + resultNum + " buskers in total."
    }

    $("#search-result").text(message);
    $("#search-content").html("");

    for (var i = 0; i < buskers.length; i++) {
        //console.log(buskers[i]["Name"]);
        var rowTag = createRow(buskers[i], i);
        var buskerName = $.trim(buskers[i]["Name"]);
        $("#search-content").append(rowTag);
        $("#busker" + i).css("cursor", "pointer");
        $("#busker" + i).on("click", function() {
            //console.log("./busker_info_" + this +".html");
            window.location.href = "./busker_info_" + this +".html";
        }.bind(buskerName));
    }
}

function createRow(obj, id) {
    var buskerName = obj["Name"];
    var gender = obj["Gender"];
    var introText = obj["IntroText"];
    var imageUrl = obj["ProfileImage"];
    var genres = getArrayFromJson(obj["Genre"]);

    var genreString = genres[0];
    for (var i = 1; i < genres.length; i++) {
        genreString += ", " + genres[i];
    }

    var hashTags = getArrayFromJson(obj["HashTag"]);

    var hashTagString = "#" + hashTags[0];
    for (var i = 1; i < hashTags.length; i++) {
        hashTagString += ", " + "#" + hashTags[i];
    }

    var rowTag = `
            <div id="busker${id}" class="ui message search">
                <div class="row">
                    <div class="ui sixteen wide column grid">
                        <div class="six wide column">
                            <a href = "busker_info_${buskerName}.html">
                                <img class="ui image centered" src="${imageUrl}" style="height: 250px;" />
                            </a>
                        </div>
                        <div class="ten wide column">
                            <div class="row">
                                <h2>${buskerName}</h2>
                            </div>
                            <div class="row">
                                Genre: ${genreString}
                            </div>
                            <div class="row">
                                Hashtags: ${hashTagString}
                            </div>
                            
                            <div class="row intro-text">
                                ${introText}
                            </div>
                        </div>
                    </div>
                </div>
			</div>
			`

    return rowTag;
}

function getArrayFromJson(jsonArray) {
    var result = [];
    var entry = jsonArray;
    var keys = Object.keys(entry);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result.push(entry[key]);
    }
    return result;
}