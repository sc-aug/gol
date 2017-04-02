var model = {
  blocka: [[]],
  blockb: [[]],
  sign: true, // true for a, false for b
  row: 10,
  col: 10,
  creature_x: 0,
  creature_y: 0,
  creature_id: 0,

  /* Board */
  selectBoard10: function() {
    setBoard(10,10);
  },

  selectBoard40: function() {
    setBoard(40,40);
  },

  setBoard: function(r, c) {
    this.row = r;
    this.col = c;
  },

  genWorld: function() {
    this.cleanWorld();
    this.addCreature();
    this.refresh();
  },

  cleanWorld: function() {
    // clean world.
    this.sign = true;
    for (var i = 0; i < this.row; i ++) {
      this.blocka[i] = [];
      this.blockb[i] = [];
    }
    for (var i = 0; i < this.row; i ++) {
      for (var j = 0; j < this.col; j ++) {
        this.blocka[i][j] = false;
        this.blockb[i][j] = false;
      }
    }
  },

  addCreature: function() {
    switch(this.creature_id) {
      case 0:
        this.glider(this.creature_x, this.creature_y);
        break;
      case 1:
        this.blinker(this.creature_x, this.creature_y);
        break;
      default:
        this.glider(this.creature_x, this.creature_y);
    }
  },

  testInit: function() {
    this.cleanWorld();
    this.glider(3,3);
    this.refresh();
  },

  /* Compute the next generation */
  propogate: function() {
    var blockCur = (this.sign) ? this.blocka : this.blockb;
    var blockNext = (this.sign) ? this.blockb : this.blocka;
    var neighbor;
    this.sign = !this.sign;
    for (var i = 0; i < this.row; i ++) {
      for (var j = 0; j < this.col; j ++) {
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
    var rp, rq, R = this.row, C = this.col;
    for (var p = i-1; p <= i+1; p ++) {
      for (var q = j-1; q <= j+1; q ++) {
        if (p < 0) {
          rp = R-1;
        } else if (p >= R) {
          rp = 0;
        } else {
          rp = p;
        }

        if (q < 0) {
          rq = C-1;
        } else if (q >= C) {
          rq = 0;
        } else {
          rq = q;
        }

        if (block[rp][rq]) sum ++;
      }
    }
    return sum - block[i][j];
  },

  refresh: function() {
    // change td class --> show
    var block = (this.sign) ? this.blocka : this.blockb;
    for (var i = 0; i < this.row; i ++) {
      for (var j = 0; j < this.col; j ++) {
        if (block[i][j]) view.live("id_" + i + "_" + j);
        else view.die("id_" + i + "_" + j);
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
    for (var i = 0; i < this.row; i ++) {
      this.blocka[i][i] = true;
    }
  }
};


var view = {
  
  live: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "live");
  },

  die: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "die");
  }

};


var controller = {
  // change size then [update]
  panelBoardSize: function() {
    // get selected value
    var selectBoard = document.getElementById("boardsize");
    // change board size (model.row model.col)
    // console.log("controller ", selectBoard.value);
    this.chooseBoard(selectBoard.value);
    // update the world
    model.genWorld();
  },

  // change size then [update]
  panelNextGenBtn: function() {
    model.propogate();
    model.refresh();
  },

  chooseBoard: function(boardSize) {
    if (boardSize == 40) {
      model.setBoard40();
    } else { // use default board size
      model.setBoard10();
    }
  }

}

function init() {
  model.genWorld();
}

window.onload = init;
