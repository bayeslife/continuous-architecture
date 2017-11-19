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
      sd.addPS(psid);
      sd.addCFS(cfsid);
      sd.addRFS(rfsid);
      sd.addCharGroup(groupid)
      sd.addChar(charid);
      sd.addConstraint(constraintid)
      sd.addCharValue(value1id);
      sd.addCharValue(value2id);
      sd.addConstraint(psconstraintid)
      sd.addRFSCharGroup(rfsid,groupid)
      sd.addCharGroupChar(groupid,[value1id,value2id]);

      sd.addConstraintSource(char,constraint);
      sd.addConstraintTarget(constraint,rfs);

      order = orderclass.factory(sd);
    })
    describe.skip('When Product spec is Not selected', function() {
      before(function(){
        order.selectPS(null);
      });
      it('Then all values are possible', function() {
        assert.equal(order.getConfiguration().values_for_char(charid).length,2)
      });
    });
    describe.skip('When Product spec is selected', function() {
      before("When",function(){
        ps = sd.getPS(psid);
        order.selectPS(ps);
      });
      it('Then constrained characterisics available', function() {
        assert.equal(order.getConfiguration().values_for_char(char).length,1)
      });
    });
  });

});
