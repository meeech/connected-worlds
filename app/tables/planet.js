define(function(){

  var tables = {};

  tables.type = {
    roll: '4d6',
    choices: [
      {
        min: 4,
        max: 9,
        key: "barren",
        name: "Barren"
      },
      {
        min: 10,
        max: 10,
        key: "desert",
        name: "Desert"
      },
      {
        min: 11,
        max: 20,
        key: "garden",
        name: "Garden"
      },
      {
        min: 21,
        max: 24,
        key: "hostile",
        name: "Hostile"
      }
    ]
  };

  tables.resourceValue = {
    roll: '3d6',
    choices: [
      { min: 3, max: 4, rvm: -2, name: "Very Poor"},
      { min: 5, max: 7, rvm: -1, name: "Poor"},
      { min: 8, max: 13, rvm: 0, name: "Average"},
      { min: 14, max: 16, rvm: 1, name: "Rich"},
      { min: 17, max: 18, rvm: 2, name: "Very Rich"},
    ]
  };

  tables.climate = {
    choices: [
      { max: 3, name:'Very Cold', temp_min: -20, temp_max: 0 },
      { min: 4, max: 5, name:'Cold', temp_min: 1, temp_max: 20 },
      { min: 6, max: 7, name:'Chilly', temp_min: 21, temp_max: 40 },
      { min: 8, max: 9, name:'Cool', temp_min: 41, temp_max: 60 },
      { min: 10, max: 11, name:'Normal', temp_min: 61, temp_max: 80 },
      { min: 12, max: 13, name:'Warm', temp_min: 81, temp_max: 100 },
      { min: 14, max: 15, name:'Tropical', temp_min: 101, temp_max: 120 },
      { min: 16, max: 17, name:'Hot', temp_min: 121, temp_max: 140 },
      { min: 18, name:'Very Hot', temp_min: 141, temp_max: 160 },
    ]
  };

  return tables;

});