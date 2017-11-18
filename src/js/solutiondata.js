//This should be renamed to 'cataloue' as it represents a catalogue of allow possibilities.

var ala = require('alasql');

var debug = require('debug')('verify.solutiondata');
var _ = require('underscore');

var standardize = function(identifiers,operation){
  var ids = identifiers;

  if( ! (identifiers instanceof Array) ){
    ids = [identifiers]
  }
  var res =  ids.map(function(identifier){
    var id = identifier;
    if(typeof identifier === 'object'){
      id = identifier.id;
    }
    return operation(id);
  })
  return res;
}

var solution_data = function(){
  return {
    cxs: [],
    cxcfs: [],
    pss: [],
    pscfss: [],
    cfss: [],
    cfsrfss: [],
    rfss: [],
    chars: [],
    charvalues: [],
    charsIndex: {},
    rfschars: [],
    cfsHierarchy: [],
    psHierarchy: [],
    rfsHierarchy: [],

    psresources: [],
    resources: [],
    qualifications: [],
    components: [],
    productoffer_components: [],
    businessservice_components: [],
    qualification_components: [],
    rfs_qualifications: [],

    chargroups: [],
    constraints: [],

    chargroup_chars: [],
    rfs_chargroups: [],
    char_constraints: [],
    constraint_values: [],

    clone: function() {
      return _.clone(this);
    },

    report: function(){
      console.log("CXS:"+this.cxs.length);
    },

    getPS: function(id){
      return  _.find(this.pss,function(ps){
        return ps.id == id;
      })
    },
    getCFS: function(id){
      return  _.find(this.cfss,function(cfs){
        return cfs.id == id;
      })
    },
    getRFS: function(id){
      return  _.find(this.rfss,function(rfs){
        return rfs.id == id;
      })
    },
    resource_for_ps: function(productspecs) {
      var sd = this;
      var res =  standardize(productspecs,function(productspecid){
        return ala("select res.* from ? as res join ? as psresource on psresource.[target]=res.id join ? as ps on psresource.source=ps.id where ps.id = ? ",[sd.resources,sd.psresources,sd.pss, productspecid])
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    cfs_for_ps: function(productspecs) {
      var sd = this;
      var res =  standardize(productspecs,function(productspecid){
        return ala("select cfs.* from ? as cfs join ? as pscfs on pscfs.[target]=cfs.id join ? as ps on pscfs.source=ps.id where ps.id = ? ",[sd.cfss,sd.pscfss,sd.pss, productspecid])
      });
      return res.reduce((a, b) => a.concat(b), []);
    },
    rfs_for_cfs: function(cfss) {
      var sd = this;
      var res =  standardize(cfss,function(cfsid){
        return ala("select rfs.* from ? as rfs join ? as cfsrfs on rfs.id=cfsrfs.[target] join ? as cfs on cfsrfs.source=cfs.id where cfs.id = ? ",[sd.rfss,sd.cfsrfss,sd.cfss, cfsid])
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    rfs_for_productspec: function(productspecs) {
      var sd = this;
      var res =  standardize(productspecs,function(psid){
        return ala("select rfs.* from ? as rfs join ? as cfsrfs on rfs.id=cfsrfs.[target] join ? as cfs on cfsrfs.source=cfs.id join ? as pscfs on pscfs.[target]=cfs.id join ? as ps on pscfs.source=ps.id where ps.id = ? ",[sd.rfss,sd.cfsrfss,sd.cfss,sd.pscfss,sd.pss, psid])
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    qualification_for_rfss: function(rfss){
      return ala("select qual.* from ? as qual join ? as rfsq on rfsq.[target]=qual.id join ? as rfs on rfs.id=rfsq.source",[this.qualifications,this.rfs_qualifications,rfss])
    },
    qualifications_with_components: function(qualifications){
      return ala("select qual.* from ? as qual join ? as qualcomp on qual.id=qualcomp.source",[qualifications,this.qualification_components])
    },
    chars_for_rfs: function(rfss){
      var sd = this;
      var res =  standardize(rfss,function(rfsid){
        return ala("select char.* from ? as char join ? as chargroupchar on char.id=chargroupchar.[target] join ? as chargroup on chargroupchar.source=chargroup.id join ? as rfschargroup on chargroup.id=rfschargroup.[target] join ? as rfs on rfs.id=rfschargroup.source where rfs.id = ? ",[sd.chars,sd.chargroup_chars,sd.chargroups, sd.rfs_chargroups,sd.rfss, rfsid])
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    values_for_char: function(char){
        return ala("select val.* from ? as val join ? as constraintvalues on val.id=constraintvalues.[target] join ? as constraints on constraintvalues.source=constraints.id join ? as charconstraints on constraints.id=charconstraints.[target] join ? as char on char.id=charconstraints.source where char.id = ? ",[this.rfss,this.constraint_values,this.constraints, this.char_constraints,this.chars, char.id])
    },

    setCXs: function(data){
      this.cxs = data;
    },
    setCXCFSs: function(data){
      this.cxcfss = data;
    },
    setPSs: function(data){
      this.pss = _.uniq(data,function(item){
        return item.id;
      })
    },
    setCFSs: function(data){
      this.cfss = _.uniq(data,function(item){
        return item.id;
      })
    },
    setRFSs: function(data){
      this.rfss = _.uniq(data,function(item){
        return item.id;
      })
    },
    setChars: function(data){
      var sd = this;
      this.charsIndex={};
      this.chars = _.uniq(data,function(item){
        sd.charsIndex[item.id]=item;
        return item.id;
      })

    },

    setCXCFSs: function(data){
      this.cxcfss = data;
    },
    setPSCFSs: function(data){
      this.pscfss = data;
    },
    setCFSRFSs: function(data){
      this.cfsrfss = data;
    },
    setRFSChars: function(data){
      this.rfschars = data;
    },

    setRFSHierarchy: function(data){
      this.rfsHierarchy = _.uniq(data,function(item){
        return item.id;
      })
    },
    setCFSHierarchy: function(data){
      this.cfsHierarchy = _.uniq(data,function(item){
        return item.id;
      })
    },
    setPSHierarchy: function(data){
      this.psHierarchy = _.uniq(data,function(item){
        return item.id;
      })
    },
    setCharGroups: function(data){
      this.chargroups = data;
    },
    addPS: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var productspec = {id: id};
        sd.pss.push(productspec);
        return productspec;
      })
    },
    addPSCFS: function(pss,cfss){
      var sd = this;
      var res =  standardize(pss,function(psid){
        return standardize(cfss,function(cfsid){
          var rel = {source: psid,target: cfsid}
          sd.pscfss.push(rel);
          return rel
        })
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    addCFS: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var service = {id: id};
        sd.cfss.push(service);
        return service;
      })
    },
    addRFS: function(serviceids) {
      var sd = this;
      return standardize(serviceids,function(serviceid){
        var service = {id: serviceid};
        sd.rfss.push(service);
        return service;
      })
    },
    addResource: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var instance = {id: id};
        sd.resources.push(instance);
        return instance;
      })
    },
    addChar: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var instance = {id: id};
        sd.chars.push(instance);
        return instance;
      })
    },
    addCharValue: function(identifiers) {
      var sd = this;
      return standardize(identifiers,function(id){
        var instance = {id: id};
        sd.charvalues.push(instance);
        return instance;
      })
    },
    addCharGroup: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var instance = {id: id};
        sd.chargroups.push(instance);
        return instance;
      })
    },
    addConstraint: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var instance = {id: id};
        sd.constraints.push(instance);
        return instance;
      })
    },
    addPSResource: function(pss,resources){
      var sd = this;
      var res = standardize(pss,function(psid){
        return standardize(resources,function(resourceid){
          var rel = {source: psid,target: resourceid}
          sd.psresources.push(rel);
          return rel;
        })
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    addQualification: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var instance = {id: id};
        sd.qualifications.push(instance);
        return instance;
      })
    },
    addComponent: function(ids) {
      var sd = this;
      return standardize(ids,function(id){
        var instance = {id: id};
        sd.components.push(instance);
        return instance;
      })
    },
    addCFSRFS: function(cfss,rfss){
      var sd=this;
      var res = standardize(cfss,function(cfsid){
        return standardize(rfss,function(rfsid){
          var rel = {source: cfsid,target: rfsid}
          sd.cfsrfss.push(rel);
          return rel;
        })
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    addRFSQualification(rfs,qualificationService){
      var rel = {source: rfs.id,target: qualificationService.id}
      this.rfs_qualifications.push(rel);
    },
    addQualificationComponent(qualifications,components){
      var sd = this;
      var res  = standardize(qualifications,function(qualificationid){
        return standardize(components,function(componentid){
          var rel = {source: qualificationid,target:componentid}
          sd.qualification_components.push(rel);
          return rel;
        })
      })
      return res.reduce((a,b)=>a.concat(b),[]);
    },
    addRFSCharGroup(rfss,chargroups){
      var sd = this;
      var res = standardize(rfss,function(rfsid){
        return standardize(chargroups,function(chargroupid){
          var rel = {source: rfsid,target:chargroupid}
          sd.rfs_chargroups.push(rel);
          return rel;
        })
      })
      return res.reduce((a, b) => a.concat(b), []);
    },
    addCharGroupChar(chargroups,chars){
      var sd=this;
      var res = standardize(chargroups,function(chargroupid){
        return standardize(chars,function(charid){
          var rel = {source: chargroupid,target:charid}
          sd.chargroup_chars.push(rel);
          return rel;
        })
      })
      return res.reduce((a,b)=>a.concat(b),[]);
    },
    addConstraintSource(chars,constraint){
      var sd = this;
      return standardize(chars,function(char){
        var rel = {source: char,target:constraint}
        sd.char_constraints.push(rel);
        return rel;
      })
    },
    addConstraintTarget(constraint,values){
      var sd = this;
      return standardize(values,function(value){
        var rel = {source: constraint,target:value}
        sd.constraint_values.push(rel);
        return rel;
      })
    }
  }
}

module.exports = {
  factory: solution_data
}
