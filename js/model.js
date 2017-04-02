var model = {
  blocka: [[]],
  blockb: [[]],
  sign: true, // true for a, false for b
  size: Number(10),
  creature_x: 3,
  creature_y: 3,
  creature_id: 0,

  setBoard: function(size) {
    this.size = Number(size);
  },

  setCreature: function(id) {
    this.creature_id = Number(id);
  },

  cleanBlocks: function() {
    // clean blocks.
    this.sign = true;
    for (var i = 0; i < this.size; i ++) {
      this.blocka[i] = [];
      this.blockb[i] = [];
    }
    for (var i = 0; i < this.size; i ++) {
      for (var j = 0; j < this.size; j ++) {
        this.blocka[i][j] = false;
        this.blockb[i][j] = false;
      }
    }
  },

  addCreature: function() {
    switch(this.creature_id) {
      case 0:
      case "0":
        this.glider(this.creature_x, this.creature_y);
        break;
      case 1:
      case "1":
        this.blinker(this.creature_x, this.creature_y);
        break;
      default:
        this.glider(this.creature_x, this.creature_y);
    }
  },

  /* Compute the next generation */
  propogate: function() {
    var blockCur = (this.sign) ? this.blocka : this.blockb;
    var blockNext = (this.sign) ? this.blockb : this.blocka;
    var neighbor;
    this.sign = !this.sign;
    for (var i = 0; i < this.size; i ++) {
      for (var j = 0; j < this.size; j ++) {
        neighbor = this.cntNeighbor(blockCur, i, j);
        //console.log("cnt neighbor: " + neighbor);
        if (blockCur[i][j]) {
          blockNext[i][j] = (neighbor < 2 || neighbor > 3) ? false : true;
        } else {
          blockNext[i][j] = (neighbor == 3) ? true : false;
        }
      }
    }
  },

  cntNeighbor: function(block, i, j) {
    var sum = 0;
    var rp, rq;
    for (var p = i-1; p <= i+1; p ++) {
      for (var q = j-1; q <= j+1; q ++) {
        rp = this.getPosition(p);
        rq = this.getPosition(q);
        if (block[rp][rq]) sum ++;
      }
    }
    //console.log(i,j,sum);
    return sum - block[i][j];
  },

  getPosition: function(i) {
    var size = Number(this.size);
    while (i < 0) {
      i += size;
    }
    while (i >= size) {
      i -= size;
    }
    return i;
  },

  refresh: function() {
    // change td class --> show
    var block = (this.sign) ? this.blocka : this.blockb;
    for (var i = 0; i < this.size; i ++) {
      for (var j = 0; j < this.size; j ++) {
        if (block[i][j]) view.live("id_" + i + "_" + j, this.size);
        else view.die("id_" + i + "_" + j, this.size);
      }
    }
  },
  
  /* formula */
  glider: function(i,j) {
    // var i = this.creature_x;
    // var j = this.creature_y
    this.sign = true;
    this.blocka[i][j+1] = true;
    this.blocka[i+1][j+2] = true;
    this.blocka[i+2][j] = true;
    this.blocka[i+2][j+1] = true;
    this.blocka[i+2][j+2] = true;
  },
  
  blinker: function(i,j) {
    this.sign = true;
    this.blocka[i][j] = true;
    this.blocka[i][j+1] = true;
    this.blocka[i][j+2] = true;
  },
  
  diagnal: function() {
    this.sign = true;
    for (var i = 0; i < this.size; i ++) {
      this.blocka[i][i] = true;
    }
  }
};

