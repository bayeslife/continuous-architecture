
var debug = require('debug')('verify');

var _ = require('lodash');

function verifyQualificationServicesAvailable(argv,solution_data){
  var result = solution_data.pss.map(function(productspec){
    var status = false;
    var rfss = solution_data.rfss_for_productspec(productspec);
    debug(rfss);
    var qualifications = solution_data.qualification_for_rfss(rfss)
    debug(qualifications);
    if(qualifications.length>0){
      var qualifications_with_components = solution_data.qualifications_with_components(qualifications);
      debug(qualifications_with_components);
      if(qualifications_with_components.length==qualifications.length)
        status = true;
    }
    if(status)
      return null;
    else
      return {        
        description: "RFS related to PS have qualifications but no component providing the qualification"
      }
  })
  result = _.without(result,null);
  return result;
}

module.exports = {
  verify: verifyQualificationServicesAvailable,
  describe: 'As an architect I want services with associated qualifications to be available to those who take orders for product involving those services.',
}
