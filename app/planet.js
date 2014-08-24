define(function(require) {

  var generate = require('./generate');

  var EARTH_DIAMETER = 7926;

  var Planet = function Planet(){

    this.type = this.generate('type');

    this.subtype = this.generate('subtype');
    this.diameter = this.generate('diameter');
    this.density = this.generate('density');
    this.gravity = this.generate('gravity');
    this.resourceValue = this.generate('resourceValue');
    this.climate = this.generate('climate');
    this.waterCoverage = this.generate('waterCoverage');
    this.affinity = this.generate('affinity');

    this.fullTypeKey = this.getFullTypeKey();

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

  Planet.prototype.getFullTypeLabel = function() {
    return this.type.label + ( (this.subtype.label) ?  '(' + this.subtype.label + ')' : '' );
  };


  //Return the module value
  return Planet;
});
