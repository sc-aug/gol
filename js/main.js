function handleAddRandBtn() {
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
  var size = Obj.srcElement.value;
  controller.initWorld(size);
}

function handleNextGenBtn() {
  model.propogate();
  model.flipSwicher();
  controller.refresh();
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
}

window.onload = init;