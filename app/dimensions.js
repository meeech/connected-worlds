define(function(){

  var SCREEN_HEIGHT = 400;
  var SCREEN_HEIGHT_MIDDLE = SCREEN_HEIGHT * 0.5 ;
  var SCREEN_WIDTH = document.body.offsetWidth || 600;

  return {
    height: SCREEN_HEIGHT,
    middle_y: SCREEN_HEIGHT_MIDDLE,
    width: SCREEN_WIDTH
  };


});