var assert = require('assert');

var solution_data = require("../src/js/solutiondata");
var verifier = require("../src/js/verifiers/cfs-rfs-verifier");

var cfsid = 'cfsid';
var rfsid = 'rfsid';

var options = {};

describe('Given a service and no related rfs', function() {
    var sd = null;
    beforeEach(function(){
      sd = solution_data.factory();
    })
    describe('When the cfs is released', function() {
      var cfs;
      beforeEach(function(){
        cfs = sd.addCFS(cfsid);
        cfs.released = true;
      })
      it('Then service is not valid', function() {
        var result = verifier.verify(options,sd)
        assert(!result[0].status);
      });
    });
})

describe('Given a cfs', function() {
    var sd=null;
    beforeEach(function(){
      sd = solution_data.factory();
    })
    describe('When there is related rfs', function() {
      var cfs;
      beforeEach(function(){
        cfs = sd.addCFS(cfsid);
        var rfs = sd.addRFS(rfsid);
        sd.addCFSRFS(cfs,rfs);
      })
      it('Then service is valid', function() {
        var result = verifier.verify(options,sd)
        assert(result[0].status);
      });
    });
})
