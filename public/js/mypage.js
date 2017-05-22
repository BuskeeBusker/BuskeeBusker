$(document)
  .ready(function() {
  $('#calendar').hide();
  $('.ui.four.cards').hide();
  $('.ui.pointing.menu a.item').on('click', function() {
    if ($(this).text().trim() == "Feed"){
      // read feeds from database and add to segment
      $('.ui.pink.card').show();
      $('#calendar').hide();
      $('.ui.four.cards').hide();
    }
    else if ($(this).text().trim() == "Calendar"){
      $('.ui.pink.card').hide();
      $('.ui.four.cards').hide();
      loadCal();
      $('#calendar').show();
      $('#calendar').fullCalendar('render');

    }
    else {
      showVideo();
      $('.ui.pink.card').hide();
      $('#calendar').hide();
    }
    $(this)  
      .addClass('active')
      .siblings()
      .removeClass('active')
  });
   $('#calendar').fullCalendar({
          header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,basicWeek,basicDay'
          },
          defaultDate: '2017-05-22',
          navLinks: true, // can click day/week names to navigate views
          editable: true,
          eventLimit: true, // allow "more" link when too many events
          events: [
              {
                  title: 'All Day Event',
                  start: '2017-05-22'
              }
          ],
      eventColor: "#ff0095",
      eventTextColor: "rgba(255,255,255,0.9)"
      });

})
function loadCal(){
  // remove all schedules to re-render
  $("#calendar").fullCalendar('removeEventSources');
  // render all events by looping into firebase
  $('#calendar').fullCalendar('renderEvent',{title: 'Test event',start: '2017-05-23'});
  $('#calendar').show();
}

function showVideo() {
  firebase.database().ref('/').once('value').then(function(snapshot){
    console.log(snapshot.val());
  })
  $('.ui.four.cards').show();
}