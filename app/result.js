define(function(require) {

  var _ = require('lodash');

  var result = {};

  /**
   * Pull out the result from the map
   */
  result.result = function(res, map) {
    return _.find(map, min_max(res));
  };

  /**
   *
   * Create function which test when value meets min/max
   *   requirement based on res
   * @return {bool}
   */
  function min_max(res){
    return function(value) {
      var min = (value.min !== undefined) ? value.min : -Infinity;
      var max = (value.max !== undefined) ? value.max : Infinity;

      return res >= min && res <= max;
    };
  }
  result.min_max = min_max;

  return result;

});