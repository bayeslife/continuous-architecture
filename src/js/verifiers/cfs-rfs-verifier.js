
var debug = require('debug')('verify');

function verifyCFSRelatesToRFS(solution_data){
  return solution_data.cfss.map(function(cfs){
    var rfs = solution_data.rfss_for_cfs(cfs);
    debug(rfs)
    if(rfs.length>0){
      return {
        status:true
      }
    }else {
      return {
        status: false,
        description: "A CFS identified by "+cfs.id+" is not related to any RFS"
      }
    }
  })
}


module.exports = {
  verify: verifyCFSRelatesToRFS,
  describe: 'As a solution architect I want to know that all cfs related to 1 or more rfs so that I know cfs are realizeable'
}
