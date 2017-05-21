$(document)
  .ready(function() {

    var posts_array = []

    $('.menu .item')
    .tab()
    ;

    var reply_templete = `
    <div class="ui comments">
              <div class="comment">
                <a class="avatar">
                  <img src="img/elliot.jpg">
                </a>
                <div class="content" style="padding-bottom: 0px">
                  <a class="author">Stevie Feliciano</a>
                  <div class="metadata">
                    <div class="date">2 hours ago</div>
                    <div class="rating">
                      <i class="star icon"></i>
                      5 Faves
                    </div>
                  </div>
                  <div class="text">
                    Enjoy
                  </div>
                </div>
              </div>
              <div class="comment">
                <a class="avatar">
                  <img src="img/elliot.jpg">
                </a>
                <div class="content" style="padding-bottom: 0px">
                  <a class="author">Stevie Feliciano</a>
                  <div class="metadata">
                    <div class="date">2 hours ago</div>
                    <div class="rating">
                      <i class="star icon"></i>
                      5 Faves
                    </div>
                  </div>
                  <div class="text">
                    Hey guys, I hope you hear her songs!!
                  </div>
                </div>
              </div>
            </div>
    `

    var config = {
          apiKey: "AIzaSyDtYfBRd2SFynGz7FplveLrkgjT1Nqa1dE",
          databaseURL: "https://buskeebusker-656a6.firebaseio.com"
        }

    firebase.initializeApp(config);
    var database = firebase.database();
    infoRef = database.ref("info");

    infoRef.once("value", function(newData) {
      info = newData.val();
      Object.keys(info).map(function(key) {
        pic = info[key]['Pic'];
        posts = info[key]['Posts']
        posts.forEach(function(currentValue) {

          var id = getRandomId()
          var name = info[key]['Name']
          var time = timeSince(formatDate(currentValue.DateTime));
          var type = 'singer';
          var content = currentValue.Contents;
          var like = currentValue.Likes;
          var star = currentValue.Stars;
          var busking_info = '';

          if (currentValue.Busking !== undefined) {
            var title = currentValue.Busking.title;
            var event_location = currentValue.Busking.location;
            var event_time = currentValue.Busking.time;
            var buskers = currentValue.Busking.buskers;
            var fee = currentValue.Busking.fee;

            var card_templete = `
              <div class="ui fluid pink card">
                <div class="content">
                <div class="pink header" style="color: #FF0095"> <i class="info icon"></i> Busking - ${title}</div>
                  <div class="meta"></div>
                  <div class="description">
                    <div class="ui list">
                      <div class="item">
                        <div class="content">
                          <div class="ui fluid pink label">
                            <i class="calendar icon"></i> ${event_time}
                          </div>
                        </div>
                      </div>
                      <div class="item">
                        <div class="content">
                          <div class="ui fluid label">
                            <i class="at icon"></i> ${event_location}
                          </div>
                        </div>
                      </div>
                      <div class="item">
                        <div class="content">
                          <div class="ui fluid label">
                            <i class="users icon"></i> ${buskers}
                          </div>
                        </div>
                      </div>
                      <div class="item">
                        <div class="content">
                          <div class="ui fluid label">
                            <i class="dollar icon"></i> ${fee}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `

            busking_info = card_templete;

          }

          var post_templete = `
              <div class="ui pink card" id=${id}>
                  <div class="content">
                    <div class="header">
                      <a class="image" href="#">
                        <img class="ui avatar image" src=${pic}>
                      </a>
                      ${name}
                      <div class="ui icon top right floated pointing dropdown basic button">
                        <i class="pink pin icon"></i>
                        <div class="menu">
                          <div class="item">Pin this busker</div>
                          <div class="item">Pin this busking</div>
                          <div class="item">Pin this post</div>
                        </div>
                      </div>
                    </div>
                    <div class="meta">
                      <span class="right floated time">${time}</span>
                      <span class="category">${type}</span>
                    </div>
                    <div class="description">
                      ${busking_info}
                      <p>
                        ${content}
                      </p>
                    </div>
                  </div>
                  <div class="extra content">
                    <i class="like icon"></i>
                    ${like}
                    <div class="right floated">
                      <i class="star icon"></i>
                      ${star}
                    </div>
                  </div>
                  <div class="ui styled fluid accordion">
                    <div class="title">
                      <i class="comment icon"></i>
                      See comments
                    </div>
                    <div class="content">
                      Sorry, No comments
                    </div>
                  </div>
                </div>
              `

          posts_array.push(post_templete);
          // $('.eleven.wide.column').append(post_templete);
        })

          
      });

  $('#loading').remove();

  shuffleArray(posts_array).forEach(function(currentValue) {
    $('.eleven.wide.column').append(currentValue);
  })

  $('.ui.dropdown')
  .dropdown()
  ;

  $('.ui.accordion')
  .accordion()
  ;

  $('.nag')
  .nag('show')
  ;

  $('.extra.content .like.icon').on('click', function() {
    console.log('like')
  })

  $('.extra.content .star.icon').on('click', function() {
    console.log('star')
  })

    });

  })
  ;

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

function formatDate(date_str) {
  var date_time = date_str.split("T");
  const [year, month, day] = date_time[0].split('-');
  const [hour, min, second] = date_time[1].split(':');

  return new Date(year, month-1, day, hour, min, second);
}

function getRandomId() {
  return Math.floor(Math.random() * (10000 - 0));
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
