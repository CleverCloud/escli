var cliparse = require("cliparse");

module.exports = function(config, es_request) {

  var open_index = function(call_data) {
    if (call_data.args.length < 1) {
      return "args invalid, problem"
    }
    var iname = call_data.args[0];

    return es_request.r({
      dpath: iname + '/_open',
      method: 'POST'
    }).then(console.log);
  };

  var closed_index = function(call_data) {
    if (call_data.args.length < 1) {
      return "args invalid, problem"
    }
    var iname = call_data.args[0];

    return es_request.r({
      dpath: iname + '/_closed',
      method: 'POST'
    }).then(console.log);
  };

  var Index_name_Argument = cliparse.argument(
    "index-name", {
      defaultValue: '_all',
      description: "index name you want to act on, put _all if you want to act on all"
    }
  );

  var intArgument = cliparse.argument(
    "int", {
      defaultValue: 0,
      parser: cliparse.parsers.intParser,
      description: "int value"
    }
  );

  var change_index_replica = function(call_data) {
    if (call_data.args.length < 1) {
      return "You must define a replica number";
    }
    var r_number = call_data.args[0];

    return es_request.r({
      dpath: '_cluster/state'
    }).then(function(iiii) {
      var data = JSON.parse(iiii);

      var indices = _.keys(data.routing_table.indices)
      
      console.log('shards to move')
      var move_orders = _.map(data.routing_nodes.nodes[node_key], function(i) {
        return {
          'move': {
            'index': i.index,
            'shard': i.shard,
            'from_node': node_key,
            'to_node': _.sample(onodes)
          }
        }
      })

      console.log(move_orders)

      console.log('launch relocation command')

      var ff = es_request.r({
        dpath: '_cluster/reroute?explain',
        method: 'POST',
        json: {
          commands: move_orders

        }
      });

      return ff;
    }).then(console.log);
  };



  return cliparse.command(
    "index", {
      description: "act on indexes of the cluster",
      commands: [
        cliparse.command(
          "open", {
            description: "open <index-name> or all if not define",
            args: [Index_name_Argument]
          }, open_index),
        cliparse.command(
          "close", {
            description: "close <index-name> or all if not define",
            args: [Index_name_Argument]
          }, closed_index)
      ]
    });
};
