define(function (require) {

  var Phaser = require('phaser');

  var SCREEN_HEIGHT = 400;
  var SCREEN_HEIGHT_MIDDLE = SCREEN_HEIGHT * 0.5 ;
  var game = new Phaser.Game(800, SCREEN_HEIGHT, Phaser.AUTO, '', {
      preload: preload,
      create: create,
      update: update
    },
    false,
    false
  );

  var cursors;
  // var input;

  var draw = require('./draw/index');
  draw.init(game);

  //Actors
  var Galaxy = require('./galaxy');
  var World = require('./world');

  function preload () {

    var planet_sprites = [
      'barren-ice',
      'barren-rock',
      'desert-ice',
      'desert-rock',
      'garden-w25',
      'garden-w50',
      'garden-w75',
      'garden-w95',
      'hostile-glacier',
      'hostile-subgiant'
    ];

    planet_sprites.forEach(function (name) {
      game.load.image(name, 'img/pixel/' + name + '.png');
    });

    game.load.image('starfield', 'img/pixel/star-bg.png');

  }

  function create () {

    var starfield = game.add.tileSprite(0, 0, 800, 800, 'starfield');
    starfield.fixedToCamera = true;

    for (var i = 0; i < 20; i++) {

      var w1 = new World(Galaxy);
      var x = i * 200 + 20;
      draw.planet(w1.planet, x, SCREEN_HEIGHT_MIDDLE);

    }

    cursors = game.input.keyboard.createCursorKeys();
    game.world.setBounds(0,0,40000, 400);

  }

  function update () {

    if (cursors.left.isDown)
    {
        game.camera.x -= 8;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 8;
    }

    // if (cursors.up.isDown)
    // {
    //     tilesprite.tilePosition.y += 8;
    // }
    // else if (cursors.down.isDown)
    // {
    //     tilesprite.tilePosition.y -= 8;
    // }
  }












  return game;

});