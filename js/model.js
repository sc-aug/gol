var model = {
  matrix0: [[]],
  matrix1: [[]],
  swicher: true,
  SIZE: 0,

  initData: function() {
    this.swicher = true;
    for (var i = 0; i < this.SIZE; i ++) {
      this.matrix0[i] = [];
      this.matrix1[i] = [];
    }
    for (var i = 0; i < this.SIZE; i ++) {
      for (var j = 0; j < this.SIZE; j ++) {
        this.matrix0[i][j] = false;
        this.matrix0[i][j] = false;
      }
    }
  },

  addRandNode: function(pairs) {
    var mat = model.getMatrix();
    for (var i = 0; i < pairs.length; i ++) {
      var r = pairs[i][0];
      var c = pairs[i][1];
      mat[r][c] = true;
    }
  },

  setWorldSize: function(s) {
    model.SIZE = s;
  },

  getWorldSize: function() {
    return model.SIZE;
  },

  getMatrix: function() {
    return model.swicher ? model.matrix0 : model.matrix1;
  }

}
