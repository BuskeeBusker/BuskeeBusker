$(document)
    .ready(function () {
        $('#calendar').show();
        $('.ui.four.cards').hide();
        $('.ui.pink.card').hide();
        $('.ui.pointing.menu a.item').on('click', function () {
            if ($(this).text().trim() == "Post") {
                // read feeds from database and add to segment
                $('.ui.pink.card').show();
                $('#calendar').hide();
                $('.ui.four.cards').hide();
            }
            else if ($(this).text().trim() == "Calendar") {
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
                    title: 'Busking Party',
                    start: '2017-05-22'
                },
                {
                    title: 'Sad Tree',
                    start: '2017-05-07'
                },
                {
                    title: 'May Blossom',
                    start: '2017-05-02'
                }
            ],
            eventColor: "#ff0095",
            eventTextColor: "rgba(255,255,255,0.9)"
        });

        $('.button.remove').on('click', function() {
            $(this).closest('.card').find('.remove.nag').find('span').text('You remove this post!');
            $('.remove.nag').nag('show');
            $(this).closest('.card').hide();
        });
    });

function loadCal() {
    // remove all schedules to re-render
    // $("#calendar").fullCalendar('removeEventSources');
    // render all events by looping into firebase
    $('#calendar').show();
}

function showVideo() {
    firebase.database().ref('/').once('value').then(function (snapshot) {
        console.log(snapshot.val());
    })
    $('.ui.four.cards').show();
}