function init() {
  controller.genWorld();

  // change creature
  var creatureSelector = document.getElementById("creatureSelector");
  creatureSelector.onchange = controller.panelChangeCreature;
  // change world
  var worldSelector = document.getElementById("worldSelector");
  worldSelector.onchange = controller.panelChangeWorld;
  // next generation button
  var nextGenBtn = document.getElementById("nextGenBtn");
  nextGenBtn.onclick = controller.panelNextGenBtn;
}

window.onload = init;
