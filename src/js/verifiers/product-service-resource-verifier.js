
var debug = require('debug')('verify');


function verifyProductRelatesToServiceOrResource(solution_data){
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
      status: false
    }
  })
}

function verifyCli(argv){
  console.log('here'+ argv.psid);

}

module.exports = {
  verify: verifyProductRelatesToServiceOrResource,
  command: 'pscfsres',
  describe: 'As an architect I want product spec to relate to cfs and/or  resource so that I know product specifications are realizeable.',
  builder: {
    psid: {
      default: 'ps1'
    }
  },
  handler: verifyCli
}
