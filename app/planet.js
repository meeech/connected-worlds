define(function(require, exports, module) {

  var generate = {};

  var roll = require('./dice').roll;

  generate.type = function(planet){

    //4d6
    var types = {
      'barren': {
        min: 4,
        max: 9,
        label: "Barren"
      },
      'desert': {
        min: 10,
        max: 10,
        label: "Desert"
      },
      'garden': {
        min: 11,
        max: 20,
        label: "Garden"
      },
      'hostile': {
        min: 21,
        max: 24,
        label: "Hostile"
      }
    };

    var res = roll(6, 4);
    console.log(res);
  };


  var Planet = function Planet(){

    this.type = this.generate('type');
    // this.subType = generate('subType', this);
    // this.size = generate('size', this);
    // this.density generate('density', this);

  };

  Planet.prototype.generate = function(attrib) {

    this[attrib] = generate[attrib](this);

  };

  // Planet.prototype.initialize = function() {

  // };


  //Return the module value
  return Planet;
});
