var cliparse = require("cliparse");
var _ = require("lodash");

module.exports = function(config, es_request, complete) {

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
        dpath: '_cluster/reroute?explain',
        method: 'POST',
        json: {
          commands: move_orders

        }
      });

      return ff;
    }).then(console.log);
  };


  var nodes_unasigned_allocation = function(call_data) {
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

      console.log('shards to allocate')
      var move_orders = _.map(_.sample(data.routing_nodes.unassigned, 20), function(i) {
        return {
          'allocate': {
            'index': i['index'],
            'shard': i.shard,
            'node': node_key
          }
        }
      })

      console.log(move_orders)

      console.log('launch allocation command')

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


  var from_node_to_node = function(call_data) {
    if (call_data.args.length < 3) {
      return "You must define a node1 to node2 arguments";
    }

    var node_from = call_data.args[0];
    var node_to = call_data.args[2];

    return es_request.r({
      dpath: '_cluster/state'
    }).then(function(iiii) {
      var data = JSON.parse(iiii);

      var node_key_from = _.result(_.find(_.map(data.nodes, function(v, k) {
        v.id = k;
        return v;
      }), function(v, k) {
        return v.name == node_from;
      }), 'id');

      var node_key_to = _.result(_.find(_.map(data.nodes, function(v, k) {
        v.id = k;
        return v;
      }), function(v, k) {
        return v.name == node_to;
      }), 'id');


      if (node_to == undefined || node_from == undefined) {
        console.log("unvalid node name")
        return "node name is not valid"
      } else {
        console.log("move 10 shards from " + node_from + " to " + node_to)
        console.log("the node id for " + node_from + " is " + node_key_from);
        console.log("the node id for " + node_to + " is " + node_key_to);
      }

      console.log('shards to move')
      var move_orders = _.map(_.sample(data.routing_nodes.nodes[node_key_from], 10), function(i) {
        return {
          'move': {
            'index': i.index,
            'shard': i.shard,
            'from_node': node_key_from,
            'to_node': node_key_to
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


  var node_Argument = cliparse.argument(
    "node-name", {
      defaultValue: '',
      description: "node name you want to decommision",
      complete: complete.nodes_complete
    }
  );

  var to_Argument = cliparse.argument(
    "to", {
      defaultValue: 'to',
      description: "just write \"to\""
    }
  );

  var number_Argument = cliparse.argument("int", {
    default: 10,
    parser: cliparse.parsers.intParser,
    description: "number of shards to move"
  });




  return cliparse.command(
    "nodes", {
      description: "nodes operations",
      commands: [
        cliparse.command(
          "empty_node", {
            args: [node_Argument],
            description: "reasign shards out of this node"
          }, nodes_remove_allocation),
        cliparse.command(
          "get_unasigned", {
            args: [node_Argument],
            description: "get 20 unasigned shards on this node"
          }, nodes_unasigned_allocation),
        cliparse.command(
          "move_shards", {
            args: [node_Argument, to_Argument, node_Argument, number_Argument],
            description: "move [x] shards from node1 to node2"
          }, from_node_to_node)
      ]
    });
};
