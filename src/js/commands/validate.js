
var debug = require('debug')('command');

var solution_data = require("../solutiondata");

var processor = require("../processor")

var loader = require("../loader/directoryloader");

function validateCli(argv){

  var sd = solution_data.factory();
  loader.load(
    { directory: argv.solutiondata },
    sd);
    var results = processor.validate(argv,sd)
    console.log(results);
}

module.exports = {
  command: 'validate',
  describe: 'As a solution architect I want validate the solution data satisfies logical constraints',
  builder: {
  },
  handler: validateCli
}
