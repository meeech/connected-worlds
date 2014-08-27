define(function (require) {

  var _game;
  var Phaser = require('phaser');
  var draw = require('./draw/index');


  //@todo move dimension into common file
  var SCREEN_HEIGHT_MIDDLE = require('./dimensions').middle_y;
  var SCREEN_WIDTH = require('./dimensions').width;

  var GALAXY = require('./galaxy');
  var World = require('./world');
  var Planet = require('./planet');

  function init(game) {
    _game = game;
    draw.init(game);
    return this;
  }

  var next_X = 150;
  var X_step = 300;
  var yA = 100;
  var yB = 300;


  function text(str, size) {
    size = size || 30;
    var t = _game.add.bitmapText(0, 0, 'carrier_command',str,size);
    return t;
  }


  function attach_to_neighbour() {

    var numWorlds = GALAXY.worlds.length;

    if(numWorlds < 2) {
      // console.log('No neighbours');
      return;
    }

    var right = GALAXY.worlds[numWorlds-1].sprite;
    var left = GALAXY.worlds[numWorlds-2].sprite;

    var half_left_buffer = (left.width * 0.5) + 15;
    var half_right_buffer = (right.width * 0.5) + 15;

    var line = new Phaser.Line();
    line.fromSprite(left, right);

    var graphics = _game.add.graphics(0, 0);

    // set a fill and line style
    graphics.beginFill(0x81DAF5);
    graphics.lineStyle(3, 0x81DAF5, 1);

    graphics.moveTo(line.start.x + half_left_buffer, line.start.y);
    graphics.lineTo(line.end.x - half_right_buffer, line.end.y);
    graphics.alpha = 0.5;

    left.bringToTop();
    right.bringToTop();

  }

  function planet_report_sprite(world) {

    var report = world.report();

    var str = [];
    str.push("pop: " + report.population);
    str.push("type: " + report['class']);
    str.push(report.society_type);
    str.push("tech lvl: " + world.techLevel);
    var ts = text(str.join("\n\n"), 9);
    ts.multiline = true;
    ts.align = "center";

    return ts;

  }

  function toggle_sprite_title(sprite) {
    var world = sprite.associatedWorld;

    if(sprite.titleSprite) {
      sprite.titleSprite.destroy();
      sprite.titleSprite = null;
      sprite.reportSprite.destroy();
      sprite.reportSprite = null;
    } else {
      var titleSprite = text(world.name, 10);
      titleSprite.x = sprite.x - (titleSprite.width * 0.5);
      titleSprite.y = sprite.y + (sprite.height * 0.5) + 15;
      sprite.titleSprite = titleSprite;

      var reportSprite = planet_report_sprite(world);
      reportSprite.x = sprite.x - (reportSprite.width * 0.5);
      reportSprite.y = titleSprite.y + titleSprite.height + 20;
      sprite.reportSprite = reportSprite;
    }
  }

  // Give the report on the planet.
  var world_click_handler = function(sprite){
    toggle_sprite_title(sprite);
  };

  var choose_text;

  var choice_handler = function(planet, alternate_sprite) {

    return function(sprite) {
      sprite.events.onInputUp.removeAll();

      var world = new World(GALAXY, planet);
      world.sprite = sprite;
      sprite.associatedWorld = world;

      var alt_tween = _game.add.tween(alternate_sprite).to(
        { alpha: 0 },
        1000,
        Phaser.Easing.Linear.None,
        true
      );

      alt_tween.onComplete.add(function(s){
        s.destroy();
      });

      var s_tween = _game.add.tween(sprite).to(
        {y: SCREEN_HEIGHT_MIDDLE},
        750,
        Phaser.Easing.Linear.Sinusoidal,
        true
      );

      s_tween.onComplete.add(toggle_sprite_title);
      s_tween.onComplete.add(attach_to_neighbour);

      sprite.events.onInputUp.add(world_click_handler, this);

      if(next_X > (SCREEN_WIDTH * 0.75)) {
        _game.add.tween(_game.camera).to({x: _game.camera.x + X_step}, 900, Phaser.Easing.Linear.Sinusoidal, true);
      }

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

    next_X += X_step;
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