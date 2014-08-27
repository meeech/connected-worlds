define(function(require) {
  /**
   * World
   *
   * World is made up a of a planet, population, and other incidentals.
   **/

  var _ = require('lodash');

  var number = require('./number');
  var roll = require('./dice').roll;
  var min_max = require('./result').min_max;

  var Planet = require('./planet');
  var Society = require('./society');
  var Economy = require('./economy');

  /**
   * Create a new world in the Galaxy
   * @param {obj} Galaxy
   * @param {Planet} [planet] If no planet provided, will generate one.
   */
  var World = function World(Galaxy, planet){

    this.galaxy = Galaxy;

    this.planet = planet || new Planet();

    this.name = require('./name').planet();

    //Mutually exclusive
    this.isHomeworld = true;
    this.isColony = false;

    this.techLevel = this.generateTechLevel(this.galaxy.techLevel);

    this.capacity = this.generateCapacity();
    this.population = this.generatePopulation();
    this.populationRating = this.generatePR();
    this.growthRate = 0.023;

    this.society = new Society(this);
    this.economy = new Economy(this);

    Galaxy.worlds.push(this);

  };

  World.prototype.report = function(first_argument) {
    return {
      'name': this.name,
      'class': this.planet.getFullTypeKey(),
      'population_rating': this.populationRating,
      'population': number.nice(this.population),
      'overpopulated': this.isOverpopulated(),
      'society_type': this.society.getTypeName()
    };
  };

  World.prototype.isOverpopulated = function(first_argument) {
    return this.population > this.capacity;
  };

  /**
   * @return {int}
   */
  World.prototype.generateCapacity = function() {

    //Tech level based
    var base_cap = {
      0: 10000,
      1: 100000,
      2: 500000,
      3: 600000,
      4: 700000,
      5: 2500000,
      6: 5000000,
      7: 7500000,
      8: 10000000,
      9: 15000000,
      10: 20000000,
      11: 40000000
    };

    //Affinity
    var cap_multiplier = {
      10: 1000,
      9: 500,
      8: 250,
      7: 130,
      6: 60,
      5: 30,
      4: 15,
      3: 8,
      2: 4,
      1: 2,
      0: 1,
      '-1': 0.5,
      '-2': 0.25,
      '-3': 0.13,
      '-4': 0.06,
      '-5': 0.03
    };

    var level = this.techLevel;
    if(level < 0) level = 0;
    if(level > 11) level = 11;

    var aff = this.planet.affinity;
    if(aff < -5) aff = -5;
    if(aff > 10) aff = 10;

    var base = base_cap[level];
    var mult = cap_multiplier[aff] ;
    var dia = Math.pow(this.planet.getEarthDiameters(), 2);

    return Math.floor((base * mult * dia));

  };

  /**
   *
   * @return {int}
   */
  World.prototype.generatePopulation = function() {

    var affinity = this.planet.affinity;

    if(!affinity) {
      // console.log('World uninhabitable.');
      return 0;
    }

    var pop;

    // Homeworld appropriate calc
    if(this.techLevel < 5) {
      pop = ( (roll(6,2) + 3) / 10 ) * this.capacity;
    } else {
      pop = ( this.capacity * 10 ) / roll(6,2);
    }

    return Math.floor(pop);

  };

  /**
   * TL is an offset from the baseLevel
   * @param  {int} baseLevel
   * @return {int}
   */
  World.prototype.generateTechLevel = function(baseLevel) {
    var TLs = [
      {max: 3, tl: -8},
      {max: 4, tl: -3},
      {max: 5, tl: -2},
      {min: 6, max: 7, tl: -1},
      {min: 8, max: 15, tl: 0},
      {min: 16, max: 16, tl: 1},
      {min: 17, max: 17, tl: 2},
      {min: 18, max: 18, tl: 3},
    ];
    var mod = _.find(TLs, min_max(roll(6,3))).tl;
    return mod + baseLevel;
  };


  var log10 = Math.log10;
  if(!log10) {
    log10 = function(value){
      return Math.log(value) / Math.LN10;
    };
  }
  World.prototype.generatePR = function() {

    if(this.population < 1) {
      return 0;
    }
    return parseInt(log10(this.population), 10);

  };


  //Return the module value
  return World;
});
