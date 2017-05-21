$(document)
  .ready(function() {

    $('.ui.dropdown')
    .dropdown()
    ;
    
    $('.menu .item').on('click', function() {
      console.log('a')
    })

    $('.menu .item')
    .tab()
    ;
  })
  ;