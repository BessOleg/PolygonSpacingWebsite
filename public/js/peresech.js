var Peres = (array, nam) => {
  // console.log(array);
  array.xspare = [];
  array.yspare = [];
  array.vhod = false;
  for (let i = 0; i < array.x.length; i++) {
    if (i == array.x.length - 1) {
      var x2 = array.x[0];
      var y2 = array.y[0];
    }
    if (array.x[i + 1]) {
      var x2 = array.x[i + 1];
      var y2 = array.y[i + 1];
    }

    var x1 = array.x[i];
    var y1 = array.y[i];
    //console.log(x1,y1,x2,y2);
    for (let j = 0; j < poligon.length; j++) {
      if (j != nam) {
        for (let k = 0; k < poligon[j].x.length; k++) {
          if (k == array.x.length - 1) {
            var x4 = poligon[j].x[0];
            var y4 = poligon[j].y[0];
          }
          if (poligon[j].x[k + 1]) {
            var x4 = poligon[j].x[k + 1];
            var y4 = poligon[j].y[k + 1];
          }

          var x3 = poligon[j].x[k];
          var y3 = poligon[j].y[k];

          var prov = lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
          // console.log(prov, j, k, x1, y1, x2, y2, x3, y3, x4, y4);
          // console.log(math.intersect([x1, y1], [x2, y2], [x3, y3], [x4, y4]));
          if (prov != false) {
            peres.push({
              x: Math.round(prov[0]),
              y: Math.round(prov[1]),
              dist: disance(x1, y1, prov[0], prov[1]),
            });

            sortByAge(peres);
            array.vhod = true;
            // console.log(peres, i);
          }
        }
      }
    }
    //console.log("дошол");
    array.xspare.push(x1);
    array.yspare.push(y1);
    for (let t = 0; t < peres.length; t++) {
      console.log(peres);
      array.xspare.push(peres[t].x);
      array.yspare.push(peres[t].y);
    }
    peres = [];
  }
};

var peres = [];
//[{x:0,y:0, dist:0}];
//сортировка
function sortByAge(arr) {
  arr.sort((a, b) => (a.dist > b.dist ? 1 : -1));
}
//дистанцыя
var disance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};
//пересичение
var lineSegmentsIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  var a_dx = x2 - x1;
  var a_dy = y2 - y1;
  var b_dx = x4 - x3;
  var b_dy = y4 - y3;

  var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
  var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1
    ? [x1 + t * a_dx, y1 + t * a_dy]
    : false;
};
