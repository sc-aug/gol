var model = {
  blocka: [[]],
  blockb: [[]],
  sign: true, // true for a, false for b
  size: 10,
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

  setBoard: function(size) {
    this.size = size;
  },

  genWorld: function() {
    view.generateTable(this.size);
    this.cleanWorld();
    this.addCreature();
    this.refresh();
  },

  cleanWorld: function() {
    // clean world.
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
    var rp, rq, size = this.size;
    for (var p = i-1; p <= i+1; p ++) {
      for (var q = j-1; q <= j+1; q ++) {
        rp = this.getPosition(p, size);
        rq = this.getPosition(q, size);
        if (block[rp][rq]) sum ++;
      }
    }
    console.log(i,j,sum);
    return sum - block[i][j];
  },

  getPosition: function(i, size) {
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


var view = {
  
  live: function(location, size) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", ("world" + size + "live"));
  },

  die: function(location, size) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", ("world" + size + "die"));
  },

  // tableSize10: function(location) {
  //   var cell = document.getElementById(location);
  // },

  // tableSize40: function(location) {
  //   var cell = document.getElementById(location);
  // },

  generateTable: function(size) {
    // get the reference for the body
    var block = document.getElementById("field");

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    //var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    // creating all cells
    for (var i = 0; i < size; i++) {
      // creates a table row
      row = document.createElement("tr");
 
      for (var j = 0; j < size; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        cell.setAttribute("id", ("id_"+i+"_"+j));
        row.appendChild(cell);
      }
 
      // add the row to the end of the table body
      tbl.appendChild(row);
    }
 
    // // put the <tbody> in the <table>
    // tbl.appendChild(tblBody);
    // appends <table> into <body>
    block.appendChild(tbl);
    // sets the border attribute of tbl to 2;
  }

};


var controller = {

  genWorld: function() {
    model.cleanWorld();
    model.addCreature();
    view.generateTable(model.size);
    model.refresh();
  },

  // change size then [update]
  panelBoardSize: function() {
    // get selected value
    var selectBoard = document.getElementById("boardsize");
    // console.log("controller ", selectBoard.value);
    //view.generateTable(selectBoard.value);
    model.size = selectBoard.value;
    // update the world
    this.genWorld();
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
  controller.genWorld();
}

window.onload = init;
