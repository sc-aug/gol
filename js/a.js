function generateTable(R, C) {
  // get the reference for the body
  var block = document.getElementById("field");

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  //var tblBody = document.createElement("tbody");
  var row = document.createElement("tr");
  // creating all cells
  for (var i = 0; i < R; i++) {
    // creates a table row
    row = document.createElement("tr");
 
    for (var j = 0; j < C; j++) {
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
 
  block.appendChild(tbl);
}
