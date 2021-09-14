var PloshPoligon = () => {
    var pol = 0,
      pruv=false,
      minugol = 180,
      pol1,
      tekpoligon;
      var x1,y1,y2,x2;
    for (let i = 0; i < poligon[pol].x.length; i++) {
      if (minugol!=360&& pruv !=false) {
        x1 = x2;
        y1 = y2;
        x2 = pruv[0];
        y2 = pruv[1];
        //pol = pol1;
       
      } else {
         x1 = poligon[pol].x[i];
         y1 = poligon[pol].y[i];
        if (poligon[pol].x[i + 1]) {
           x2 = poligon[pol].x[i + 1];
           y2 = poligon[pol].y[i + 1];
        } else if (i == poligon[pol].x.length - 1) {
           x2 = poligon[pol].x[0];
           y2 = poligon[pol].y[0];
        }
      }
      minugol = 180;
      for (let g = 0; g < poligon.length; g++) {
        pol1 = g;
        if (g != pol)
          for (let j = 0; j < poligon[g].x.length; j++) {
            // minugol = null;
            var x3 = poligon[g].x[j];
            var y3 = poligon[g].y[j];
            if (inPolyc(x3, y3) && poligon[g].x[j + 1]) {
              var x4 = poligon[g].x[j + 1];
              var y4 = poligon[g].y[j + 1];
             // console.log(x4,y4);
              pruv = lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
            } else if (inPolyc(x3, y3) && poligon[g].x.length - 1 == j) {
              var x4 = poligon[g].x[0];
              var y4 = poligon[g].y[0];
             // console.log(x4,y4);
             // pruv = lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
             pruv = lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
            }
            //console.log("pruv: ",pruv, g , j);
            if (
              pruv != false &&
              vectorscalyr(x1, y1, x2, y2, pruv[0], pruv[1]) < minugol
            ) {
              minugol = vectorscalyr(x1, y1, x2, y2, pruv[0], pruv[1]);
            }
          }
      }
      poligplosh.x.push(x1);
      poligplosh.y.push(y1);
      var circle = new fabric.Circle({
        radius: 5,
        fill: "red",
        left: x1 - 5,
        top: y1 - 5,
      });
      canvas.add(circle);
    }
  };

  var vhod = (xi, yi) => {
    var flag;
    for (let i = 0; i < poligon[0].LeNgth; i++) {
      if (poligon[0].x[i + 1]) {
        if (i == poligon[0].LeNgth - 1) {
          var prenad =
            (poligon[0].x[i] - xi) * (poligon[0].y[0] - poligon[0].y[i]) -
            (poligon[0].x[0] - poligon[0].x[i]) * (poligon[0].y[i] - yi);
        } else {
          var prenad =
            (poligon[0].x[i] - xi) * (poligon[0].y[i + 1] - poligon[0].y[i]) -
            (poligon[0].x[i + 1] - poligon[0].x[i]) * (poligon[0].y[i] - yi);
        }
  
        if (Math.round(prenad) >= 0) {
          //  console.log(Math.round(prenad));
          flag = true;
        } else {
          // console.log(Math.round(prenad));
          return false;
        }
      }
    }
    return flag;
  };
  