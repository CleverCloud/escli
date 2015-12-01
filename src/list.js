var cliparse = require("cliparse");

module.exports = function(config, es_request) {

  var shard_list = function() {
    return es_request.r({
      dpath:'_cat/shards?v'
    }).then(console.log);
  };

  var index_list = function() {
    return es_request.r({
      dpath:'_cat/indices?v'
    }).then(console.log);
  };



  return cliparse.command(
    "list", {
      description: "view list of various ES management data",
      commands: [
        cliparse.command(
          "shards", {
            description: "view list of shards"
          }, shard_list),
        cliparse.command(
          "indexes", {
            description: "view list of indexes"
          }, index_list)
      ]
    });
};
