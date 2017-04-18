
var controller = {

  genWorld: function() {
    model.cleanBlocks();
    model.addCreature();
    view.generateTable(model.size);
    model.refresh();
  }/*,

  // change creature
  panelChangeCreature: function() {
    // get creature id
    var selectCreature = document.getElementById("creatureSelector");

    model.setCreature(selectCreature.value);
    model.cleanBlocks();
    model.addCreature();
    model.refresh();
  },

  // change size then [update]
  panelChangeWorld: function() {
    // get selected value
    var selectBoard = document.getElementById("worldSelector");
    // set size
    model.setBoard(selectBoard.value);

    // remove the old world
    view.removeTable();
    // create the world
    controller.genWorld();
  },

  // change size then [update]
  panelNextGenBtn: function() {
    model.propogate();
    model.refresh();
  }*/

}
