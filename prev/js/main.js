// change creature
function handleCreatureSelector() {
  // get creature id
  var selectCreature = document.getElementById("creatureSelector");
  model.setCreature(selectCreature.value);

  model.cleanBlocks();

  model.addCreature();

  model.refresh();

}

// change size then [update]
function handleWorldSelector() {
  // remove the old world
  view.removeTable();

  // get selected value
  var selectWorld = document.getElementById("worldSelector");
  // set size
  model.setWorldSize(selectWorld.value);

  // create the new world
  controller.genWorld();

}

// change size then [update]
function handleNextGenBtn() {

  model.propogate();
  
  model.refresh();

}

// main
function init() {

  // generate the world
  controller.genWorld();

  // change creature
  var creatureSelector = document.getElementById("creatureSelector");
  creatureSelector.onchange = handleCreatureSelector;
  // creatureSelector.onchange = controller.panelChangeCreature;

  // change world
  var worldSelector = document.getElementById("worldSelector");
  worldSelector.onchange = handleWorldSelector;
  // worldSelector.onchange = controller.panelChangeWorld;

  // next generation button
  var nextGenBtn = document.getElementById("nextGenBtn");
  nextGenBtn.onclick = handleNextGenBtn;
  // nextGenBtn.onclick = controller.panelNextGenBtn;

}

window.onload = init;
