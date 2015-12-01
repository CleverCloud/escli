# escli
escli si a CLI tool to manage elastic search cluster, rely on the awesome cliparse toolkit by @clementd

It's an open WIP with current features as :
* enable/;disable shard allocation
* several simple list of ES objects
* reallocate all shard from one node in the objective of kill it gracefully
* open/close indexes

Configuration is made using common-env by @FGRibreau

Internal is made with promise

install with
`npm install escli --global
`

Simple elastic search management command line. Configure with Env variable, using ES_CLI_HOST and optionaly ES_CLI_USER and ES_CLI_PASSWORD

try
`escli --help`
