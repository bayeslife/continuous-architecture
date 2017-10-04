
var debug = require('debug')('verify');

function verifyCFSRelatesToRFS(cfs,solution_data){
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
}

module.exports = {
  verify: verifyCFSRelatesToRFS
}
