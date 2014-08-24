define(function (require) {

  var _ = require('lodash');
  var _game;

  function init(game) {
    _game = game;
  }

  function _planet(planet, x, y){

    var scale = planet.diameter / 10000;
    var which = planet.getFullTypeKey();

    if(which === 'garden') {
      var water = planet.waterCoverage;
      if(water > 90) {
        water = 100;
      } else {
        water = (parseInt(planet.waterCoverage/25, 10) + 1) * 25;
      }
      which = 'garden-w' + water;
    }

    var sprite = _game.add.sprite(x, y, which);

    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.setTo(scale, scale);

    sprite.rotation = _.random(0,360);

    return sprite;
  }

  return {
    init: init,
    planet: _planet
  };


});