define(function (require) {

  var number = {};
  var _ = require('lodash');

  var scales = [
    { scale: 1000000000, abbr: 'B' },
    { scale: 1000000, abbr: 'M' },
    { scale: 1000, abbr: 'K' }
  ];

  number.nice = function(value) {
    if(!value) return 0;

    var scale = _.find(scales, function(item) {
      return value > item.scale;
    });

    var nice = (value/scale.scale).toFixed(2);
    return nice + scale.abbr;

  };

  return number;

});