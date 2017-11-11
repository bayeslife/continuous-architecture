
var order = function(solutiondata){
  return {
    sd: solutiondata,
    previous: null,
    next: null,
    getConfiguration: function() {      
      return this.next;
    },
    createNext: function() {
      if(this.next==null){
        this.next = this.sd;
      }
      this.previous = this.next;
      this.next = this.previous.clone();
    },
    selectPS: function(ps){
      if(ps==null)
        return;
      this.createNext();
      var ps = this.next.getPS(ps.id)
      this.next.setPSs([ps]);
    },
  }
};

module.exports = {
  factory: order
}
