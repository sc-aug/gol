var model = {
  matrix: [[]],
  SIZE: 0,

  initData: function() {
    for (var i = 0; i < this.SIZE; i ++) {
      this.matrix[i] = [];
    }
    for (var i = 0; i < this.SIZE; i ++) {
      for (var j = 0; j < this.SIZE; j ++) {
        this.matrix[i][j] = false;
      }
    }
  },

  addRandNode: function(pairs) {
    for (var i = 0; i < pairs.length; i ++) {
      var r = pairs[i][0];
      var c = pairs[i][1];
      model.matrix[r][c] = true;
    }
  },

  setWorldSize: function(s) {
    model.SIZE = s;
  },

  getWorldSize: function() {
    return model.SIZE;
  },

  getMatrix: function() {
    return model.matrix;
  }

}
