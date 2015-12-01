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
          "indexes", {
            description: "close <index-name> or all if not define",
            args: [Index_name_Argument]
          }, closed_index)
      ]
    });
};
