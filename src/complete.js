var _ = require("lodash");


module.exports = function(config, es_request) {

  return {
    nodes_complete: function() {
      console.log("ffff");
      return es_request.r({
        dpath: '_nodes'
      }).then(function(nodes_res) {
        var data = JSON.parse(nodes_res);
        return _.pluck(data.nodes, 'name');
      });
    }


  }

};
