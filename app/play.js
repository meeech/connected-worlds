define(function (require) {

  var _game;
  var Phaser = require('phaser');
  var draw = require('./draw/index');

  //@todo move dimension into common file
  var SCREEN_HEIGHT = 400;
  var SCREEN_HEIGHT_MIDDLE = SCREEN_HEIGHT * 0.5 ;

  var GALAXY = require('./galaxy');
  var World = require('./world');
  var Planet = require('./planet');

  function init(game) {
    _game = game;
    draw.init(game);
    return this;
  }

  var next_X = 150;
  var yA = 100;
  var yB = 300;


  function text(str, size) {
    size = size || 30;
    var t = _game.add.bitmapText(0, 0, 'carrier_command',str,size);
    return t;
  }

  var choose_text;

  var choice_handler = function(planet, alternate_sprite) {

    return function(sprite) {
      sprite.events.onInputUp.removeAll();

      var alt_tween = _game.add.tween(alternate_sprite).to(
        { alpha: 0 },
        1000,
        Phaser.Easing.Linear.None,
        true
      );

      alt_tween.onComplete.add(function(e){
        e.destroy();
      });

      _game.add.tween(sprite).to(
        {y: SCREEN_HEIGHT_MIDDLE},
        1000,
        Phaser.Easing.Linear.Sinusoidal,
        true
      );

      var world = new World(GALAXY, planet);
      world.sprite = sprite;
      sprite.associatedWorld = world;
      place_choices();
    };

  };

  function place_choices() {

    var choices = {
      A: { planet: new Planet() },
      B: { planet: new Planet() }
    };

    choices.A.sprite = draw.planet(choices.A.planet, next_X, yA);
    choices.B.sprite = draw.planet(choices.B.planet, next_X, yB);
    choices.A.sprite.inputEnabled = true;
    choices.B.sprite.inputEnabled = true;

    choices.A.sprite.events.onInputUp.add(choice_handler(
      choices.A.planet, choices.B.sprite),
    this);
    choices.B.sprite.events.onInputUp.add(choice_handler(
      choices.B.planet, choices.A.sprite),
    this);


    choose_text = choose_text || text('Choose!');
    choose_text.x = next_X - 100;
    choose_text.y = SCREEN_HEIGHT_MIDDLE - 20;

    next_X += 300;
  }


  function start() {
    //Starts with choice of planet

    place_choices();
    // place_choices();
    // place_choices();
    // place_choices();
    // place_choices();
    return this;
  }


  return {
    init: init,
    start: start
  };

});