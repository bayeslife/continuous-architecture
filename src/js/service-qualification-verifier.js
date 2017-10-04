
var debug = require('debug')('verify');

//As an architect I want services with associated qualifications to be available to those who take orders for product involving those services.
function verifyQualificationServicesAvailable(productspec,solution_data){

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
}

module.exports = {
  verify: verifyQualificationServicesAvailable
}
