var env = require('common-env')();
var config = env.getOrElseAll({
  user: {
    $default: null,
    $aliases: ['ES_CLI_USER'],
    $type: env.types.String
  },
  password: {
    $default: null,
    $aliases: ['ES_CLI_PASSWORD'],
    $type: env.types.String
  },
  host: {
    $default: 'http://localhost:9200/',
    $aliases: ['ES_CLI_HOST'],
    $type: env.types.String
  }
});

module.exports = config;
