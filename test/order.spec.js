var assert = require('assert');

var solution_data = require("../src/js/solutiondata");
var orderclass = require("../src/js/order");

var order;
var sd;
var rfs,char,chargroup;
var value,value2;
var constraint,psconstraint;

describe('Characteristic values are constrained', function() {
  describe('Given a PIP RFS, a Bandwidth Char, multiple bandwidth values and a PS Constraint for a single value', function() {
    var rfsid = "rfs-pip"
    var groupid = "bandwidth"
    var constraintid = "rfs-bandwidth";
    var charid = "bandwidth";
    var value1id = "1GB";
    var value2id = "10GB";
    var cfsid = "WAN";
    var psid = "PS PIP";
    var psconstraintid = "ps-bandwidth-1GB"
    before(function(){
      sd = solution_data.factory();
      ps = sd.addPS(psid);
      cfs = sd.addCFS(cfsid);
      rfs = sd.addRFS(rfsid);
      chargroup = sd.addCharGroup(groupid)
      char = sd.addChar(charid);
      constraint= sd.addConstraint(constraintid)
      value = sd.addCharValue(value1id);
      value2 = sd.addCharValue(value2id);
      psconstraint= sd.addConstraint(psconstraintid)

      sd.addConstraintSource(char,constraint);
      sd.addConstraintTarget(constraint,rfs);

      order = orderclass.factory(sd);
    })
    describe('When Product spec is Not selected', function() {
      before(function(){
        order.selectPS(null);
      });
      it('Then valid characterisics is simplified', function() {
        console.log(order.getConfiguration());
        assert.equal(order.getConfiguration().values_for_char(char).length,2)
      });
    });
    describe('When Product spec is selected', function() {
      before("When",function(){
        order.selectPS(ps);
      });
      it('Then valid characterisics is simplified', function() {
        assert.equal(order.getConfiguration().values_for_char(char).length,1)
      });
    });
  });

});
