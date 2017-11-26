
var assert = require('assert');

var solution_data = require("../src/js/solutiondata");

var sd=null;
var rfs,char,chargroup;
var value,value2;
var constraint,psconstraint;

describe('characteristics', function() {

describe('RFS is associated to characteristics through groups', function() {

  describe('Given an RFS Spec, a Char Group and a Char', function() {
    var rfsid = "rfs-pip1"
    var chargroupid = "iad-group";
    var charid = "iaddevice";
    before('Scenario1',function(){
      sd = solution_data.factory();
      rfs = sd.addRFS(rfsid);
      chargroup = sd.addCharGroup(chargroupid)
      char = sd.addChar(charid);
    })

    describe('When RFS is associated to the Char Group and the Char is associated to a Char Group', function() {
      before(function(){
        sd.addRFSCharGroup(rfs,chargroup);
        sd.addCharGroupChar(chargroup,char);
      })
      it('Then the Char is "required" by the RFS Spec', function() {
        assert.equal(sd.chars_for_rfs(rfs).length,1)
      });
    });
  });
});

describe('Characteristic values may be constrained', function() {

  describe('Given an RFS Spec,Char Group and Char And A constraint with 2 allowed values', function() {
    var rfsid = "rfs1";
    var chargroupid = "chargroup1"
    var charid = "char1";
    var charvalue1id = 'charvalue1';
    var charvalue2id = 'charvalue2';
    var constraintid = 'constraint1'

    before(function(){
      sd = solution_data.factory();
      sd.addRFS(rfsid);
      sd.addCharGroup(chargroupid);
      sd.addChar(charid);
      sd.addRFSCharGroup(rfsid,chargroupid)

      sd.addCharValue([charvalue1id,charvalue2id]);

      sd.addConstraint(constraintid);
      sd.addConstraintSource(charid,constraintid);
      sd.addConstraintTarget(constraintid,[charvalue1id,charvalue2id]);
    })
    describe('When the RFS Spec has a separate constraint only allowing one of the 2 values', function() {
      before(function(){
        var rfsconstraintid = 'rfsmusthave';
        sd.addConstraint(rfsconstraintid);
        sd.addConstraintSource(rfsconstraintid,rfsid)
        sd.addConstraintTarget(rfsconstraintid,charvalue2id)
      });
      it('Then the RFS Spec only allows the single value', function() {

      });
    });
  });
});

describe('Characteristic values can be different types', function() {
  describe('Given a RFS Spec associated to Characteristic with a String value type', function() {
    describe('When RFS Spec is ', function() {
      it('Then the RFS should require String value for the characeristic name', function() {
      });
    });
  });
  describe('Given a RFS Spec associated to Characteristic with a Characteristic value type', function() {
    describe('When RFS Spec is realized and validated', function() {
      it('Then the RFS should require String value for the characeristic name', function() {
      });
    });
  });
});



})
