
var debug = require('debug')('verify');

var _ = require('lodash');

function verifyProductRelatesToServiceOrResource(argv,solution_data){
  debug("Product Relates to Service or Resource");
  var m= solution_data.pss.map(function(ps){
    var cfs = solution_data.cfs_for_ps(ps,solution_data)
    if(cfs.length>0){
      return null;
    }
    var resources = solution_data.resource_for_ps(ps,solution_data)
    if(resources.length>0){
      return null;
    }
    if(!ps.warning) ps.warning=[];
    ps.warning.push("No associated CFS")
    return {
      description: "A PS identified by "+ps.name+" is not associated with cfs"
    }
  })
  m=  _.without(m,null);
  return m;
}

module.exports = {
  verify: verifyProductRelatesToServiceOrResource,
  describe: 'As an architect I want product spec to relate to cfs and/or  resource so that I know product specifications are realizeable.'
  }
