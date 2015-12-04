var _ = require("lodash");
var cliparse = require("cliparse");


module.exports = function(config, es_request) {

  return {
    nodes_complete: function() {
      return es_request.r({
        dpath: '_nodes'
      }).then(function(nodes_res) {
        var data = JSON.parse(nodes_res);
        return cliparse.autocomplete.words(_.pluck(data.nodes, 'name'));
      });
    }


  }

};
