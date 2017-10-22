
var debug = require('debug')('command');

var solution_data = require("../solutiondata");

var cfsrfs = require('../verifiers/cfs-rfs-verifier.js');
var pscfsres = require('../verifiers/product-service-resource-verifier.js')
var servqual = require('../verifiers/service-qualification-verifier.js');

function validateCli(argv){

  var sd = solution_data.factory();



}

module.exports = {
  command: 'validate',
  describe: 'As a solution architect I want validate the solution data satisfies logical constraints',
  builder: {
  },
  handler: validateCli
}
