define(function(require) {

  var _ = require('lodash');
  var min_max = require('./result').min_max;
  var roll = require('./dice').roll;

  var climate = {};

  var climate_mapping = [
    { max: 3, label:'Very Cold', temp_min: -20, temp_max: 0 },
    { min: 4, max: 5, label:'Cold', temp_min: 1, temp_max: 20 },
    { min: 6, max: 7, label:'Chilly', temp_min: 21, temp_max: 40 },
    { min: 8, max: 9, label:'Cool', temp_min: 41, temp_max: 60 },
    { min: 10, max: 11, label:'Normal', temp_min: 61, temp_max: 80 },
    { min: 12, max: 13, label:'Warm', temp_min: 81, temp_max: 100 },
    { min: 14, max: 15, label:'Tropical', temp_min: 101, temp_max: 120 },
    { min: 16, max: 17, label:'Hot', temp_min: 121, temp_max: 140 },
    { min: 18, label:'Very Hot', temp_min: 141, temp_max: 160 },
  ];

  climate.calculate = function(planet) {
    return _.find(climate_mapping, min_max(roll(6, 3)));
  };

  return climate;



});