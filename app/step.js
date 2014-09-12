define(function (require) {

  var GALAXY;
  var number = require('./number');

  var step = function(_galaxy) {

    GALAXY = _galaxy;

    var worlds = GALAXY.worlds;
    var num_worlds = worlds.length;

    if(num_worlds <2) {
      console.log('Not enough worlds');
      return;
    }

    var i;
    var left, right, current;
    for (i = 1; i < worlds.length; i++) {

      left = worlds[i-1];
      current = worlds[i];
      right = worlds[i+1];

      calculate_trade(left, current);

    }


  };

  var calculate_trade = function(world_a, world_b) {

    var economy_a = world_a.economy,
        economy_b = world_b.economy;

    var connection = GALAXY.getConnection(world_a, world_b);

    var trade_volume = (GALAXY.trade_constant * economy_a.economicVolume * economy_b.economicVolume) / (connection.distance * 100);

    connection.trade_volume = trade_volume;

    console.log(economy_a, number.nice(trade_volume.toFixed(2)));


  };



  return step;


});