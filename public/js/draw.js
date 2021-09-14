 //======================================================================================================
 let can = document.getElementById('canvas');// холст
 can.width          = 500;                   // ширина холста
 can.height         = 500;                   // высота холста
 let ctx            = can.getContext('2d');  // выбрать пространство
 let pts            = [[]];                  // массив с точками координат
 let data           = null;                  // массив координат из localStorage
 let clearCoordinat;                         // сохраненые данные в localStorage
 let x, y;
 //======================================================================================================
 // выводим отображение координат(offset) на холсте при ведении мыши
 document.getElementById('canvas').onmousemove = function(event){
     event = event || window.event;
     document.getElementById('offsetX').innerHTML = event.offsetX;
     document.getElementById('offsetY').innerHTML = event.offsetY;
 };

 //======================================================================================================
 // убирает выделение холста синим цветом при двойном нажатии мыши
 document.getElementById('canvas');
 canvas.onselectstart =  () => { return false; };


 //=======================================================================================================
 // шаг назад по нажатию кнопки при раставлении точек
 $("#math").on("click",function(){
console.log(pts);

 });
 document.getElementById('back').addEventListener('click', function(event) {
     pts[pts.length-1].pop()
     repaint();
 },false);

 //======================================================================================================
 // замыкаение и отрисовка фигуры по двойному клику вызовом func(repaint) (JQUERY)
 $( "#canvas" ).dblclick(function() {
     pts[pts.length-1].pop(); // удалим повторную точку
     pts.push([])             // новая коллекция точек
     repaint();               // вызываем функцию отрисовки
 });
 //=======================================================================================================
 // события нажатия мыши и добавления координат в массив
 can.addEventListener('mousedown', function(e){
     pts[pts.length-1].push([
         e.pageX - e.target.offsetLeft,
         e.pageY - e.target.offsetTop
     ]);
     repaint();
     [e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop]

 });

 //=======================================================================================================
 // функция рисования и обновления точек на холсте по точкам из массива pts
  var repaint=()=>{

     ctx.clearRect(0,0,can.width,can.height)

     ctx.strokeStyle = '#00f';
     ctx.fillStyle = 'rgba(255, 255, 253, 0.5)' // Цвет
     ctx.lineWidth = 3;                         // Толщина линий
     ctx.lineJoin = "miter";                    // Закругленность соединений линий

     // ***рисуем фигуры***
     // shape = фигура
     // j     = номер фигуры
     // p     = точка. выражена как значение двух координат x, y в массиве по 2 элемента
     // i     = index массива
     pts.forEach((shape, j)=> {
         ctx.beginPath();
         shape.forEach((p, i) => {
             ctx[i ? 'lineTo' : 'moveTo'](...p);
         })

         if(j !== pts.length-1){
             ctx.fill();
             ctx.closePath();
         }

     ctx.stroke();
     })

     // рисуем синие точки только для последней фигуры
     pts[pts.length-1].forEach((p, i) => {
         ctx.strokeStyle = '#000';
         ctx.fillStyle = 'rgba(255, 255, 253, 0.5)'
         ctx.beginPath();
         ctx.arc(...p, 3.6 / 1.4 ,0, Math.PI * 2); //Круг
         // ctx.rect(...p, 6, 6)
         ctx.stroke();

     })

 //-----------------------------------------------------------------------------------------------------
     // кнопка очистки canvas
     document.getElementById('clearCanvas').addEventListener('click', function() {
         ctx.clearRect(0, 0, can.width, can.height);

         return pts = [[]];// отчищаю массив с точками для отрисовки фигуры
     }, false)
 };

 //=====================================================================================================
 document.getElementById('addDataFromInput').addEventListener('click', function(event) {
 let coordFromInput = [[]];
 let text = document.getElementsByClassName("input_coord");

 coordFromInput = coordFromInput.push(text);
 console.log(typeof coordFromInput);
});

 //======================================================================================================
 // pts = this.pts;
 // функция отслеживания состояния canvas



let mouse = {
     x: 0,
     y: 0,
 };

let selected = false;





let Poligon = function(...points) {
this.points = pts
}

Poligon.prototype = {
draw() {
 this.points.forEach((shape, j)=> {
         ctx.beginPath();
         shape.forEach((p, i) => {
             ctx[i ? 'lineTo' : 'moveTo'](...p);
         })

         if(j !== this.points.length-1){
             ctx.fill();
             ctx.closePath();
         }

     ctx.stroke();
     })
},
mouseIn() {
 return PointInPoligon(mouse, ...this.points)
}
};



let shapes = [
new Poligon(
 pts.forEach((shape, j)=> {
         ctx.beginPath();
         shape.forEach((p, i) => {
             ctx[i ? 'lineTo' : 'moveTo'](...p);
         })

         if(j !== pts.length-1){
             ctx.fill();
             ctx.closePath();
         }

     ctx.stroke();
     })
),

]

shapes.forEach(n => n.draw())

window.onmousemove = function(e) {
mouse.x = e.pageX - can.offsetLeft;
mouse.y = e.pageY - can.offsetTop;

if (selected) {
 selected.points.forEach(n => {
   n.x += e.movementX
   n.y += e.movementY
 })

 ctx.clearRect(0, 0, can.width, can.height)
 shapes.forEach(n => n.draw())
}
};

window.onmousedown = function() {
if (!selected) {
 shapes.forEach(n => {
   if (n.mouseIn(mouse)) {
     selected = n
   }
 })
}
};

window.onmouseup = function() {
selected = null;
};





function PointInPoligon(points) {
 return this.points
}