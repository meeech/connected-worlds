define(function(require) {

  var _ = require('lodash');

  var tables = require('./tables/planet');

  var roll = require('./dice').roll;
  var result = require('./result').result;

  var size = require('./size');
  var density = require('./density');

  var EARTH_DIAMETER = 7926;

  var Planet = function Planet(){

    this.type = this.generate('type');

    this.subtype = this.generateSubtype();
    this.diameter = this.generateDiameter();
    this.density = this.generateDensity();
    this.gravity = this.generateGravity();
    this.resourceValue = this.generate('resourceValue');
    this.climate = this.generateClimate();
    this.waterCoverage = this.generateWaterCoverage();
    this.affinity = this.generateAffinity();

  };

  Planet.prototype.report = function() {};

  /**
   * Generate the stats for the attrib
   *
   * By convention, looks for a tables[attrib], from there looks for the roll + data
   * If exists, will do it. When special cases needed, make a specific generateFoo()
   * instead.
   *
   * @param  {[type]} attrib [description]
   * @return {[type]}        [description]
   */
  Planet.prototype.generate = function(attrib) {

    var types = tables[attrib];
    var res = roll(types.roll);
    return result(res, types.choices);

  };

    // simplified. Only garden, working on asumption of relatively similar
  // based life for now.
  Planet.prototype.generateAffinity = function(){
    var aff = 0;
    aff += this.resourceValue.rvm;
    if(this.type.key !== 'garden') {
      return aff;
    }

    aff += 3;
    aff += 2; //decent atmosphere

    if(this.waterCoverage > 29 && this.waterCoverage < 91 ) {
      aff += 2;
    } else {
      aff += 1;
    }

    var climate = this.climate;
    if(climate.score > 4 && climate.score < 16) {
      aff += 2;
    } else if(climate.score === 4 || climate.score === 16) {
      aff += 1;
    }

    return aff;

  };


  Planet.prototype.generateClimate = function() {
    var score = roll(6, 3);
    var c = result(tables.climate.choices, score);
    return _.assign({}, c, {score: score});
  };

  Planet.prototype.generateDensity = function() {
    var type = this.type.key;
    if(type !== "garden") {
      return parseFloat(_.random(0.5, 2.3).toFixed(2));
    }

    return density.calculate(this);

  };

  Planet.prototype.generateDiameter = function() {

    var type = this.type.key;
    var subtype = this.subtype.key || '';

    var calc = size.diameter[type + '-' + subtype] || size.diameter[type];
    if(!calc) {
      console.error('No diameter calculator', type, subtype);
      return 0;
    }

    return calc();

  };

  Planet.prototype.generateGravity = function() {
    var G = (this.density * this.diameter)/EARTH_DIAMETER;
    return parseFloat(G.toFixed(2));
  };

  Planet.prototype.generateSubtype = function() {

    var type = this.type.key;
    var subtype = {};

    var rock = { key: 'rock', name: 'Rock'};
    var ice = { key: 'ice', name: 'Ice'};
    var glacier = { key: 'glacier', name: 'Glacier'};
    var subgiant = { key: 'subgiant', name: 'Subgiant'};

    if(type === 'barren') {
      subtype = (roll(6,3) < 13) ? rock : ice;
    } else if (type === 'desert') {
      subtype = (roll(6,3) < 14) ? rock : ice;
    } else if (type === 'hostile') {
      subtype = (roll(6,3) < 13) ? glacier : subgiant;
    }

    return subtype;

  };

  //percent
  Planet.prototype.generateWaterCoverage = function() {

    var coverage = 0;
    var key = this.getFullTypeKey();
    if(key === 'garden') {
      coverage = _.random(0,100);
    } else if (_.contains(key, 'glacier')) {
      coverage = _.random(0,20);
    } else if (_.contains(key, 'desert-ice')) {
      coverage = _.random(0,100);
    }

    return coverage;

  };

  Planet.prototype.getEarthDiameters = function() {
    return this.diameter / EARTH_DIAMETER;
  };

  Planet.prototype.getFullTypeKey = function() {
    return this.type.key + ( (this.subtype.key) ?  '-' + this.subtype.key : '' );
  };

  Planet.prototype.getFullTypeName = function() {
    return this.type.name + ( (this.subtype.name) ?  '(' + this.subtype.name + ')' : '' );
  };


  //Return the module value
  return Planet;
});
