function handleAddRandBtn() {
  stopGenerate();
  var pairList = [[]];
  var cnt = model.getWorldSize();
  for (var i = 0; i < cnt; i ++) {
    r = Math.floor(Math.random() * model.getWorldSize());
    c = Math.floor(Math.random() * model.getWorldSize());
    pairList[i] = [];
    pairList[i][0] = r;
    pairList[i][1] = c;
  }
  model.addRandNode(pairList);
  controller.refresh();
}

function handleWorldSelector(Obj) {
  stopGenerate();
  var size = Obj.target.value;
  controller.initWorld(size);
}

function handleNextGenBtn() {
  stopGenerate();
  controller.oneGenerate();
}

function handleAutoGenBtn() {
  intv = setInterval(function() {
    controller.oneGenerate()}, 100);
  // var cnt = 5000;
  // intv = setInterval(function() {
  //   if (cnt != 0) {
  //     controller.oneGenerate();
  //     cnt -= 1;
  //   } else {
  //     window.clearInterval(intv);
  //   }}, 100);
}

function handleStopAutoGenBtn() {
  stopGenerate();
}

function handleCleanBtn() {
  stopGenerate();
  model.clean();
  controller.refresh();
}

function stopGenerate() {
  clearInterval(intv);
}

function init() {
  // create world
  controller.initWorld();

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
}

var intv = null;

window.onload = init;