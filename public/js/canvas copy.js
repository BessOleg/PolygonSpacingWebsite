var Rectangle = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isDragging = false;

    this.render = function (ctx) {
        ctx.save();

        ctx.beginPath();
      //  ctx.fillRect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
       // ctx.clearRect(75, 75, 50, 50);
        ctx.rect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
        ctx.fillStyle = 'green';
        ctx.fill();

        ctx.restore();
    }
}


var Arc = function (x, y, radius, radians) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radians = radians;
    this.isDragging = false;

    this.render = function (ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, this.radians, false);
        ctx.fillStyle = 'red';
        ctx.fill();

        ctx.restore();
    }
}

var MouseTouchTracker = function (canvas, callback) {

    function processEvent(evt) {
        var rect = canvas.getBoundingClientRect();
        var offsetTop = rect.top;
        var offsetLeft = rect.left;

        if (evt.touches) {
            return {
                x: evt.touches[0].clientX - offsetLeft,
                y: evt.touches[0].clientY - offsetTop
            }
        } else {
            return {
                x: evt.clientX - offsetLeft,
                y: evt.clientY - offsetTop
            }
        }
    }

    function onDown(evt) {
        evt.preventDefault();
        var coords = processEvent(evt);
        callback('down', coords.x, coords.y);
    }

    function onUp(evt) {
        evt.preventDefault();
        callback('up');
    }

    function onMove(evt) {
        evt.preventDefault();
        var coords = processEvent(evt);
        callback('move', coords.x, coords.y);
    }

    canvas.ontouchmove = onMove;
    canvas.onmousemove = onMove;

    canvas.ontouchstart = onDown;
    canvas.onmousedown = onDown;
    canvas.ontouchend = onUp;
    canvas.onmouseup = onUp;
}

function isHit(shape, x, y) {
    if (shape.constructor.name === 'Arc') {
        var dx = shape.x - x;
        var dy = shape.y - y;
        if (dx * dx + dy * dy < shape.radius * shape.radius) {
            return true
        }
    } else {
        if (x > shape.x - shape.width * 0.5 && y > shape.y - shape.height * 0.5 && x < shape.x + shape.width - shape.width * 0.5 && y < shape.y + shape.height - shape.height * 0.5) {
            return true;
        }
    }

    return false;
}

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
var startX = 0;
var startY = 0;

var rectangle = new Rectangle(50, 50, 100, 100);
rectangle.render(ctx);

var circle1 = new Arc(320, 140, 50, Math.PI);
circle1.render(ctx);

var circle = new Arc(200, 140, 50, Math.PI * 2);
circle.render(ctx);


var poligon = [
    {polX:[],polY: [], vhod: false}
];


ctx.beginPath();
ctx.moveTo(25,25);
ctx.lineTo(105,25);
ctx.lineTo(25,105);
ctx.fill();




var mtt = new MouseTouchTracker(canvas,
    function (evtType, x, y) {
       // ctx.clearRect(0, 0, canvas.width, canvas.height);

        switch (evtType) {

            case 'down':
                startX = x;
                startY = y;
                if (isHit(rectangle, x, y)) {
                    rectangle.isDragging = true;
                }
                if (isHit(circle, x, y)) {
                    circle.isDragging = true;
                }
                break;

            case 'up':
                rectangle.isDragging = false;
                circle.isDragging = false;
                break;

            case 'move':
                var dx = x - startX;
                var dy = y - startY;
                startX = x;
                startY = y;

                if (rectangle.isDragging) {
                    rectangle.x += dx;
                    rectangle.y += dy;
                }

                if (circle.isDragging) {
                    circle.x += dx;
                    circle.y += dy;
                }
                break;
        }

        circle.render(ctx);
        rectangle.render(ctx);
    }
);