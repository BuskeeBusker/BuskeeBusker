$(document).ready(function(){
  var buskerinfos=[];
  var buskerinfodata = firebase.database().ref("/").once("value",function(snapshot){
    buskerinfos = snapshot.val()["info"];
  var buskername= $('#buskername')[0].innerText;
  var curbsk=buskerinfos[0];
  var bskidx=0;
  for(var i=0;i<buskerinfos.length;i++){
    if(buskerinfos[i].Name==buskername){
      curbsk=buskerinfos[i];
      bskidx=i;
    }
  }
  // SNS link// 
  if(curbsk["Facebook"]!=null){
    $('#fb').attr("href",curbsk["Facebook"]);
    $('#fb').attr("style","pointer-event:auto;cursor:auto");
  }
  if(curbsk["Instagram"]!=null){
  $('#insta').attr("href",curbsk["Instagram"]);
  $('#insta').attr("style","pointer-event:auto;cursor:auto");}
  // SNS link finish//

  //Genre link//
  var bskgnr=curbsk["Genre"];
  $('#buskergenre')[0].innerHTML=bskgnr[0]+', '+bskgnr[1];
  //Genre link finish//

  //Event handle//
  var bskevents=curbsk["Events"];
  var events=restructure(bskevents);
  var pastevents=pasteventonly(events);
  var upcomingevents=upcomingeventonly(events);
  //Event handle finish//

//Like, Played//
  var bsklk=curbsk["Likes"];
  $('#like')[0].innerHTML=bsklk;
  var bskvs=curbsk["Views"];
  $('#played')[0].innerHTML=bskvs;
  $('#likebutton')[0].onclick=onemorelike;

  function onemorelike(){
    console.log("Hi")
    var bsklks=firebase.database().ref('info/'+bskidx+'/Likes');
    console.log("bsklks",bsklks);
    bsklks.transaction(function(currlks){
      $('span#like').text(currlks+1);
      return currlks+1;
    });
  }
  //Like, Played finish//

  //Image link//
  var bskimg=curbsk["ProfileImage"];
  $('#buskerimage')[0].src=bskimg;
  //Image link//


  //Recent loca//
  var recentloca=$('#recentloca')[0];
  var geo1=pastevents[0]["ltt"]+','+ pastevents[0]["lgt"];
  var geo2=pastevents[1]["ltt"]+','+pastevents[1]["lgt"];
  var fstloca=pastevents[0]["location"];
  var sndloca=pastevents[1]["location"];
  var fstspan = '<span id="local1">'+fstloca+"</span>"
  var snd = '<span class="map" style="cursor:pointer;" onmouseover="show_popup('+"'"+fstloca.toLowerCase()+"'"+',this)"><i class="fa fa-map-marker" style="color:red;" aria-hidden="true"></i></span>'
  var trd='<span>, '+sndloca+'</span>'
  var four='<span class="map" style="cursor:pointer;" onmouseover="show_popup('+"'"+sndloca.toLowerCase()+"'"+',this)"><i class="fa fa-map-marker" style="color:red;" aria-hidden="true"></i></span>'
  var newlocahtml=fstspan+snd+trd+four;
  recentloca.innerHTML=newlocahtml;
  //Recent loca finish//
  //Upcoming Buskings//
  var table=document.getElementById("futureevents");
  var tleng=table.rows.length;
  for(i=0;i<tleng-1;i++){
    table.deleteRow(1);
  }
  addRows(upcomingevents);
  //Upcomong Buskings finish//

  //Busker Vedio start//
 var videocolumns=document.getElementsByName("videocolumn");
 var videosources=curbsk["Video"];
 for (k=0;k<videosources.length;k++){
  var viid='vi'+(k+1);
  var videoaddr=videosources[k];
  document.getElementById(viid).src='http://img.youtube.com/vi/'+getVideoID(videoaddr)+'/0.jpg'
  getTitle(getVideoID(videoaddr),viid);
}

  //Busker Vedio finish// 

})
})

function getTitle(youtubeId,viid) {
  var youTubeURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+youtubeId+'&key=AIzaSyCzOtBG-a_S95KU7FlMjNnoHutCPOp7POE';
  var json = (function() {
      var json = null;
      $.ajax({
          'async': false,
          'url': youTubeURL,
          'dataType': "json",
          'success': function(data) {
              json = data.items['0'].snippet.title;
              console.log('title_'+viid);
              document.getElementById('title_'+viid).innerHTML = json;
          }
      });
  })();
}

function getVideoID(videoaddr){
  //https://www.youtube.com/embed/RYv1TeUHLz4"
  return videoaddr.trim().split("/")[4]
}

var videosources
var buskerinfos=[];
firebase.database().ref("/").once("value",function(snapshot){
    buskerinfos = snapshot.val()["info"];
    var buskername= $('#buskername')[0].innerText;
    var curbsk=buskerinfos[0];
    var bskidx=0;
    for(var i=0;i<buskerinfos.length;i++){
      if(buskerinfos[i].Name==buskername){
        curbsk=buskerinfos[i];
        bskidx=i;
      }
    }
   videosources=curbsk["Video"];
});

function addRows(schedules){

  var leng=schedules.length;
  for(i=0;i<leng;i++){
    schedule=schedules[i];
    addRow(schedule);
  }}
function addRow(schedule){
  var table=document.getElementById("futureevents");
  var row=table.insertRow(1);
  var date=row.insertCell(0);
  var location=row.insertCell(1);
  var time=row.insertCell(2);
  var weather=row.insertCell(3);
  var fulldate=schedule["Date"];
  date.innerHTML=fulldate.split(",")[0];
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
    newloca=schedule["location"];
    var fstspan = '<span id="local1">'+newloca+"</span>"
    var snd = '<span class="map" style="cursor:pointer;" onmouseover="show_popup('+"'"+newloca.toLowerCase()+"'"+',this)"><i class="fa fa-map-marker" style="color:red;" aria-hidden="true"></i></span>'
 
    location.innerHTML=fstspan+snd;  

}


function pasteventonly(events){
  var schedules=[];
  var today = new Date();
  for(var i=0; i<events.length; i++){
      event=events[i];
      var eventdate=event["Date"];
      if(pastevent(today,eventdate)){
       schedules.push(event);
      }
  }
  return schedules
}
function upcomingeventonly(events){
  var schedules=[];
  var today = new Date();
  for(var i=0; i<events.length; i++){
      event=events[i];
      var eventdate=event["Date"];
      if(!(pastevent(today,eventdate))){
       schedules.push(event);
      }
  }
  return schedules
}

function pastevent(today,eventday){
  bool=false;  
  var todayyear = today.getFullYear();
  var todaymonth= today.getMonth();
  var todaydate = today.getDate();
  var eventmonth=eventday.split(' ')[0];
  var eventdate= eventday.split(' ')[1].split(',')[0];
  var eventyear=eventday.split(' ')[2];
  var monthNames =
    {"January":1, "February":2, "March":3,
    "April":4, "May":5, "June":6, "July":7,
    "August":8, "September":9, "October":10,
    "November":11, "December":12};
  var eventmonthnum=monthNames[eventmonth];
  if(todayyear>eventyear){bool=true;}
  if((todayyear=eventyear)&&(todaymonth>eventmonthnum)){bool=true}
  if((todayyear=eventyear)&&(todaymonth=eventmonthnum)&&(todaydate>eventdate)){bool=true}
  return bool;
}

function restructure(eventsinfos){
  var schedules=[];
  for(var i=0; i<eventsinfos.length; i++){
    event=eventsinfos[i];
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
  return schedules
};

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


function show_popup(location,pos){
  console.log("Hi")
  if (location.trim()=="hongdae"){
    console.log("loc",location);
    $(pos)
    .popup({
      html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 400px; src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=HongdaeStation"></iframe>',
      on: 'click'
    })
  }
  else if (location.trim()=="sinchon"){
    console.log("loc",location);
    $(pos)
    .popup({
      html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 400px; src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=SinchonStation"></iframe>',
      on: 'click'
    })
  }
  else if (location.trim()=="daejeon"){
    console.log("loc",location);
    $(pos)
    .popup({
      html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 400px; src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=SinchonStation"></iframe>',
      on: 'click'
    })
  }
  else if (location.trim()=="gangnam"){
    console.log("loc",location);
    $(pos)
    .popup({
      html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 400px; src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=GangnamStation"></iframe>',
      on: 'click'
    })
  }
  else if (location.trim()=="video"){
    var curid=pos.id
    var curidx=curid[1]-1;
    console.log(videosources);
    videoaddr=videosources[curidx];
    console.log(videoaddr);
       $(pos)
        .popup({
          html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 500px; src="'+ videoaddr + '" allowfullscreen></iframe><br><div class="ui label pink button" style="float:right">Bookmark <i class="empty star icon" /></div>',
          border: 'pink',
          on: 'click'
        })
    }
 
  }
  
  /// Like click increment


// $("#loca1map").click(function () {
//       $("iframe.map").attr(
//         {
//           "src":"https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=HongdaeStation",
//           "width":"400px",
//           "height":"400px"
//         });
//     });
// $("#loca2map").click(function () {
//   $("iframe.map").attr(
//     {
//       "src":"https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=HongdaeStation",
//       "width":"400px",
//       "height":"400px"
//     });
// });
// $("#hongdae3").click(function () {
//   $("iframe.map").attr(
//     {
//       "src":"https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=HongdaeStation",
//       "width":"400px",
//       "height":"400px"
//     });
// });
// $("#sinchon1").click(function () {
//   $("iframe.map").attr(
//     {
//       "src":"https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=SinchonStation",
//       "width":"400px",
//       "height":"400px"
//     });
// });
// $("#sinchon2").click(function () {
//   $("iframe.map").attr(
//     {
//       "src":"https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=SinchonStation",
//       "width":"400px",
//       "height":"400px"
//     });
// });
// $("#gangnam").click(function () {
//   $("iframe.map").attr(
//     {
//       "src":"https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=GangnamStation",
//       "width":"400px",
//       "height":"400px"
//     });
// });
// $("#daejeon").click(function () {
//   $("iframe.map").attr(
//     {
//       "src":"https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=DaejeonStation",
//       "width":"400px",
//       "height":"400px"
//     });
// });
// $("#11").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/mH63DXpHQ70?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#21").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/mH63DXpHQ70?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#11").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/mH63DXpHQ70?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#12").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/M8vgPhi4vPk?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#22").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/M8vgPhi4vPk?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#13").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/H5QvzsCdvts?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#23").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/H5QvzsCdvts?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#14").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/3KSt2MgRLHU?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
// $("#24").click(function () {
//   $("iframe.video").attr({
//     "src":"https://www.youtube.com/embed/3KSt2MgRLHU?html5=1",
//     "width":"600px",
//     "height":"600px"
//   })});
