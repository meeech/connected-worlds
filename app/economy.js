define(function (require) {

  var _ = require('lodash');
  var roll = require('./dice').roll;
  var min_max = require('./result').min_max;

  function Economy(World) {

    this.world = World;

    this.perCapita = this.generatePerCapita();
    this.wealthLevel = this.generateWealthLevel();
    console.log(this.wealthLevel);
  }

  var getBasePerCapitaForTech = function(tl) {
    var base = {
      0: 7500,
      1: 7800,
      2: 8100,
      3: 8400,
      4: 9600,
      5: 13000,
      6: 19000,
      7: 25000,
      8: 31000,
      9: 43000,
      10: 67000,
      11: 97000,
      12: 130000
    };
    if(tl > 12) tl = 12;

    return base[tl];

  };

  Economy.prototype.generateWealthLevel = function() {
    var galactic_base = getBasePerCapitaForTech(this.world.galaxy.techLevel);
    var wl = this.perCapita / galactic_base;
    return parseFloat(wl.toFixed(2));
  };

  Economy.prototype.generatePerCapita = function() {

    var planet = this.world.planet;

    var income = getBasePerCapitaForTech(this.world.techLevel);

    var affinity_mod_map = [
      { max: 0, mod: -0.3 },
      { max: 3, mod: -0.2 },
      { max: 6, mod: -0.1 },
      { max: 8, mod: 0 },
      { max: 9, mod: 0.2 },
      { min: 10, mod: 0.4 }
    ];

    var affinity_mod = _.find(affinity_mod_map,min_max(planet.affinity)).mod;
    income += (income * affinity_mod);

    if(this.world.isOverpopulated()) {
      income = parseInt((income * this.world.capacity)/this.world.population, 10);
    }

    var pr = this.world.populationRating;
    var prmod = 0;
    if(pr === 5) {
      prmod = 0.1;
    } else if (pr <= 4) {
      prmod = 0.2;
    }

    income = income - (income * prmod);
    income += _.random(-500, 500);

    return parseInt(income, 10);
  };


  return Economy;

});