var assert = require('assert');

var solution_data = require("../../src/js/solutiondata");
var loader = require("../../src/js/loader/directoryloader");

var options = {
  "directory": "/test/loaders/solutiondata"
}

describe('Given a directory containing solution data', function() {
    var sd = null;
    beforeEach(function(){
      sd = solution_data.factory();
    })
    describe('When directory is loaded', function() {
      var loadeddata = null;
      beforeEach(function(){
        loader.load(options,sd)
      })
      it('Then solution data is available', function() {
        assert(sd.pss.length>0);
        assert(sd.cfss.length>0);
      });
    });
})
