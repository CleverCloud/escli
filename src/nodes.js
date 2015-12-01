var cliparse = require("cliparse");
var _ = require("lodash");

module.exports = function(config, es_request) {

  var nodes_remove_allocation = function(call_data) {
    if (call_data.args.length < 1) {
      return "You must define a node name";
    }
    var node_name = call_data.args[0];

    return es_request.r({
      dpath: '_cluster/state'
    }).then(function(iiii) {
      var data = JSON.parse(iiii);

      var node_key = _.result(_.find(_.map(data.nodes, function(v, k) {
        v.id = k;
        return v;
      }), function(v, k) {
        return v.name == node_name;
      }), 'id');
      if (node_key == undefined) {
        console.log("unvalid node name")
        return "node name is not valid"
      } else {
        console.log("the node id for " + node_name + " is " + node_key);
      }

      var onodes = _.without(_.keys(data.nodes), node_key);

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
        dpath: '_cluster/reroute',
        method: 'POST',
        json: {
          commands: move_orders

        }
      });

      return ff;
    }).then(console.log);
  };


  var stringArgument = cliparse.argument(
    "node-name", {
      defaultValue: '',
      description: "node name you want to decommision"
    }
  );




  return cliparse.command(
    "nodes", {
      description: "nodes operations",
      commands: [
        cliparse.command(
          "empty_node", {
            args: [stringArgument],
            description: "view list of shards"
          }, nodes_remove_allocation)
      ]
    });
};
