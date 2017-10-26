

var cfsrfs = require('./verifiers/cfs-rfs-verifier.js');
var pscfsres = require('./verifiers/product-service-resource-verifier.js')
var servqual = require('./verifiers/service-qualification-verifier.js');

var _ = require('lodash');

//var verifiers = [ pscfsres ];
var verifiers = [ cfsrfs,pscfsres,servqual ];

var validate = function(options,solutiondata){
  var results = verifiers.map(function(verifier){
    return verifier.verify(options,solutiondata);
  })
  return _.flatten(results);
}

module.exports = {
  validate
}
