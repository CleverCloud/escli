#!/bin/env node

var cliparse = require("cliparse");
var config = require("./src/config.js");

var echoModule = function(v) {
  console.log(config.host)
  if(v.options.reverse === true) {
    console.log(v.args[0].split("").reverse().join(""));
  } else {
    console.log(v.args[0]);
  }
};

var addModule = function(v) {
  console.log(v.args[0] + 2);
};




var escli = cliparse.cli({
  name: "escli",
  description: "Simple elastic search management command line. Configure with Env variable, using ES_CLI_HOST and optionaly ES_CLI_USER and ES_CLI_PASSWORD",
  commands: [

    cliparse.command(
      "echo",
      { description: "display the given value",
        args: [ cliparse.argument("value", { description: "simple value" })],
        options: [ cliparse.flag("reverse", { aliases: ["r"], description: "reverse the value"}) ]
      },
      echoModule),

    cliparse.command(
      "add2",
      { description: "add 2 to the given integer and display the result",
        args: [
          cliparse.argument("int",
            { default: 0,
              parser: cliparse.parsers.intParser,
              description: "int to add 2 to" })
        ]
      },
      addModule)
  ]
});



cliparse.parse(escli);
