function show_popup(location,pos){
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
      html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 400px; src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzHXjfvCCkYIyrEQPvdVOudynW0T_luYY&q=DaejeonStation"></iframe>',
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
    if (pos.id == '1'){
      var srcurl = "https://www.youtube.com/embed/mH63DXpHQ70?html5=1"
        $(pos)
        .popup({
          html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 500px; src="'+srcurl+'" allowfullscreen></iframe>',
          on: 'click'
        })
    }
    else if (pos.id == '2'){
        $(pos)
        .popup({
          html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 500px; src="https://www.youtube.com/embed/M8vgPhi4vPk?html5=1" allowfullscreen></iframe>',
          on: 'click'
        })
    }
    else if (pos.id == '3'){
        $(pos)
        .popup({
          html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 500px; src="https://www.youtube.com/embed/H5QvzsCdvts?html5=1" allowfullscreen></iframe>',
          on: 'click'
        })
      }
    else if (pos.id == '4'){
        $(pos)
        .popup({
          html: '<iframe class="map" frameborder="0" style="border:0" height = 400px; width = 500px; src="https://www.youtube.com/embed/3KSt2MgRLHU" allowfullscreen></iframe>',
          on: 'click'
        })
    }
  }
  
}