var debug = require('debug')('loader.directory');

function load(options,solutiondata){
  solutiondata.pss = require(options.directory +"/Test-hierarchy.ProductType.json");
  solutiondata.cfss = require(options.directory +"/Test-hierarchy.CFSType.json")
}

module.exports = {
  load
}
