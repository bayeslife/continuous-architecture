var assert = require('assert');

var solution_data = require("../src/js/solutiondata");
var verifier = require("../src/js/service-qualification-verifier");

var productspec = {};

var productid = 'productid';
var cfsid = 'cfsid';
var rfsid = 'rfsid';
var qualificationid = 'qualificationid';
var componentid = 'componentid';

var init = function(){
}

describe('Given a product depends upon a CFS and RFS And the RFS declares a qualification', function() {
    var sd = solution_data.factory();
     describe('When the product is ordered through a component which does not integrate to the service qualification service', function() {
      it('Then product is not valid', function() {
        var result = verifier.verify(productspec,sd)
        assert(!result.status);
      });
    })
    describe('Given a product depends upon a CFS and RFS And the RFS declares a qualification', function() {
    var sd = null;
    var ps = null;
    var qual = null;
    var comp = null;
    before(function(){
      sd = solution_data.factory();
      ps = sd.addPS(productid);
      var cfs = sd.addCFS(cfsid);
      var rfs = sd.addRFS(rfsid);
      qual = sd.addQualification(qualificationid)
      comp = sd.addComponent(componentid)
      sd.addPSCFS(ps,cfs);
      sd.addCFSRFS(cfs,rfs);
      sd.addRFSQualification(rfs,qual);
    })
     describe('When the qualification is NOT provided by a component', function() {
        it('Then product is not valid', function() {
          var result = verifier.verify(ps,sd)
          assert(!result.status);
        });
      })
     describe('When the qualification is provided by a component', function() {
       before(function(){
         sd.addQualificationComponent(qual,comp);
       })
        it('Then product is valid', function() {
          var result = verifier.verify(ps,sd)
          assert(result.status);
        });
      })
    });
})
