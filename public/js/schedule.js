var infos = [
{"busker":"SeongJungHu","Date":"May 11, 2017","City":"SEL","Time":"1300-1500","location":"Hongdae", "weather":"sunny"},
{"busker":"BuskerBusker","Date":"May 11, 2017","City":"SEL","Time":"1400-1600","location":"Sinchon", "weather":"sunny"},
{"busker":"SoundBox","Date":"May 10, 2017", "City":"SEL","Time":"1600-1700","location":"Hongdae", "weather":"sunny"},
{"busker":"Acoustic Collabo","Date":"May 10, 2017", "City":"DJN","Time":"1800-1900","location":"Hongdae", "weather":"sunny"},
{"busker":"Sopoong","Date":"May 10, 2017","City":"DJN", "Time":"2000-2100","location":"Hongdae", "weather":"sunny"},
{"busker":"SeongJungHu","Date":"May 11, 2017","City":"DJN","Time":"1300-1500","location":"Hongdae", "weather":"sunny"},
{"busker":"BuskerBusker","Date":"May 11, 2017","City":"SEL","Time":"1400-1600","location":"Sinchon", "weather":"sunny"},
{"busker":"SoundBox","Date":"May 9, 2017", "City":"DJN","Time":"1600-1700","location":"Hongdae", "weather":"sunny"},
{"busker":"Acoustic Collabo","Date":"May 9, 2017", "City":"DJN","Time":"1800-1900","location":"Hongdae", "weather":"sunny"},
{"busker":"Sopoong","Date":"May 11, 2017","City":"SEL", "Time":"2000-2100","location":"Hongdae", "weather":"sunny"},
{"busker":"SeongJungHu","Date":"May 8, 2017","City":"ICN","Time":"1300-1500","location":"Sinchon", "weather":"sunny"},
{"busker":"BuskerBusker","Date":"May 9, 2017","City":"SEL","Time":"1400-1600","location":"Hongdae", "weather":"sunny"},
{"busker":"SoundBox","Date":"May 11, 2017", "City":"DJN","Time":"1600-1700","location":"Sinchon", "weather":"sunny"},
{"busker":"Acoustic Collabo","Date":"May 9, 2017", "City":"DJN","Time":"1800-1900","location":"Eunheang", "weather":"sunny"},
{"busker":"Sopoong","Date":"May 9, 2017","City":"SEL", "Time":"2000-2100","location":"Sinchon", "weather":"sunny"},
{"busker":"SeongJungHu","Date":"May 9, 2017","City":"SEL","Time":"1300-1500","location":"Hongdae", "weather":"sunny"},
{"busker":"BuskerBusker","Date":"May 9, 2017","City":"DJN","Time":"1400-1600","location":"Eunheang", "weather":"sunny"},
{"busker":"SoundBox","Date":"May 9, 2017", "City":"DJN","Time":"1600-1700","location":"Eunheang", "weather":"sunny"},
{"busker":"Acoustic Collabo","Date":"May 9, 2017", "City":"SEL","Time":"1800-1900","location":"Hongdae", "weather":"sunny"},
{"busker":"Sopoong","Date":"May 10, 2017","City":"BSN", "Time":"2000-2100","location":"Hongdae", "weather":"sunny"},
{"busker":"SoundBox","Date":"May 10, 2017","City":"BSN", "Time":"2000-2100","location":"Hongdae", "weather":"sunny"}
]

$(document).ready(function() {
	$('#buskingcalendar')
		.calendar({
			type: 'date'
		});
	$('.ui.search.dropdown')
  		.dropdown();
  var schedules=infos;
  var today = formatDate(new Date());
  var defaultdate=document.getElementById("selecteddate");
  defaultdate.placeholder=today;
  
  var defaultlocation=document.getElementById("location_dropdown");
  defaultlocation.placeholder='Seoul';

  var selected_date=document.getElementById("selecteddate");
  var selected_region=document.getElementById('location_dropdown');
  
  var defaultschedule=dfschedule(schedules,today,selected_region);  
  addRows(defaultschedule);

var ssearch=document.getElementById("Schedule_search");
  ssearch.onclick = function(){
  var selected_date=document.getElementById("selecteddate");
  var selected_region=document.getElementById('location_dropdown');
  var selected_schedules=filterschedule(schedules,selected_date,selected_region);
  console.log(selected_schedules);
  var table=document.getElementById("myTable");
  var tleng=table.rows.length;
  for(i=0;i<tleng-1;i++){
		table.deleteRow(1);
	}
  addRows(selected_schedules);
 }


});
function addRows(schedules){
	var leng=schedules.length;
	for(i=0;i<leng;i++){
		schedule=schedules[i]["schedule"];
		addRow(schedule);
	}
}
function addRow(schedule){
	var table=document.getElementById("myTable");
	var row=table.insertRow(1);
	var busker=row.insertCell(0);
	var time=row.insertCell(1);
	var weather=row.insertCell(2);
	var location=row.insertCell(3);
	busker.innerHTML=schedule["busker"];
	time.innerHTML=schedule["Time"];
	weather.innerHTML=schedule["weather"];
	location.innerHTML=schedule["location"];
	

}
function filterschedule(schedules,selected_date,selected_region){
	var result = [];
	var leng=schedules.length;
	for(i=0;i<leng;i++){
		schedule=schedules[i];
		if ((schedule["City"]==selected_region.value)&&(schedule["Date"]==selected_date.value))
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