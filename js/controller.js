var controller = {
  
  initWorld: function(size, sp) {
    // remove table
    view.removeTable();
    // default 40
    if (!size) size = 40;
    // default 200
    if (!sp) sp = 200;
    // world size
    model.setWorldSize(size); // default size
    // autogen speed
    model.setSpeed(sp);
    // init data
    model.initData();
    // generate table structure
    view.generateTable(model.getWorldSize());
    // update table
    controller.refresh();
  },

  refresh: function() {
    var mat = model.getCurMatrix();
    var size = model.getWorldSize();
    for (var i = 0; i < size; i ++) {
      for (var j = 0; j < size; j ++) {
        if (mat[i][j])
          view.live(i, j);
        else
          view.die(i, j);
      }
    }
  },

  // for manual generate Btn
  oneGenerate: function() {
    model.propogate();
    model.flipSwicher();
    controller.refresh();
  },

  // mouse click function
  flipCellState: function(tdid) {
    var mat = model.getCurMatrix();
    var cord = tdid.split("_");
    var i = cord[1], j = cord[2];
    var state = mat[i][j];
    mat[i][j] = !state;
    if (mat[i][j]) {
      view.live(i,j);
    } else {
      view.die(i,j);
    }
  }

}