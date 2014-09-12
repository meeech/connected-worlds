define({

  trade_constant: 0.00000000001,

  // base TL for game
  techLevel: 9,

  // keep track of all worlds
  worlds: [],

  //Keep track of world connections
  //Info about world relations
  // eg:
  // {uuid_a-uuid_b: {
  //  distance: (in parsecs)
  // }}
  connections: {},

  getConnection: function(world_a, world_b) {
    var key = world_a.uuid + '-' + world_b.uuid;
    this.connections[key] = this.connections[key] || {};
    return this.connections[key];
  }

});