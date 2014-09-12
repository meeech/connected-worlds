define(function (require) {

  var GALAXY;

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

      // console.log(i, left,current,right);

    }


  };



  var calculate_trade = function(world_a, world_b) {

    var economy_a, economy_b;
    var connection = GALAXY.getConnection(world_a, world_b);




  };



  return step;


});