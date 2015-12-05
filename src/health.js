var cliparse = require("cliparse");
var colors = require("colors");

module.exports = function(config, es_request) {


  var color_parser = function(s, status) {
    switch (status) {
      case 'green':
        return s.green
        break;
      case 'yellow':
        return s.yellow
        break;
      case 'red':
        return s.red
        break;
      default:
        return s
    }
  }

  var cluster_health = function() {
    return es_request.r({
      dpath: '_cluster/health'
    }).then(function(res) {
      var data = JSON.parse(res);
      console.log(color_parser(data.cluster_name.bold, data.status));
      console.log(color_parser('cluster status is ' + data.status, data.status));
      console.log(data.number_of_nodes + ' nodes with ' + data.number_of_data_nodes + ' data nodes');
    });
  };




  return cliparse.command(
    "health", {
      description: "various metrics about cluster health"
    }, cluster_health);
};
