define(function(require, exports, module) {

  var roll = require('./dice').roll;
  var _ = require('lodash');

  var size = require('./size');
  var diameter = size.diameter;

  var generate = {};

  generate.result = function(result, map) {

    var finder = function(value, index) {
      var min = value.min || -Infinity;
      var max = value.max || Infinity;

      return result >= min && result <= max;
    };

    return _.find(map, finder);
  };

  generate.type = function(planet){

    //4d6
    var types = [
      {
        min: 4,
        max: 9,
        key: "barren",
        label: "Barren"
      },
      {
        min: 10,
        max: 10,
        key: "desert",
        label: "Desert"
      },
      {
        min: 11,
        max: 20,
        key: "garden",
        label: "Garden"
      },
      {
        min: 21,
        max: 24,
        key: "hostile",
        label: "Hostile"
      }
    ];

    var res = roll(6, 4);
    return generate.result(res, types);

  };

  generate.subtype = function(planet) {
    var type = planet.type.key;
    var subtype = {};

    var rock = { key: 'rock', label: 'Rock'};
    var ice = { key: 'ice', label: 'Ice'};
    var glacier = { key: 'glacier', label: 'Glacier'};
    var subgiant = { key: 'subgiant', label: 'Subgiant'};

    if(type === 'barren') {
      subtype = (roll(6,3) < 13) ? rock : ice;
    } else if (type === 'desert') {
      subtype = (roll(6,3) < 14) ? rock : ice;
    } else if (type === 'hostile') {
      subtype = (roll(6,3) < 13) ? glacier : subgiant;
    }

    return subtype;
  };

  generate.diameter = function(planet) {
    var type = planet.type.key;
    var subtype = planet.subtype.key;

    var calc = size.diameter[type + '-' + subtype] || size.diameter[type];
    if(!calc) {
      console.error('No diameter calculator', type, subtype);
      return 0;
    }
    return calc();
  };

  var Planet = function Planet(){

    this.type = this.generate('type');
    this.subtype = this.generate('subtype');
    this.diameter = this.generate('diameter');
    // this.size = generate('size', this);
    // this.density generate('density', this);
    //
    this.fullType = this.getFullType();

  };

  Planet.prototype.generate = function(attrib) {
    return generate[attrib](this);
  };

  Planet.prototype.getFullType = function() {
    return this.type.label + " " + ( this.subtype.label || '' );
  };


  //Return the module value
  return Planet;
});
