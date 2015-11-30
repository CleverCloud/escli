#!/bin/env node

var cliparse = require("cliparse");
var config = require("./src/config.js");
var es_request = require("./src/es_request.js")(config);

var shard_allocation = require('./src/shard_allocation.js')(config, es_request);



var escli = cliparse.cli({
  name: "escli",
  description: "Simple elastic search management command line. Configure with Env variable, using ES_CLI_HOST and optionaly ES_CLI_USER and ES_CLI_PASSWORD",
  commands: [

    shard_allocation,

    cliparse.command(
      "add2", {
        description: "add 2 to the given integer and display the result",
        args: [
          cliparse.argument("int", {
            default: 0,
            parser: cliparse.parsers.intParser,
            description: "int to add 2 to"
          })
        ]
      },
      null)
  ]
});



cliparse.parse(escli);
