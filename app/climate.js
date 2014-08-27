define(function(require) {

  var _ = require('lodash');
  var min_max = require('./result').min_max;
  var roll = require('./dice').roll;

  var climate = {};

  var climate_mapping = [
    { max: 3, name:'Very Cold', temp_min: -20, temp_max: 0 },
    { min: 4, max: 5, name:'Cold', temp_min: 1, temp_max: 20 },
    { min: 6, max: 7, name:'Chilly', temp_min: 21, temp_max: 40 },
    { min: 8, max: 9, name:'Cool', temp_min: 41, temp_max: 60 },
    { min: 10, max: 11, name:'Normal', temp_min: 61, temp_max: 80 },
    { min: 12, max: 13, name:'Warm', temp_min: 81, temp_max: 100 },
    { min: 14, max: 15, name:'Tropical', temp_min: 101, temp_max: 120 },
    { min: 16, max: 17, name:'Hot', temp_min: 121, temp_max: 140 },
    { min: 18, name:'Very Hot', temp_min: 141, temp_max: 160 },
  ];

  climate.calculate = function(planet) {
    var score = roll(6, 3);
    var c = _.find(climate_mapping, min_max(score));
    return _.assign({}, c, {score: score});
  };

  return climate;



});