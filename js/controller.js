var controller = {
  initWorld: function() {
    // world size
    model.setWorldSize(40); // default size
    // init data
    model.initData();
    // init view
    view.generateTable(model.getWorldSize());
  },

  refresh: function() {
    var mat = model.getMatrix();
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