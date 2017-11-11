var assert = require('assert');

var solution_data = require("../src/js/solutiondata");

var sd;
var sdclone;
var ps;

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
