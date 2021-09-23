$("#chest").click(function () {

  for (let l = 0; l < canvas._objects.length; l++) {
    if (canvas._objects[l].radius) {
      canvas.remove(canvas._objects[l]);
      l = 0;
    }
  }
  //console.log(alfa * 180 / Math.PI);
  //linepers();
  //PloshPoligon();
 
});
var lineskal = { x: [], y: [] };
var poligplosh = { x: [], y: [] };
//console.log(alfa * 180 / Math.PI);

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

async function linepers() {
  if (lineskal.x.length > 0) {
    lineskal.x = [];
    lineskal.y = [];
    for (let l = 0; l < canvas._objects.length; l++) {
      if (canvas._objects[l].radius) {
        canvas.remove(canvas._objects[l]);
        l = 0;
      }
    }
  }

  for (var i = 0; i < poligon.length; ++i) {
    // var lin = poligon[i].LeNgth;
    for (var j = 0; j < poligon[i].LeNgth; j++) {
      if (j == poligon[i].x.length - 1) {
        var x2 = poligon[i].x[0];
        var y2 = poligon[i].y[0];
      } else if (poligon[i].x[j + 1]) {
        var x2 = poligon[i].x[j + 1];
        var y2 = poligon[i].y[j + 1];
      }
      var x1 = poligon[i].x[j];
      var y1 = poligon[i].y[j];

      if (
        !poligplosh.x.includes(Math.round(x1)) &&
        !poligplosh.y.includes(Math.round(y1))
        // && (g!=poligon[j].x.length - 1)
      ) {
        poligplosh.x.push(x1);
        poligplosh.y.push(y1);
      }

      if (poligon[i + 1]) {
        for (var k = 0; k < poligon.length; k++) {
          if (k != i) {
            for (let g = 0; g < poligon[k].LeNgth; g++) {
              if (g == poligon[k].x.length - 1) {
                var x4 = poligon[k].x[0];
                var y4 = poligon[k].y[0];
              } else if (poligon[k].x[g + 1]) {
                var x4 = poligon[k].x[g + 1];
                var y4 = poligon[k].y[g + 1];
              }
              var x3 = poligon[k].x[g];
              var y3 = poligon[k].y[g];
              /*
              if(!poligplosh.x.includes(Math.round(x3)) &&
              !poligplosh.y.includes(Math.round(y3))
              && (g!=poligon[k].x.length - 1)){
              poligplosh.x.push(x3);
              poligplosh.y.push(y3);}
*/
              var pruv = lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
              /* if (poligon[i-1]){
                if(poligon[i-1].x.includes(Math.round(pruv[0])) && poligon[i-1].y.includes(Math.round(pruv[1]))) 
                console.log("неть пельменей");
              }
             else*/
              if (
                pruv != false &&
                !poligplosh.x.includes(Math.round(pruv[0])) &&
                !poligplosh.y.includes(Math.round(pruv[1]))

                // && inPolyc(pruv[0], pruv[1]) == true
              ) {
                var circle = new fabric.Circle({
                  radius: 5,
                  fill: "blue",
                  left: pruv[0] - 5,
                  top: pruv[1] - 5,
                });
                canvas.add(circle);

                if (poligon[i - 1]) {
                  if (
                    !poligon[i - 1].x.includes(pruv[0]) &&
                    !poligon[i - 1].y.includes(pruv[1])
                  ) {
                    poligplosh.x.push(Math.round(pruv[0]));
                    poligplosh.y.push(Math.round(pruv[1]));
                  }
                } else {
                  poligplosh.x.push(Math.round(pruv[0]));
                  poligplosh.y.push(Math.round(pruv[1]));
                }
              }

              /*
              if(!poligplosh.x.includes(Math.round(x3)) &&
              !poligplosh.y.includes(Math.round(y3))
              && (g==poligon[k].x.length - 1)) {
                poligplosh.x.push(x3);
              poligplosh.y.push(y3);
              }*/
            }

            // break;
          }
        }
      }
    }
    poligon[i].x = poligplosh.x;
    poligon[i].y = poligplosh.y;
    poligplosh.x = [];
    poligplosh.y = [];
  }
};
// функцыя проверки пренадлежания точки обекту
function inPolyc(x, y) {
  var xp = poligon[0].x;
  var yp = poligon[0].y;
  j = poligon[0].LeNgth - 1;
  var c = 0;
  for (var i = 0; i < poligon[0].LeNgth; i++) {
    if (
      ((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
      x >= ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
    ) {
      c = !c;
    }
    j = i;
  }
  return c;
}

var getVector = function (p1, p2) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
  };
};

var dotProduct = function (v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
};

var crossProduct = function (v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
};

var getAngle = function (v1, v2) {
  var dot = dotProduct(v1, v2);
  var cross = crossProduct(v1, v2);

  return Math.atan2(cross, dot);
};
// функцыя нахождения угла векторов
var vectorscalyr = (x1, y1, x2, y2, x3, y3) => {
  var v1 = getVector({ x: x2, y: y2 }, { x: x1, y: y1 });
  var v2 = getVector({ x: x2, y: y2 }, { x: x3, y: y3 });
  var alpha = getAngle(v1, v2);
  return (alpha * 180) / Math.PI;
};
/* 
1 пепедача в функцыю вектора
  2 нахождение на нем всех пересичений
  3 сортировка пересичений от меншей дистанцыии до большей
  4добавление сортированых координат на вектро от x0,y0 пл x1,y1 
  */