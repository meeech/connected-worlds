define(function (require) {

  var Phaser = require('phaser');

  var game = new Phaser.Game(800,600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  }) ;

  function preload () {
    // body...
  }

  function create () {

  }

  function update () {
    // body...
  }

  return game;

});