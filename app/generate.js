define(function(require) {

  var _ = require('lodash');

  var size = require('./size');
  var density = require('./density');
  var roll = require('./dice').roll;

  var generate = {};

  generate.result = function(result, map) {
    var finder = require('./result').min_max(result);
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
    var subtype = planet.subtype.key || '';

    var calc = size.diameter[type + '-' + subtype] || size.diameter[type];
    if(!calc) {
      console.error('No diameter calculator', type, subtype);
      return 0;
    }
    return calc();
  };

  generate.density = function(planet) {
    // test with garden first...
    var type = planet.type.key;
    if(planet.type.key !== "garden") {
      return 1.0;
    }

    var res = roll(6, 3);

    density.calculate(planet);
    // var mod = density.getModifier('garden', planet.diameter)

    //lookup modifier

  };

  return generate;

});
