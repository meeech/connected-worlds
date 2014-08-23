define(function (require) {
  // Load any app-specific modules
  // with a relative require call,
  // like:
  var Planet = require('./planet');

  var p1 = new Planet();
  console.log(p1);

  for (var i = 0; i < 20; i++) {
    console.log(new Planet());
  };








});