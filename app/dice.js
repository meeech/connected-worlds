define(function(require, exports, module) {

  var dice = {};
  var rnd;

  dice.init = function init(game) {
    rnd = game.rnd;
  };

  // @todo replace with phaser.rnd
  var die = function(sides) {
    return rnd.between(1, sides);
  };


  /**
   *
   * @param  {int|string} type string: NdX, eg: 4d6, 3d4
   *                           int: sidedness of dieint: type sides of dice
   * @param  {int} [times=1] how many rolls
   * @return {int}
   */
  dice.roll = function roll(type, times) {

    if(typeof type === 'string') {
      var NdX = type.split('d');
      times = NdX[0];
      type = NdX[1];
    }

    times = times || 1;

    var total = 0;
    for (var i = 0; i < times; i++) {
      total += die(type);
    }

    return total;
  };

  return dice;
});