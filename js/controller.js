var controller = {
  initWorld: function() {
    // world size
    model.setWorldSize(40); // default size
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
          view.live(i, j, size);
        else
          view.die(i, j, size);
      }
    }
  }

}