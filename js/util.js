var util = {
  genRandNode: function(worldSize) {
    var xyList = [[]];
    var worldSize = model.getWorldSize();

    for (var i = 0; i < worldSize; i ++) {
      r = Math.floor(Math.random() * worldSize);
      c = Math.floor(Math.random() * worldSize);
      xyList[i] = [];
      xyList[i][0] = r;
      xyList[i][1] = c;
    }
    return xyList;
  }
}