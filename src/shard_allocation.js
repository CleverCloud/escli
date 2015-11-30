var cliparse = require("cliparse");

module.exports = function(config, es_request) {

  var shard_allocation_enable = function() {
    es_request.shard_allocation(false).then(function(r) {
      console.log(r);
    });
  };

  var shard_allocation_disable = function() {
    es_request.shard_allocation(false).then(function(r) {
      console.log(r);
    });
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
