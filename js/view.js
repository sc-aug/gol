var view = {
  generateTable: function(size) {
    //var live = "world" + size + "live";
    //var die = "world" + size + "die";
    var board = document.getElementById("world-wrap");
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "world");
    var row = document.createElement("tr");
    // creating all cells
    for (var i = 0; i < size; i++) {
      // creates a table row
      row = document.createElement("tr");
      for (var j = 0; j < size; j++) {
        var cell = document.createElement("td");
        cell.id = "id_"+i+"_"+j;
        //cell.setAttribute("id", ("id_"+i+"_"+j));
        //cell.setAttribute("class", die);
        row.appendChild(cell);
      }
      // add the row to the end of the table body
      tbl.appendChild(row);
    }
    board.appendChild(tbl);
    // sets the border attribute of tbl to 2;
  },

  removeTable: function(id) {
    var tbl = document.getElementById("world");
    if(tbl) tbl.parentNode.removeChild(tbl);
  },

  live: function(i, j, size) {
    var cell = document.getElementById("id_" + i + "_" + j);
    cell.setAttribute("class", ("live"));
  },

  die: function(i, j, size) {
    var cell = document.getElementById("id_" + i + "_" + j);
    cell.setAttribute("class", ("die"));
  }

};
