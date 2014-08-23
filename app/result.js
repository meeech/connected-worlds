define(function() {

  var result = {};

  /**
   *
   * Create function which test when value meets min/max
   *   requirement based on res
   * @return {bool}
   */
  result.min_max = function(res){
    return function(value) {
      var min = value.min || -Infinity;
      var max = value.max || Infinity;

      return res >= min && res <= max;
    };
  };

  return result;

});