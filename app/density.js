define(function (require) {

  var _ = require('lodash');
  var roll = require('./dice').roll;

  var density = {};

  var density_modifiers = {};

  var min_max = require('./result').min_max;
  density_modifiers['barren-ice'] = [
    {max: 1200, mod: -4},
    {max: 1700, mod: -1},
    {max: 2200, mod: 0},
    {max: 2700, mod: -4},
    {min: 2701, mod: -8}
  ];

  density_modifiers['garden'] = [
    {max: 4750, mod: 15},
    {min: 4751, max: 5250, mod: 8},
    {min: 7751, max: 8250, mod: -1},
    {min: 8251, max: 8750, mod: -4},
    {min: 8751, mod: -8},
  ];

  var large_iron_core = [
    {
      density: 0.8,
      max: 6
    },
    {
      density: 0.9,
      min: 7,
      max: 10
    },
    {
      density: 1.0,
      min: 11,
      max: 14
    },
    {
      density: 1.1,
      min: 15,
      max: 17
    },
    {
      density: 1.2,
      min: 18,
      max: 20
    },
    {
      density: 1.3,
      min: 21,
      max: 23
    },
    {
      density: 1.4,
      min: 24
    }
  ];


  var density_lookup = {
    'barren-ice': 'icy-core',
    'barren-rock': 'small-iron-core',
    'desert-ice': 'icy-core',
    'desert-rock': 'small-iron-core',
    'garden': large_iron_core,
    'hostile-glacier': large_iron_core,
    'hostile-subgiant': large_iron_core
  };


  function getModifier (type, diameter) {
    var mod = _.find(density_modifiers[type], min_max(diameter));

    if(mod) {
      return mod.mod;
    }

    return 0;

  }

  density.calculate = function(planet) {

    var mod = getModifier(planet.type.key, planet.diameter);
    var map = density_lookup[planet.getFullTypeKey()];
    var res = roll(6,3) + mod;

    d = _.find(map, min_max(res) );
    return d.density;
  };

  return density;





});