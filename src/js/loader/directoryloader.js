var debug = require('debug')('loader.directory');

function load(options,solutiondata){
  var cwd = process.cwd();
  solutiondata.pss = require(cwd+options.directory +"/Test-population.ProductSpec.json");
  solutiondata.cfss = require(cwd+options.directory +"/Test-population.Customer Facing Service Specification.json")
  solutiondata.pscfss = require(cwd+options.directory +"/Test-map.ProductSpec.json")
}

module.exports = {
  load
}
