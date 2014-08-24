define(function(require) {
  /**
   * World
   *
   * World is made up a of a planet, population, and other incidentals.
   **/

  var _ = require('lodash');
  var roll = require('./dice').roll;
  var min_max = require('./result').min_max;

  var Planet = require('./planet');

  var World = function World(Galaxy){
    this.planet = new Planet() ;
    this.population = this.generatePopulation();
    this.techLevel = this.generateTechLevel(Galaxy.techLevel);
  };

  World.prototype.generatePopulation = function() {

    var affinity = this.planet.affinity;

    if(!affinity) {
      return false;
    }

    var mod = affinity * 3;
    var score = roll(6, 3) + mod;

    return score;

  };

  World.prototype.generateTechLevel = function(baseLevel) {
    var TLs = [
      {max: 3, tl: -8},
      {max: 4, tl: -3},
      {max: 5, tl: -2},
      {min: 6, max: 7, tl: -1},
      {min: 8, max: 15, tl: 0},
      {min: 16, tl: 1}
    ];
    var res = roll(6,3);
  console.log(res);
    var mod = _.find(TLs, min_max(res)).tl;
    return mod + baseLevel;
  };


  //Return the module value
  return World;
});
