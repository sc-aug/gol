var model = {
  cData: [[]],
  row: 40,
  col: 40,

  initData: function() {
    for (var i = 0; i < this.row; i ++) {
      this.cData[i] = [];
    }
    for (var i = 0; i < this.row; i ++) {
      for (var j = 0; j < this.col; j ++) {
        this.cData[i][j] = false;
      }
    }
  }

}

var view = {
  generateTable: function(r,c) {
    var board = document.getElementById("board-wrap");
    var tbl = document.createElement("table");
    // tbl.setAttribute("id", "world");
    var row = document.createElement("tr");
    // creating all cells
    for (var i = 0; i < r; i++) {
      // creates a table row
      row = document.createElement("tr");
      for (var j = 0; j < c; j++) {
        var cell = document.createElement("td");
        cell.id = "id_"+i+"_"+j;
        //cell.setAttribute("id", ("id_"+i+"_"+j));
        cell.setAttribute("class", "die");
        row.appendChild(cell);
      }
      // add the row to the end of the table body
      tbl.appendChild(row);
    }
    board.appendChild(tbl);
    // sets the border attribute of tbl to 2;
  }

};

var controller = {
  initWorld: function() {
    // init data
    model.initData();
    // init view
    view.generateTable(model.row, model.col);
  }

}

function init() {
  // create world
  controller.initWorld();
}

window.onload = init;