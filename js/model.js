var model = {
  matrix0: [[]],
  matrix1: [[]],
  swicher: true,
  SIZE: 0,

  initData: function() {
    this.swicher = true;
    this.matrix0 = [[]]; this.matrix1 = [[]];
    for (var i = 0; i < this.SIZE; i ++) {
      this.matrix0[i] = [];
      this.matrix1[i] = [];
    }
    for (var i = 0; i < this.SIZE; i ++) {
      for (var j = 0; j < this.SIZE; j ++) {
        this.matrix0[i][j] = false;
        this.matrix1[i][j] = false;
      }
    }
  },

  addRandNode: function(pairs) {
    var mat = model.getCurMatrix();
    for (var i = 0; i < pairs.length; i ++) {
      var r = pairs[i][0];
      var c = pairs[i][1];
      mat[r][c] = true;
    }
  },

  setWorldSize: function(s) {
    model.SIZE = Number(s);
  },

  getWorldSize: function() {
    return model.SIZE;
  },

  getCurMatrix: function() {
    return model.swicher ? model.matrix0 : model.matrix1;
  },

  getNextMatrix: function() {
    return model.swicher ? model.matrix1 : model.matrix0;
  },

  getSwicher() {
    return model.swicher;
  },

  flipSwicher() {
    model.swicher = !model.swicher;
  },

  clean: function() {
    var mat = model.getCurMatrix();
    var size = model.getWorldSize();
    for (var i = 0; i < size; i ++) {
      for (var j = 0; j < size; j ++) {
        mat[i][j] = false;
      }
    }
  },

  /* Compute the next generation */
  propogate: function() {
    var matCur =  model.getCurMatrix();
    var matNext = model.getNextMatrix();
    var size = model.getWorldSize();
    var cnt;
    for (var i = 0; i < size; i ++) {
      for (var j = 0; j < size; j ++) {
        cnt = this.cntNeighbor(matCur, i, j);
        if (matCur[i][j]) {
          matNext[i][j] = (cnt < 2 || cnt > 3) ? false : true;
        } else {
          matNext[i][j] = (cnt == 3) ? true : false;
        }
      }
    }
  },

  cntNeighbor: function(mat, i, j) {
    var sum = 0;
    var rp, rq;
    for (var p = i-1; p <= i+1; p ++) {
      for (var q = j-1; q <= j+1; q ++) {
        rp = model.getPosition(p);
        rq = model.getPosition(q);
        if (mat[rp][rq]) sum ++;
      }
    }
    //console.log(i,j,sum);
    return sum - mat[i][j];
  },

  getPosition: function(i) {
    var size = model.getWorldSize();
    while (i < 0) { i += size; }
    while (i >= size) { i -= size; }
    return i;
  }

}
