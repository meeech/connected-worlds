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
    if(type !== "garden") {
      return 1.0;
    }

    return density.calculate(planet);
  };

  generate.gravity = function(body) {
    var G = (body.density * body.diameter)/7930;
    return parseFloat(G.toFixed(2));
  };

  generate.resourceValue = function(planet) {
    var rvm = [
      { min: 3, max: 4, rvm: -2, label: "Very Poor"},
      { min: 5, max: 7, rvm: -1, label: "Poor"},
      { min: 8, max: 13, rvm: 0, label: "Average"},
      { min: 14, max: 16, rvm: 1, label: "Rich"},
      { min: 17, max: 18, rvm: 2, label: "Very Rich"},
    ];

    return generate.result(roll(6, 3), rvm);
  };

  generate.climate = function(planet) {
    var climate = require('./climate');
    return climate.calculate(planet);
  };

  //percent
  generate.waterCoverage = function(planet) {

    var coverage = 0;
    var key = planet.getFullTypeKey();
    if(key === 'garden') {
      coverage = _.random(0,100);
    } else if (_.contains(key, 'glacier')) {
      coverage = _.random(0,20);
    } else if (_.contains(key, 'desert-ice')) {
      coverage = _.random(0,100);
    }

    return coverage;

  };

  // simplified. Only garden, working on asumption of relatively similar
  // based life for now.
  generate.affinity = function(planet){
    var aff = 0;
    aff += planet.resourceValue.rvm;
    if(planet.type.key !== 'garden') {
      return aff;
    }

    aff += 3;
    aff += 2; //decent atmosphere

    if(planet.waterCoverage > 29 && planet.waterCoverage < 91 ) {
      aff += 2;
    } else {
      aff += 1;
    }

    var climate = planet.climate;
    if(climate.score > 4 && climate.score < 16) {
      aff += 2;
    } else if(climate.score === 4 || climate.score === 16) {
      aff += 1;
    }

    return aff;

  };

  return generate;

});
