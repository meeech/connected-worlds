define(function (require) {

  var Phaser = require('phaser');

  var SCREEN_HEIGHT = 400;
  var SCREEN_HEIGHT_MIDDLE = SCREEN_HEIGHT * 0.5 ;
  var SCREEN_WIDTH = document.body.offsetWidth || 600;
  var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, '', {
      preload: preload,
      create: create,
      update: update
    },
    false,
    false
  );

  var cursors;
  var mouse;
  var touch;
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
      'garden-w100',
      'hostile-glacier',
      'hostile-subgiant'
    ];

    planet_sprites.forEach(function (name) {
      game.load.image(name, 'img/pixel/' + name + '.png');
    });

    game.load.image('starfield', 'img/pixel/star-bg.png');

    game.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');


  }

  function create_bg () {
    var i;
    var image_width = 800;
    var reps = Math.ceil(SCREEN_WIDTH / image_width);
    for ( i = 0; i < reps; i++) {
       game.add.tileSprite(i * image_width, 0, image_width, 800, 'starfield').fixedToCamera = true;
    }
  }

  function create () {
    create_bg();

    // var i;
    // for ( i = 0; i < 10; i++) {

    //   var w1 = new World(Galaxy);
    //   var x = i * 200 + 50;
    //   draw.planet(w1.planet, x, SCREEN_HEIGHT_MIDDLE);

    // }

    cursors = game.input.keyboard.createCursorKeys();
    mouse = game.input.mousePointer;
    touch = game.input.pointer1;

    // game.world.setBounds(0,0, 400 + (300*Galaxy.worlds.length) , 400);
    game.world.setBounds(0,0, SCREEN_WIDTH , 400);

    var play = require('./play');
    play.init(game);
    play.start();


  }

  function update () {

    game.world.setBounds(0,0, SCREEN_WIDTH + (300*Galaxy.worlds.length) , 400);

    if (cursors.left.isDown) {
        game.camera.x -= 8;
    } else if (cursors.right.isDown) {
        game.camera.x += 8;
    }

    move_camera_by_pointer(mouse);
    move_camera_by_pointer(touch);

  }

  //@todo move pointer/controls out
  var o_mcamera;
  function move_camera_by_pointer(o_pointer) {
    if (!o_pointer.timeDown) { return; }
    if (o_pointer.isDown && !o_pointer.targetObject) {
      if (o_mcamera) {
        game.camera.x += o_mcamera.x - o_pointer.position.x;
        game.camera.y += o_mcamera.y - o_pointer.position.y;
      }
      o_mcamera = o_pointer.position.clone();
    }
    if (o_pointer.isUp) { o_mcamera = null; }
  }

  return game;

});