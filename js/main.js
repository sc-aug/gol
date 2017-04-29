function handleAddRandBtn() {
  stopGenerate();
  controller.addRandNode();
  controller.refresh();
}

function handleWorldSelector(Obj) {
  stopGenerate();
  var sp = model.getSpeed();
  controller.initWorld(Obj.target.value, sp);
  initMouseFunc();
}

function handleNextGenBtn() {
  stopGenerate();
  controller.oneGenerate();
}

function handleSpeedSelector(Obj) {
  stopGenerate();
  model.setSpeed(Obj.target.value);
}

function handleAutoGenBtn() {
  stopGenerate();
  var sp = model.getSpeed();
  intv = setInterval(function() {
    controller.oneGenerate()}, sp);
}

function handleStopAutoGenBtn() {
  stopGenerate();
}

function handleCleanBtn() {
  stopGenerate();
  model.clean();
  controller.refresh();
}

function handleCellOnclick(Obj) {
  stopGenerate()
  controller.flipCellState(Obj.target.id);
}

function handleCellMouseOver(Obj) {
  controller.focusCell(Obj.target.id);
}

function handleCellMouseOut(Obj) {
  controller.unFocusCell(Obj.target.id);
}

function stopGenerate() {
  clearInterval(intv);
}

// Mouse func
function getTableCellsObj() {
  var tbl = [[]];
  var size = model.getWorldSize();

  for (var i = 0; i < size; i ++) tbl[i] = [];

  for (var i = 0; i < size; i ++) {
    for (var j = 0; j < size; j ++) {
      tbl[i][j] = document.getElementById("id_"+i+"_"+j);
    }
  }
  return tbl;
}

function initMouseFunc() {
  // MOUSE
  var size = model.getWorldSize();
  var tableCells = getTableCellsObj();
  for (var i = 0; i < size; i ++) {
    for (var j = 0; j < size; j ++) {
      tableCells[i][j].onclick = handleCellOnclick;
      tableCells[i][j].onmouseover = handleCellMouseOver;
      tableCells[i][j].onmouseout = handleCellMouseOut;
    }
  }
}

function init() {

  // Add Random Nodes Button
  var addRandBtn = document.getElementById("addRandBtn");
  addRandBtn.onclick = handleAddRandBtn;

  // change world
  var worldSelector = document.getElementById("worldSelector");
  worldSelector.onchange = handleWorldSelector;

  // Generate next state of world
  var nextGenBtn = document.getElementById("nextGenBtn");
  nextGenBtn.onclick = handleNextGenBtn;

  // auto gen
  var autoGenBtn = document.getElementById("autoGenBtn");
  autoGenBtn.onclick = handleAutoGenBtn;
  
  // stop
  var stopAutoGenBtn = document.getElementById("stopAutoGenBtn");
  stopAutoGenBtn.onclick = handleStopAutoGenBtn;

  // Clean World
  var cleanBtn = document.getElementById("cleanBtn");
  cleanBtn.onclick = handleCleanBtn;

  // speed Selector
  var speedSelector = document.getElementById("speedSelector");
  speedSelector.onchange = handleSpeedSelector;
  speedSelector.onclick = handleStopAutoGenBtn;

  // create world
  controller.initWorld(worldSelector.value, speedSelector.value);

  // Mouse click function
  initMouseFunc();

}

var intv = null;

window.onload = init;

