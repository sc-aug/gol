var model = {
  cData: [[]],
  SIZE: 0,

  initData: function() {
    for (var i = 0; i < this.row; i ++) {
      this.cData[i] = [];
    }
    for (var i = 0; i < this.row; i ++) {
      for (var j = 0; j < this.col; j ++) {
        this.cData[i][j] = false;
      }
    }
  },

  setWorldSize: function(s) {
    model.SIZE = s;
  },

  getWorldSize: function() {
    return model.SIZE;
  }

}
