define(function (require) {

  var Galaxy = {
    techLevel: 9
  };

  var World = require('./world');
  // var Planet = require('./planet');

  var i;
  for (i = 0; i < 20; i++) {
    var w = new World(Galaxy);
    console.log(w.report(), w);
  }

/*  var roll = require('./dice').roll;
  var basesize = 7500;
  var step = 300;
  for (i = 0; i < 20; i++) {

    var total = basesize + (i * step);
    var rfactor = _.random(1*i, 2*i);

    console.log(i, total, rfactor);
    var plusminus = _.random(-200, 300);
    // console.log(i, basesize + (i * rfactor) + plusminus);
    // console.log(basesize + (i * step) + plusminus);
  }
*/
// var roll = require('./dice').roll;
// var coll = {};
// for (var i = 0; i < 1000; i++) {
//   var r = roll(6,3);
//   coll[r] = coll[r] || 1;
//   coll[r]++;
// };
// console.log(coll);

});