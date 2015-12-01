var cliparse = require("cliparse");

module.exports = function(config, es_request) {

  var shard_allocation_enable = function() {
    return es_request.r({
      dpath: '_settings',
      method: 'PUT',
      json: {
        "index.routing.allocation.disable_allocation": false//,
//        'cluster.routing.rebalance.enable': 'all'
      }
    }).then(console.log);
  };

  var shard_allocation_disable = function() {
    return es_request.r({
      dpath: '_settings',
      method: 'PUT',
      json: {
        "index.routing.allocation.disable_allocation": true //,
  //      'cluster.routing.rebalance.enable': 'none'
      }
    }).then(console.log);
  };



  return cliparse.command(
    "shard_allocation", {
      description: "shards allocation management",
      commands: [
        cliparse.command(
          "enable", {
            description: "enable auto shards allocation"
          }, shard_allocation_enable),
        cliparse.command(
          "disable", {
            description: "disable auto shards allocation"
          }, shard_allocation_disable)
      ]
    });
};
