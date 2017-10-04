
var debug = require('debug')('verify');

function verifyProductRelatesToServiceOrResource(product,solution_data){
  var cfs = solution_data.cfs_for_ps(product,solution_data)
  if(cfs.length>0){
    return {
      status: true
    }
  }
  var resources = solution_data.resource_for_ps(product,solution_data)
  if(resources.length>0){
    return {
      status: true
    }
  }
  return {
    status: false
  }
}

module.exports = {
  verify: verifyProductRelatesToServiceOrResource
}
