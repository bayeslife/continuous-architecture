var ala = require('alasql');

var debug = require('debug')('verify.solutiondata');

var solution_data = function(){
  return {
    pss: [],
    pscfss: [],
    cfss: [],
    cfsrfss: [],
    rfss: [],
    psresources: [],
    resources: [],
    qualifications: [],
    components: [],
    productoffer_components: [],
    businessservice_components: [],
    qualification_components: [],
    rfs_qualifications: [],

    resource_for_ps: function(productspec) {
      return ala("select res.* from ? as res join ? as psresource on psresource.[target]=res.id join ? as ps on psresource.source=ps.id where ps.id = ? ",[this.resources,this.psresources,this.pss, productspec.id])
    },
    cfs_for_ps: function(productspec) {
      return ala("select cfs.* from ? as cfs join ? as pscfs on pscfs.[target]=cfs.id join ? as ps on pscfs.source=ps.id where ps.id = ? ",[this.cfss,this.pscfss,this.pss, productspec.id])
    },
    rfss_for_cfs: function(cfs) {
      debug(cfs.id);
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
