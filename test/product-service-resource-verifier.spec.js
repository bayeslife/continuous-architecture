var assert = require('assert');

var solution_data = require("../src/js/solutiondata");
var verifier = require("../src/js/verifiers/product-service-resource-verifier");


var productid = 'productid';
var serviceid = 'cfsid';
var resourceid = 'resourceid';


var sd;
var productspec = null;

describe('Given a product and no services and no resources', function() {
    beforeEach(function(){
      sd = solution_data.factory();
      productspec = sd.addPS(productid)
    })
    describe('When the product is released', function() {
      beforeEach(function(){
        productspec.released = true;
      })
      it('Then productspec is not valid', function() {
        var result = verifier.verify(sd)
        assert(!result[0].status);
      });
    });
})

describe('Given a product', function() {
    beforeEach(function(){
      sd = solution_data.factory();
      productspec = sd.addPS(productid)
    })
    describe('When there is related service', function() {
      beforeEach(function(){
          var cfs = sd.addCFS(serviceid);
          sd.addPSCFS(productspec,cfs)
      })
      it('Then product is valid', function() {
        var result = verifier.verify(sd)
        assert(result[0].status);
      });
    });
})

describe('Given a product', function() {
  beforeEach(function(){
    sd = solution_data.factory();
    productspec = sd.addPS(productid)
  })
  describe('When there is related resource', function() {
      beforeEach(function(){
        var rs = sd.addResource(resourceid);
        sd.addPSResource(productspec,rs);
      })
      it('Then product is valid', function() {
        var result = verifier.verify(sd)
        assert(result[0].status);
      });
    });
})
