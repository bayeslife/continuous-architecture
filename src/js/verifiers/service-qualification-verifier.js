
var debug = require('debug')('verify');

function verifyQualificationServicesAvailable(solution_data){
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
    return {
      status: status
    }
  })  
  return result;
}

module.exports = {
  verify: verifyQualificationServicesAvailable,
  describe: 'As an architect I want services with associated qualifications to be available to those who take orders for product involving those services.',
}
