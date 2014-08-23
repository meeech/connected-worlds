define(function(require, exports, module) {

  var dice = {};
  var random = Math.random;
  var floor = Math.floor;

  var die = function(sides) {
    return 1 + floor(random() * sides);
  };

  var d = {
    '6': function d6() { return die(6); }
  };

  /**
   *
   * @param  {int} type  sides of dice
   * @param  {int} [times=1] how many rolls?
   * @return {int}
   */
  dice.roll = function roll(type, times) {
    times = times || 1;

    var total = 0;
    for (var i = 0; i < times; i++) {
      total += d[type]();
    }

    return total;
  };

  return dice;
});