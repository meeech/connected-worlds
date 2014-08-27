define(function (require) {

  var _ = require('lodash');
  var Phaser = require('phaser');


  var SCREEN_HEIGHT = require('./dimensions').height;
  var SCREEN_WIDTH = require('./dimensions').width;

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
  var bgTiles = [];

  //Actors
  var Galaxy = require('./galaxy');

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
    var i, ts;
    var image_width = 800;
    var reps = Math.ceil(SCREEN_WIDTH / image_width);
    for ( i = 0; i < reps; i++) {
      ts = game.add.tileSprite(i * image_width, 0, image_width, 800, 'starfield');
      ts.fixedToCamera = true;
      bgTiles.push(ts);
    }
  }

  function create () {
    create_bg();

    cursors = game.input.keyboard.createCursorKeys();
    mouse = game.input.mousePointer;
    touch = game.input.pointer1;

    // game.world.setBounds(0,0, 400 + (300*Galaxy.worlds.length) , 400);
    game.world.setBounds(0,0, SCREEN_WIDTH , SCREEN_HEIGHT);

    var play = require('./play');
    play.init(game);
    play.start();


  }


  function scrollBgTile(sprite, x, y){
    if(x !== 0) {
      sprite.tilePosition.x += x;
    }

    if(y !== 0) {
      sprite.tilePosition.y += y;
    }
  }

  function scrollBgLeft () {
    _.each(bgTiles, function(sprite){
      scrollBgTile(sprite, -2, 0);
    });
  }

  function scrollBgRight (sprite) {
    _.each(bgTiles, function(sprite){
      scrollBgTile(sprite, 2, 0);
    });
  }

  function update () {

    //Since as we add planets, we need a larger and larger galaxy
    game.world.setBounds(0,0, SCREEN_WIDTH + (300*Galaxy.worlds.length) , 400);

    // Input handling for moving the camera
    if (cursors.left.isDown) {
        game.camera.x -= 8;
        scrollBgLeft();
    } else if (cursors.right.isDown) {
        game.camera.x += 8;
        scrollBgRight();
    }

    move_camera_by_pointer(mouse);
    move_camera_by_pointer(touch);

  }

  //@todo move pointer/controls out
  var start_move_point;
  function move_camera_by_pointer(pointer) {
    if (!pointer.timeDown) { return; }
    if (pointer.isDown && !pointer.targetObject) {
      if (start_move_point) {
        game.camera.x += start_move_point.x - pointer.position.x;
        game.camera.y += start_move_point.y - pointer.position.y;
      }
      start_move_point = pointer.position.clone();
    }
    if (pointer.isUp) { start_move_point = null; }
  }

  return game;

});