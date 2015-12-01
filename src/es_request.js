var rp = require('request-promise');

module.exports = function(config) {
  var es_request = {};

  es_request.direct_request = function(options) {
    var o = options;
    if (config.password != null) {
      o.auth = {
        'user': config.user,
        'pass': config.password,
        'sendImmediately': false
      };
    }
    o.url = 'http' + (config.https ? 's' : '') + '://' + config.host + '/' + options.dpath;
    return o;
  };

  es_request.r = function(options){
    return rp(es_request.direct_request(options));
  };

  es_request.shard_allocation = function(activated) {
    var o = es_request.direct_request({
      dpath: '_settings',
      method: 'PUT',
      json: {
        "index.routing.allocation.disable_allocation": activated
      }
    })
    return rp(o)
  };

  es_request.nodes = function(activated) {
    var o = es_request.direct_request({
      dpath: '_nodes'
    })
    return rp(o)
  };

  return es_request;

};
