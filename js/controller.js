var controller = {
  initWorld: function(size) {
    // remove table
    view.removeTable();
    // default 40
    if (!size) size = 40;
    // world size
    model.setWorldSize(size); // default size
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
  }

}