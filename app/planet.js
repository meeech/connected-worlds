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

    var subTypes = {};
    subTypes.hostile = {
      'subgiant': {
        min: 3,
        max: 4,
        label: 'Subgiant'
      },
      'ice': {
        min: 5,
        max: 6,
        type: 'desert',
        label: 'Ice'
      },
      'glacier': {
        min: 7,
        max: 9,
        label: 'Glacier'
      },
      'pregarden': {
        min: 10,
        max: 15,
        label: 'Pre-Garden'
      },
      'greenhouse': {
        min: 16,
        max: 18,
        label: 'Greenhouse'
      }
    };
    subTypes.desert = {
      'rock': {
        min: 3,
        max: 18,
        label: 'Rock'
      },

    };

    var subTypeMap = subTypes[planet.type];
    if(subTypeMap) {
      var sub = generate.result(roll(6, 3), subTypeMap);
      var submap = subTypeMap[sub];

      // Possible for a subtype to change the primary type
      planet.type = submap.type || planet.type;
      if(submap.type) {
        planet.type = submap
      }


    } else {
      return planet.type;
    }
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
