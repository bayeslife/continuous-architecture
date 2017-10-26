
var debug = require('debug')('verify');

var _ = require('lodash');

function verifyCFSRelatesToRFS(argv,solution_data){
  var r =  solution_data.cfss.map(function(cfs){
    var rfs = solution_data.rfss_for_cfs(cfs);
    debug(rfs)
    if(rfs.length>0){
      return null;
    }else {
      return {        
        description: "A CFS identified by "+cfs.name+" is not related to any RFS"
      }
    }
  })
  r = _.without(r,null)
  return r;
}


module.exports = {
  verify: verifyCFSRelatesToRFS,
  describe: 'As a solution architect I want to know that all cfs related to 1 or more rfs so that I know cfs are realizeable'
}
