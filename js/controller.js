
var controller = {

  genWorld: function() {
    model.cleanBlocks();
    model.addCreature();
    view.generateTable(model.size);
    model.refresh();
  },

  // change creature
  panelCreature: function() {
    // get creature id
    var selectCreature = document.getElementById("creature");

    model.setCreature(selectCreature.value);
    model.cleanBlocks();
    model.addCreature();
    model.refresh();
  },

  // change size then [update]
  panelBoardSize: function() {
    // get selected value
    var selectBoard = document.getElementById("boardsize");
    // set size
    model.setBoard(selectBoard.value);

    // remove the old world
    view.removeTable();
    // create the world
    this.genWorld();
  },

  // change size then [update]
  panelNextGenBtn: function() {
    model.propogate();
    model.refresh();
  }

}
