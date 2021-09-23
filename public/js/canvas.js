var roof = null;
var roofPoints = [];
var lines = [];
var lineCounter = 0;
var drawingObject = {};
drawingObject.type = "";
drawingObject.background = "";
drawingObject.border = "";
var poligon = [];
var NumPolig = 0;
var p1 = false;

//[{x:[],y:[],number:},{x:[123],y:[12341]}]

//poligon.push({x:[],y:[]})
//poligon[2].x.push(5)
//console.log(poligon);

function Point(x, y) {
  this.x = x;
  this.y = y;
}

$("#poly").click(function () {
  if (drawingObject.type == "roof") {
    drawingObject.type = "";
    lines.forEach(function (value, index, ar) {
      canvas.remove(value);
    });
    //canvas.remove(lines[lineCounter - 1]);
    roof = makeRoof(roofPoints);
    canvas.add(roof);
    canvas.renderAll();
  } else {
    drawingObject.type = "roof"; // roof type
    p1 = true;
  }
});

// canvas Drawing
var canvas = new fabric.Canvas("canvas-tools");
var x = 0;
var y = 0;

fabric.util.addListener(window, "dblclick", function () {
  drawingObject.type = "";
  lines.forEach(function (value, index, ar) {
    canvas.remove(value);
  });
  canvas.remove(lines[lineCounter - 1]);
  roof = makeRoof(roofPoints);
  canvas.add(roof);
  canvas.renderAll();
  var vhodflag = false;
  poligon[NumPolig].x.pop(); //poligon[NumPolig].xspare = poligon[NumPolig].x;
  poligon[NumPolig].y.pop(); //poligon[NumPolig].yspare = poligon[NumPolig].y;
  poligon[NumPolig].LeNgth = poligon[NumPolig].x.length;
  if (NumPolig != 0)
    for (let i = 0; i < poligon[NumPolig].x.length; i++) {
      if (inPolyc(poligon[NumPolig].x[i], poligon[NumPolig].y[i]) == true)
        vhodflag = true;
    }

  if (vhodflag != false) poligon[NumPolig].vhod = true;
  if (NumPolig != 0) {
    Peres(poligon[NumPolig], NumPolig);
  }
  NumPolig++;

  //clear arrays
  roofPoints = [];
  lines = [];
  lineCounter = 0;
  objectmove = null;
});

var mausx, mausy;
canvas.on("mouse:down", function (options) {
  if (objectmove != null) {
    mausy = 0;
    mausx = 0;
    objectmove = null;
  } else if (options.target && options.target.stroke == "green") {
    console.log(options.target);
    mausx = event.offsetX;
    mausy = event.offsetY;
    objectmove = options.target;
  }

  if (drawingObject.type == "roof") {
    canvas.selection = false;
    setStartingPoint(options); // set x,y
    roofPoints.push(new Point(x, y));
    var points = [x, y, x, y];
    lines.push(
      new fabric.Line(points, {
        strokeWidth: 3,
        selectable: false,
        stroke: "red",
      })
        .setOriginX(x)
        .setOriginY(y)
    );
    //console.log(x ,"_", y);
    if (p1) {
      poligon.push({
        x: [],
        y: [],
        xspare: [],
        yspare: [],
        NumPol: NumPolig,
        LeNgth: 0,
        vhod: false,
        masperes: [],
      });
      p1 = false;
    }

    poligon[NumPolig].y.push(Math.round(y));
    poligon[NumPolig].x.push(Math.round(x));

    canvas.add(lines[lineCounter]);
    lineCounter++;

    canvas.on("mouse:up", function (options) {
      canvas.selection = true;
    });
  }
});
var objectmove = null;

canvas.on("mouse:move", function (options) {
  if (
    lines[0] !== null &&
    lines[0] !== undefined &&
    drawingObject.type == "roof"
  ) {
    setStartingPoint(options);
    lines[lineCounter - 1].set({
      x2: x,
      y2: y,
    });

    canvas.renderAll();
  }
  if (objectmove)
    if (objectmove.stroke == "green") {
      canvas.on("mouse:up", async function (options) {
        console.log("yes");
        if (
          objectmove &&
          !isNaN(objectmove.NumPol) &&
          poligon.length > objectmove.NumPol
        ) {
          var number = objectmove.NumPol; //number
          var mx = parseInt(event.offsetX);
          var my = parseInt(event.offsetY);
          var dx = mx - mausx;
          var dy = my - mausy;

          for (var i = 0; i < poligon[number].x.length; ++i) {
            poligon[number].x[i] += Math.round(dx);
            poligon[number].y[i] += Math.round(dy);
          }
          if (number != 0) {
            Peres(poligon[number], number);
          }
          mausx = mx;
          mausy = my;
        }
      });
    }

  document.getElementById("offsetX").innerHTML = event.offsetX;
  document.getElementById("offsetY").innerHTML = event.offsetY;
});

function setStartingPoint(options) {
  var offset = $("#canvas-tools").offset();
  x = options.e.pageX - offset.left;
  y = options.e.pageY - offset.top;
}

function makeRoof(roofPoints) {
  var left = findLeftPaddingForRoof(roofPoints);
  var top = findTopPaddingForRoof(roofPoints);
  roofPoints.push(new Point(roofPoints[0].x, roofPoints[0].y));
  var roof = new fabric.Polyline(roofPoints, {
    fill: "rgba(207, 144, 68, 0.2)",
    stroke: "green",
    NumPol: NumPolig,
  });
  if (NumPolig == 0) roof.stroke = "blue";

  roof.set({
    left: left,
    top: top,
  });

  return roof;
}

function findTopPaddingForRoof(roofPoints) {
  var result = 999999;
  for (var f = 0; f < lineCounter; f++) {
    if (roofPoints[f].y < result) {
      result = roofPoints[f].y;
    }
  }
  return Math.abs(result);
}

function findLeftPaddingForRoof(roofPoints) {
  var result = 999999;
  for (var i = 0; i < lineCounter; i++) {
    if (roofPoints[i].x < result) {
      result = roofPoints[i].x;
    }
  }
  return Math.abs(result);
}
