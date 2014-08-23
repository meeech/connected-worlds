/*jshint sub:true */
define(function(require){
  // All values in miles
  var roll = require('./dice').roll;
  var _ = require('lodash');


  var diameter = {};

  /**
   * Calculate diameter
   * @param  {[type]} basesize [description]
   * @param  {[type]} step     [description]
   * @param  {[type]} [result=3d6]   result of dice roll
   * @return {[type]}          [description]
   */
  function generic(basesize, step, result) {
    result = result || roll(6,3);
    var plusminus = _.random(-200, 300);
    return basesize + (result * step) + plusminus;
  }

  diameter['barren-ice'] = function() {
    var res = roll(6,3);
    return generic(800, _.random(6*res, 8*res), res);
  };

  diameter['barren-rock'] = function() {
    var res = roll(6,3);
    return generic(800, _.random(8*res, 11*res), res);
  };

  diameter['desert-ice'] = function() {
    var res = roll(6,3);
    return generic(2600, _.random(10*res, 11*res), res);
  };

  diameter['desert-rock'] = function() {
    var res = roll(6,3);
    return generic(2500, _.random(6*res, 9*res), res);
  };

  diameter['hostile-glacier'] = function() {
    return generic(3500, 270);
  };

  diameter['hostile-subgiant'] = function() {
    var res = roll(6,3);
    return generic(7500, _.random(12*res, 13*res), res);
  };

  diameter['garden'] = function() {
    var res = roll(6,3);
    return generic(4300, _.random(13*res, 19*res), res);
    // return generic(4300, 290);
  };


  return {
    diameter: diameter
  };

});