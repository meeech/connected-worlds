define(function (require) {

  var _ = require('lodash');
  var roll = require('./dice').roll;
  var min_max = require('./result').min_max;

  function Society(World) {

    this.world = World;

    this.unity = this.generateUnity();
    this.type = this.generateType();

  }

  Society.prototype.getTypeKey = function() {
    var s = this.type.key;
    if(this.type.modifier) {
      s = s + '-' + this.type.modifier.key;
    }
    return s;
  };

  Society.prototype.getTypeName = function() {
    var s = this.type.name;
    if(this.type.modifier) {
      s = s + ' ' + this.type.modifier.name;
    }
    return s;
  };

  Society.prototype.generateType = function() {

    var mapping = [
      {
        key: 'anarchy',
        max: 6,
        name: 'Anarchy'
      },
      {
        key: 'tribal',
        min: 7,
        max: 8,
        name: 'Tribal'
      },
      {
        key: 'caste',
        min: 9,
        max: 9,
        name: 'Caste'
      },
      {
        key: 'feudal',
        min: 10,
        max: 11,
        name: 'Feudal'
      },
      {
        key: 'theo',
        min: 12,
        max: 15,
        name: 'Theocratic'
      },
      {
        key: 'repdem',
        min: 16,
        max: 18,
        name: 'Democratic'
      },
      {
        key: 'athdem',
        min: 19,
        max: 20,
        name: 'Democratic'
      },
      {
        key: 'corp',
        min: 21,
        max: 22,
        name: 'Corporate'
      },
      {
        key: 'techno',
        min: 23,
        max: 25,
        name: 'Tehnocratic'
      },
      {
        key: 'caste',
        min: 26,
        max: 27,
        name: 'Caste'
      },
      {
        key: 'anarchy',
        min: 28,
        name: 'Anarchy'
      }
    ];

    var res = roll(6,3) + this.world.techLevel;
    var type = _.find(mapping, min_max(res));

    var modifier_mappings = [
      {
        key: 'military',
        max: 8,
        name: 'Military Government'
      },
      {
        key: 'socialist',
        min: 9,
        max: 12,
        name: 'Socialist'
      },
      {
        key: 'bureaucracy',
        min: 13,
        max: 14,
        name: 'Bureaucracy'
      },
      {
        key: 'matriarchy',
        min: 15,
        max: 15,
        name: 'matriarchy'
      },
      {
        key: 'utopia',
        min: 16,
        max: 17,
        name: 'matriarchy'
      },
      {
        key: 'cyber',
        min: 18,
        name: 'Cybercracy'
      }

    ];

    var modified = _.find(modifier_mappings, min_max(roll(6,3)));
    return _.assign({}, type, { modifier: modified});
  };

  Society.prototype.generateUnity = function() {

    var mapping = [
      { max: 5, key: 'diffuse'},
      { max: 6, key: 'factions'},
      { max: 7, key: 'coalition'},
      { min: 8, key: 'world'}
    ];

    var res = roll(6,2);
    return _.find(mapping, min_max(res)).key;

  };

  return Society;

});