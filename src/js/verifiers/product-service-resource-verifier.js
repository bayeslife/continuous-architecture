
var debug = require('debug')('verify');


function verifyProductRelatesToServiceOrResource(argv,solution_data){
  return solution_data.pss.map(function(ps){
    var cfs = solution_data.cfs_for_ps(ps,solution_data)
    if(cfs.length>0){
      return {
        status: true
      }
    }
    var resources = solution_data.resource_for_ps(ps,solution_data)
    if(resources.length>0){
      return {
        status: true
      }
    }
    return {
      status: false,
      description: "A PS identified by "+ps.name+" is not associated with cfs"
    }
  })
}

module.exports = {
  verify: verifyProductRelatesToServiceOrResource,
  describe: 'As an architect I want product spec to relate to cfs and/or  resource so that I know product specifications are realizeable.'
  }
