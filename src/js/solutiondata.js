var ala = require('alasql');

var debug = require('debug')('verify.solutiondata');
var _ = require('underscore');

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

    report: function(){
      console.log("CXS:"+this.cxs.length);
    },

    resource_for_ps: function(productspec) {
      return ala("select res.* from ? as res join ? as psresource on psresource.[target]=res.id join ? as ps on psresource.source=ps.id where ps.id = ? ",[this.resources,this.psresources,this.pss, productspec.id])
    },
    cfs_for_ps: function(productspec) {
      return ala("select cfs.* from ? as cfs join ? as pscfs on pscfs.[target]=cfs.id join ? as ps on pscfs.source=ps.id where ps.id = ? ",[this.cfss,this.pscfss,this.pss, productspec.id])
    },
    rfss_for_cfs: function(cfs) {
      return ala("select rfs.* from ? as rfs join ? as cfsrfs on rfs.id=cfsrfs.[target] join ? as cfs on cfsrfs.source=cfs.id where cfs.id = ? ",[this.rfss,this.cfsrfss,this.cfss, cfs.id])
    },
    rfss_for_productspec: function(productspec) {
      return ala("select rfs.* from ? as rfs join ? as cfsrfs on rfs.id=cfsrfs.[target] join ? as cfs on cfsrfs.source=cfs.id join ? as pscfs on pscfs.[target]=cfs.id join ? as ps on pscfs.source=ps.id where ps.id = ? ",[this.rfss,this.cfsrfss,this.cfss,this.pscfss,this.pss, productspec.id])
    },
    qualification_for_rfss: function(rfss){
      return ala("select qual.* from ? as qual join ? as rfsq on rfsq.[target]=qual.id join ? as rfs on rfs.id=rfsq.source",[this.qualifications,this.rfs_qualifications,rfss])
    },
    qualifications_with_components: function(qualifications){
      return ala("select qual.* from ? as qual join ? as qualcomp on qual.id=qualcomp.source",[qualifications,this.qualification_components])
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
    addPS: function(id) {
      var productspec = {id: id};
      this.pss.push(productspec);
      return productspec;
    },
    addPSCFS: function(ps,cfs){
      var rel = {source: ps.id,target: cfs.id}
      this.pscfss.push(rel);
    },
    addCFS: function(serviceid) {
      var service = {id: serviceid};
      this.cfss.push(service);
      return service;
    },
    addRFS: function(serviceid) {
      var service = {id: serviceid};
      this.rfss.push(service);
      return service;
    },
    addResource: function(id) {
      var instance = {id: id};
      this.resources.push(instance);
      return instance;
    },
    addPSResource: function(ps,resource){
      var rel = {source: ps.id,target: resource.id}
      this.psresources.push(rel);
    },
    addQualification: function(id) {
      var instance = {id: id};
      this.qualifications.push(instance);
      return instance;
    },
    addComponent: function(id) {
      var instance = {id: id};
      this.components.push(instance);
      return instance;
    },
    addCFSRFS: function(cfs,rfs){
      var rel = {source: cfs.id,target: rfs.id}
      this.cfsrfss.push(rel);
    },
    addRFSQualification(rfs,qualificationService){
      var rel = {source: rfs.id,target: qualificationService.id}
      this.rfs_qualifications.push(rel);
    },
    addQualificationComponent(qualification,component){
      var rel = {source: qualification.id,target:component.id}
      this.qualification_components.push(rel);
    }
  }
}

module.exports = {
  factory: solution_data
}
