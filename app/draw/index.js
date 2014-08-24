define(function (require) {

  var _game;

  function init(game) {
    _game = game;
  }

  function _planet(planet, x, y){

    var which = planet.getFullTypeKey();
    if(which === 'garden') {
      which = 'garden-w50';
    }

    var sprite = _game.add.sprite(x, y, which);

    sprite.anchor.setTo(0.5, 0.5);
    sprite.scale.setTo(0.5, 0.5);

    return sprite;
  }

  return {
    init: init,
    planet: _planet
  };


});