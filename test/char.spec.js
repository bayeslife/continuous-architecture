
var assert = require('assert');

var solution_data = require("../src/js/solutiondata");

var sd=null;
var rfs,char,chargroup;
var value,value2;
var constraint,psconstraint;

describe('RFS associated to characteristics through groups', function() {

  describe('Given an RFS, a Char Group and a Char', function() {
    var rfsid = "rfs-pip1"
    var chargroupid = "iad-group";
    var charid = "iaddevice";
    before('Scenario1',function(){
      sd = solution_data.factory();
      rfs = sd.addRFS(rfsid);
      chargroup = sd.addCharGroup(chargroupid)
      char = sd.addChar(charid);
    })

    describe('When the Char is associated to a Char Group and RFS is associated to the Char ', function() {
      before(function(){
        sd.addRFSCharGroup(rfs,chargroup);
        sd.addCharGroupChar(chargroup,char);
      })
      it('Then the RFS should be associated to the Char', function() {
        assert.equal(sd.chars_for_rfs(rfs).length,1)
      });
    });
  });
});

describe('Characteristic values are constrained', function() {

  describe('Given a Char, a Constraint and an RFS', function() {
    var rfsid = "rfs-oneacess1"
    var constraintid = "constraint-iad";
    var charid = "iaddevice";
    before(function(){
      sd = solution_data.factory();
      rfs = sd.addRFS(rfsid)
      constraint= sd.addConstraint(constraintid)
      char = sd.addChar(charid);
    })
    describe('When the Char is associated to a Char Group and RFS is associated to the Char ', function() {
      before(function(){
        sd.addCharConstraint(char,constraint);
        sd.addConstraintValue(constraint,rfs);
      });

      it('Then the RFS should be valid value for the Char', function() {
        assert.equal(sd.values_for_char(char).length,1)
      });
    });
  });
});
