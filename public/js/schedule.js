$(document).ready(function() {
	var config = {
  	apiKey: "AIzaSyDtYfBRd2SFynGz7FplveLrkgjT1Nqa1dE",
 	 databaseURL: "https://buskeebusker-656a6.firebaseio.com"
	}
	firebase.initializeApp(config);
	var buskerinfos=[];
	var buskerinfodata = firebase.database().ref("/").once("value",function(snapshot){
		buskerinfos = snapshot.val()["info"];
		var schedules=restructure(buskerinfos);
	$('#buskingcalendar')
		.calendar({
			type: 'date'
		});
	$('.ui.search.dropdown')
  		.dropdown();
  	$('#buskerdetail').hide();
  	$('#locationdetail').hide();

  var today = formatDate(new Date());
  var defaultdate=document.getElementById("selecteddate");
  defaultdate.value=today;
  
  var defaultlocation=document.getElementById("location_dropdown");
  defaultlocation.placeholder='Seoul';
  var curgeo={lat: 40.731, lng: -73.997};
  var selected_date=document.getElementById("selecteddate");
  var selected_region=document.getElementById('location_dropdown');
  
  resultFor(defaultdate.value,defaultlocation.placeholder);

  var defaultschedule=dfschedule(schedules,today,selected_region);  
  addRows(defaultschedule);
  var ssearch=document.getElementById("Schedule_search");
  ssearch.onclick = function(){
  $('#locationdetail').hide();
  $('#buskerdetail').hide();
  var selected_date=document.getElementById("selecteddate");
  var selected_region=document.getElementById('location_dropdown');
  var selected_schedules=filterschedule(schedules,selected_date,selected_region);
  resultFor(selected_date.value,selected_region.options[selected_region.selectedIndex].text);
  var table=document.getElementById("myTable");
  var tleng=table.rows.length;
  for(i=0;i<tleng-1;i++){
		table.deleteRow(1);
	}
  addRows(selected_schedules);

  var infobuttons=document.getElementsByName('info');
 for (i = 0, len = infobuttons.length; i < len; i++){
 	var infobutton=infobuttons[i];
 	infobutton.onclick = function(){
 		var bskname=this.value;
 		for (var j = 0; j < buskerinfos.length; j++){
 		 // look for the entry with a matching `code` value
			  if (buskerinfos[j].Name == bskname){
			  	var mybsk=buskerinfos[j];
			  	var bskimg=mybsk["ProfileImage"];
			  	var bskgnr=mybsk["Genre"];
			  	var bsktg=mybsk["HashTag"];
			  	var bsklk=mybsk["Likes"];
			  	var bskvs=mybsk["Views"];
		  }
		}
 		$('#buskerdetailname')[0].innerHTML= bskname+' <span style="float:right;"><button class="ui button" style="border:0;background-color: #ffffff;padding-left: 10px;padding-top:0px;padding-right:0px" id="closeinfo"><i class="remove icon" style="color:#E91E63;"></i></button></span>';
 		$('#buskerimage')[0].src=bskimg;
 		$('#buskersgenre')[0].innerHTML=bskgnr[0]+', '+bskgnr[1];
 		$('#buskerstag')[0].innerHTML=bsktg[0]+', '+bsktg[1];
 		$('#curlike')[0].innerHTML=bsklk;
		$('#curviews')[0].innerHTML=bskvs;
		var buskerpage='busker_info_'+bskname;
		$('#moreinfo')[0].onclick=function () {
        location.href = buskerpage+".html";
    }
 		$('#buskerdetail').show()
 		var clsinfo=document.getElementById('closeinfo');
 		clsinfo.onclick = function(){
 			$('#buskerdetail').hide();
 		}

 	}.bind(infobutton);
 }
 var mapbuttons=document.getElementsByName("maps");
 for (i = 0, len = mapbuttons.length; i < len; i++){
 	var mapbutton=mapbuttons[i];
 	mapbutton.onclick = function(){
 		var locainfo=this.value;
 		var locaname = locainfo.split(";")[0];
 		var localtt = locainfo.split(";")[1];
 		var localgt = locainfo.split(";")[2];
 		$('#locationname')[0].innerHTML= locaname+' <span style="float:right;"><button class="ui button" style="border:0;background-color: #ffffff;padding-left: 10px;padding-top:0px;padding-right:0px" id="closemap"><i class="remove icon" style="color:#E91E63;"></i></button></span>';
 		curgeo={lat: parseFloat(localtt),lng: parseFloat(localgt)};
 		$('#locationdetail').show()
 		initMap(curgeo);
 		var clsmap=document.getElementById('closemap');
 		clsmap.onclick = function(){
 			$('#locationdetail').hide();
 		}

 	}.bind(mapbutton);
 }



}

})});

function initMap(curgeo) {
    var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: curgeo,
          zoomControl:true
        });

        var geocoder = new google.maps.Geocoder;
        var marker = new google.maps.Marker({
          position: curgeo,
          map: map,
        });
        var add=document.getElementById("locaaddress");
        geocodeLatLng(geocoder, map,add,curgeo);
    }

function geocodeLatLng(geocoder, map,add,curgeo) {
  geocoder.geocode({'location': curgeo}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(15);
        var marker = new google.maps.Marker({
          position: curgeo,
          map: map
        });
        add.innerHTML=results[1].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function resultFor(date,location){
	var title= date+', @'+ location;
  $("#resultfor")[0].innerHTML=title;
}

function addRows(schedules){
	var leng=schedules.length;
	for(i=0;i<leng;i++){
		schedule=schedules[i]["schedule"];
		addRow(schedule);
	}
	$("#resultschedule").show();
	$("#noresultdiv").hide();
	
	if(leng==0){
		$('#resultschedule').hide();
		$("#noresultdiv").show();
	}
}
function addRow(schedule){
	var table=document.getElementById("myTable");
	var row=table.insertRow(1);
	var busker=row.insertCell(0);
	var time=row.insertCell(1);
	var weather=row.insertCell(2);
	var location=row.insertCell(3);
	busker.innerHTML=schedule["busker"] + ' <button class="ui button" style="border:0;background-color:#ffffff;padding-left:10px;margin: 0 auto" name="info" value='+ schedule["busker"] +'><i class="fa fa-info-circle" style="color:#E91E63"></i></button>';
	time.innerHTML=schedule["Time"];
    givenweather=schedule["weather"];
    if(givenweather=='Sunny'){
    	weather.innerHTML='25 &#8451; &emsp; <i class="fa fa-sun-o"></i>';
    }
    if(givenweather=='Cloud'){
    	weather.innerHTML='22 &#8451; &emsp; <i class="fa fa-cloud"></i>';
    }
    var ltt=schedule["ltt"];
    var lgt=schedule["lgt"];
    var geocoord={ltt, lgt};
  	location.innerHTML=schedule["location"]+ '<button class="ui button"  style="border:0;background-color:#ffffff;padding-left:10px;margin: 0 auto" name="maps" value="'+ schedule["location"]+';'+ltt + ';'+lgt +'"><i class="fa fa-map-marker" style="color:#E91E63"></i></button>';
	

}



function filterschedule(schedules,selected_date,selected_region){
	selate=selected_date.value
	m=selate.split(' ')[0];
	d=selate.split(' ')[1].split(',')[0];
	year=selate.split(' ')[2];
	if(Number(d)<10){
		d="0"+d;
	}
	seldate=m +" "+d+", "+year;

	
	var result = [];
	var leng=schedules.length;
	for(i=0;i<leng;i++){
		schedule=schedules[i];
		if ((schedule["City"]==selected_region.value)&&(schedule["Date"]==seldate))
			{result.push({schedule});}
	}
	return result;
}
function dfschedule(schedules,selected_date,selected_region){
	var result = [];
	var leng=schedules.length;
	for(i=0;i<leng;i++){
		schedule=schedules[i];
		if ((schedule["City"]==selected_region.value)&&(schedule["Date"]==selected_date))
			{result.push({schedule});}
	}
	return result;
}
	
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

function reformatDate(year, month,date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var monthIndex = Number(month)-1;
  
  return monthNames[monthIndex] + ' ' + date + ', ' + year;
}
function parseDate(data){
	var date = data.split("T")[0].split("-");
	var year = date[0];
	var month = date[1];
	var day = date[2];
	var time = data.split("T")[1].split(":");
	var hour = time[0];
	var min = time[1];
	return {"year":year,"month":month,"date":day, "hour":hour, "min":min}
}
function restructure(buskerinfos){
	var schedules=[];
	for(var i=0; i<buskerinfos.length; i++){
		item=buskerinfos[i];
		var buskername=item["Name"];
		var events=item["Events"];
		for(var j=0;j<events.length;j++){
			event=events[j];
			var city=event["Location"]["City"];
			var region=event["Location"]["Region"];
			var lat=event["Location"]["LTT"];
			var lgt=event["Location"]["LGT"];
			var dtp=parseDate(event['StartTime']);
			var year=dtp["year"];
			var month=dtp["month"];
			var date=dtp["date"];
			var shour=dtp["hour"];
			var smin=dtp["min"];
			var dtpe=parseDate(event['EndTime']);
			var ehour=dtpe["hour"];
			var emin=dtpe['min'];
			var weather=event["Weather"];
			var newschedule={"busker":buskername, "Date":reformatDate(year,month,date), "City":city, "Time":shour+':'+smin+'-'+ehour+':'+emin, "location":region, "lgt":lgt, "ltt":lat,"weather":weather};
		schedules.push(newschedule);
		}
	}
	return schedules
};
