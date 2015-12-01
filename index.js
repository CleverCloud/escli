#!/bin/env node

var cliparse = require("cliparse");
var config = require("./src/config.js");
var es_request = require("./src/es_request.js")(config);

var shard_allocation = require('./src/shard_allocation.js')(config, es_request);
var list = require('./src/list.js')(config, es_request);
var nodes = require('./src/nodes.js')(config, es_request);
var indexes = require('./src/indexes.js')(config, es_request);



var escli = cliparse.cli({
  name: "escli",
  description: "Simple elastic search management command line. Configure with Env variable, using ES_CLI_HOST and optionaly ES_CLI_USER and ES_CLI_PASSWORD",
  commands: [
    shard_allocation,
    list,
    nodes,
    indexes
  ]
});



cliparse.parse(escli);
