define(function (require) {
  // Load any app-specific modules
  // with a relative require call,
  // like:
  var _ = require('lodash');
  var Planet = require('./planet');

  var p1 = new Planet();
  console.log(p1);

  var i;
  for (i = 0; i < 20; i++) {
    console.log(new Planet());
  }
/*
  var roll = require('./dice').roll;
  var basesize = 7500;
  var step = 270;
  for (i = 3; i < 19; i++) {
    console.log(i, basesize + i * step);
    var rfactor = _.random(12*i, 13*i);
    var plusminus = _.random(-200, 300);
    console.log(i, basesize + (i * rfactor) + plusminus);
    console.log(basesize + (i * step) + plusminus);

  }
*/



});