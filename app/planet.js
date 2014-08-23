define(function(require, exports, module) {

  var roll = require('./dice').roll;
  var _ = require('lodash');


  var generate = {};
  generate.result = function(result, map) {

    var finder = function(value, index) {
      return result >= value.min && result <= value.max;
    };
    return _.findKey(map, finder);
  };

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
    return generate.result(res, types);

  };

  generate.subType = function(planet) {
    var subType;
    if(planet.type === 'barren') {
      subType = roll(6,3) < 13 ? 'rock' : 'ice';
    } else if (planet.type === 'desert') {
        subType = roll(6,3) < 14 ? 'rock' : 'ice';
    } else if (planet.type === 'hostile') {
      subType = roll(6,3) < 13 ? 'glacier' : 'subgiant';
    }

    return subType;
  };

  var Planet = function Planet(){

    this.type = this.generate('type');
    this.subType = this.generate('subType');
    // this.size = generate('size', this);
    // this.density generate('density', this);

  };

  Planet.prototype.generate = function(attrib) {
    return generate[attrib](this);
  };

  Planet.prototype.isType = function(type) {
    return type === this.type;
  };


  //Return the module value
  return Planet;
});
