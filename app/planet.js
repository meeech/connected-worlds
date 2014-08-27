define(function(require) {

  var generate = require('./generate');

  var roll = require('./dice').roll;

  var EARTH_DIAMETER = 7926;

  var Planet = function Planet(){

    this.type = this.generateType();

    this.subtype = this.generate('subtype');
    this.diameter = this.generate('diameter');
    this.density = this.generate('density');
    this.gravity = this.generate('gravity');
    this.resourceValue = this.generate('resourceValue');
    this.climate = this.generate('climate');
    this.waterCoverage = this.generate('waterCoverage');
    this.affinity = this.generate('affinity');

  };

  Planet.prototype.report = function() {};

  Planet.prototype.generate = function(attrib) {
    return generate[attrib](this);
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

  Planet.prototype.generateType = function() {

    var types = require('./tables/planet').types;
    var res = roll(types.roll);
    return generate.result(res, types.table);

  };


  //Return the module value
  return Planet;
});
