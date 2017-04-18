var controller = {
  initWorld: function() {
    // world size
    model.setWorldSize(40); // default size
    // init data
    model.initData();
    // init view
    view.generateTable(model.getWorldSize());
  }

}

function init() {
  // create world
  controller.initWorld();
}

window.onload = init;