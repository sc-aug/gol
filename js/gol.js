var model = {
  blocka: [[]],
  blockb: [[]],
  sign: true, // true for a, false for b
  row: 10,
  col: 10,
  /* basic function */
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
  init: function() {
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
  glider: function(i, j) {
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
  /* tests */
  test01: function() {
    model.init();
    model.diagnal();
    model.refresh();
  },
  test02: function() {
    model.init();
    model.blinker(3,4);
    model.refresh();
  },
  test03: function() {
    model.init();
    model.glider(3,3);
    model.refresh();
  }
}

/* System Func */
function wait(ms){
  console.log("waiting ...");
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}

/* Test01 */
function test01() {
  controller.test01();
}
/* Test02 */
function test02() {
  controller.test02();
  // wait NOT WORK!!!!!!
  setTimeout(model.propogate, 4000);
  setTimeout(model.refresh, 4000);
}
/* Test03 */
function handleGenBtn() {
  model.propogate();
  model.refresh();
}
function test03() {
  //init
  controller.test03();
  // handle
  var genBtn = document.getElementById("nextGen");
  genBtn.onclick = handleGenBtn;
}

window.onload = test03;

