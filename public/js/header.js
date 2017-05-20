$(document)
  .ready(function() {

    if (localStorage.logIn == "true") {
      $('#private_section').append('\
        <div class="item" style="height: 51.425px;">\
          <div class="ui icon pointing tiny dropdown">\
            <img class="ui right spaced avatar image" src="img/elliot.jpg"/> Eliot\
            <i class="dropdown icon"></i>\
            <div class="menu">\
              <div class="item"><a href="mypage.html" style="color:black">My Page</a></div>\
              <div class="item" id="log_out">Log Out</div>\
            </div>\
          </div>\
        </div>'
      );

      $('.ui.dropdown')
      .dropdown()
      ;

      $('#log_out').on('click', function() {
        localStorage.setItem('logIn', false);
        location.reload();
      })

    } else {
      $('#private_section').append('\
        <a class="item" href="login.html" style="height: 51.425px;">\
          <i class="user icon"></i>Log In\
        </a>'
      );
    }
    
  })
  ;