var assert = require('assert');

var solution_data = require("../src/js/solutiondata");

var sd;
var sdclone;
var ps;

var psid='ps1'
var cfsid='cfs1'
var resourceid='resource1'
var rfsid='rfs1'
var charid="char1";
var char2id="char2";
var char3id="char3";
var chargroupid='chargroup1'
var chargroup2id='chargroup2'
var constraintid='constraint1';
var charvalue1id='charvalue1'
var charvalue2id='charvalue2'

describe('Validate queries', function() {
  var rel;
  beforeEach('Create solution data',function(){
    sd = solution_data.factory();
  })
  describe('Given a PS and related Resource', function() {
    beforeEach('Given',function(){
      sd.addPS(psid)
      sd.addResource(resourceid);
      sd.addPSResource(psid,resourceid);
    })
    describe('When resource for the PS are queried', function() {
      beforeEach('When',function(){
        rel = sd.resource_for_ps(psid);
      })
      it('Then the resource is returned', function() {
        assert.equal(rel.length,1)
      });
    });
  });
  describe('Given a PS and related CFS', function() {
    beforeEach('Given',function(){
      sd.addPS(psid)
      sd.addCFS(cfsid);
      sd.addPSCFS(psid,cfsid);
    })
    describe('When CFS for the PS are queried', function() {
      beforeEach('When',function(){
        rel = sd.cfs_for_ps(psid);
      })
      it('Then the CFS is returned', function() {
        assert.equal(rel.length,1)
      });
    });
  });
  describe('Given a CFS and related RFS', function() {
    beforeEach('Given',function(){
      sd.addCFS(cfsid)
      sd.addRFS(rfsid);
      sd.addCFSRFS(cfsid,rfsid);
    })
    describe('When RFS for the CFS are queried', function() {
      beforeEach('When',function(){
        rel = sd.rfs_for_cfs(cfsid);
      })
      it('Then the RFS is returned', function() {
        assert.equal(rel.length,1)
      });
    });
  });
  describe('Given related PS,CFS and RFS', function() {
    beforeEach('Given',function(){
      sd.addPS(psid)
      sd.addCFS(cfsid)
      sd.addRFS(rfsid);
      sd.addPSCFS(psid,cfsid);
      sd.addCFSRFS(cfsid,rfsid);
    })
    describe('When RFS for the PS are queried', function() {
      beforeEach('When',function(){
        rel = sd.rfs_for_productspec(psid);
      })
      it('Then the RFS is returned', function() {
        assert.equal(rel.length,1)
        assert.equal(rfsid,rel[0].id)
      });
    });
  });
  describe('Given related RFS,CHARGROUP and Char', function() {
    beforeEach('Given',function(){
      sd.addRFS(rfsid);
      sd.addCharGroup(chargroupid);
      sd.addChar(charid);
      sd.addRFSCharGroup(rfsid,chargroupid);
      sd.addCharGroupChar(chargroupid,charid);
    })
    describe('When Chars for the RFS are queried', function() {
      beforeEach('When',function(){
        rel = sd.chars_for_rfs(rfsid);
      })
      it('Then the Char is returned', function() {
        assert.equal(rel.length,1)
        assert.equal(charid,rel[0].id)
      });
    });
  });
  describe('Given related RFS, multiple CHARGROUPs and multiple Chars', function() {
    beforeEach('Given',function(){
      sd.addRFS(rfsid);
      sd.addCharGroup(chargroupid);
      sd.addCharGroup(chargroup2id);
      sd.addChar(charid);
      sd.addChar(char2id);
      sd.addChar(char3id);
      sd.addRFSCharGroup(rfsid,chargroupid);
      sd.addCharGroupChar(chargroupid,[charid,char2id]);
      sd.addRFSCharGroup(rfsid,chargroup2id);
      sd.addCharGroupChar(chargroup2id,[char2id,char3id]);
    })
    describe('When Chars for the RFS are queried', function() {
      beforeEach('When',function(){
        rel = sd.chars_for_rfs(rfsid);
      })
      it('Then the appropriate Chars are returned', function() {
        assert.equal(rel.length,3)
      });
    });
  });
})


describe('Valid Characteristic Values', function() {
  describe('Given a solution data', function() {
    var rel;
    before('Given',function(){
      sd = solution_data.factory();
    })
    describe('When there is a constraint from char to specific values', function() {
      before('When',function(){
        sd.addChar(charid);
        sd.addConstraint(constraintid)
        sd.addCharValue(charvalue1id);
        sd.addCharValue(charvalue2id);
        sd.addConstraintSource(charid,constraintid);
        sd.addConstraintTarget(constraintid,charvalue1id);
      })
      it('Then available chars are returned', function() {
        var res = sd.values_for_char(charid);
        assert.equal(res.length,1)
      });
    });
  });
})

describe('Validate add relationships', function() {
  describe('Given a solution data', function() {
    var rel;
    before('Given',function(){
      sd = solution_data.factory();
    })
    describe('When a pair of CFS are related to PS', function() {
      before('When',function(){
        rel = sd.addPSCFS([1,2],[3,4]);
      })
      it('Then 4 relationships are formed', function() {
        assert.equal(rel.length,4)
      });
    });
  });
})


describe('Validate cloning', function() {
  describe('Given a solution data with a PS', function() {
    var psid = "ps-pip1"

    before('Given',function(){
      sd = solution_data.factory();
      ps = sd.addPS(psid);
    })

    describe('When the solutiondata is cloned and the PS list is changed', function() {
      before('When',function(){
        sdclone = sd.clone();
        sdclone.setPSs([])
      })
      it('Then the original solutiondata is unchanged', function() {
        assert.equal(sd.pss.length,1)
        assert.equal(sdclone.pss.length,0)
      });
    });
  });
});
