var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var pause;
var shipImg;
var canvas;
var context;
var updater;
var shipX;
var shipY;
var container;
var mouseLoc;
var dest;
var mouseDown;
var objects;
var asteroidImg;
var world;
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerText += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerText = new Date().toUTCString();
        }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.normalize = function () {
        var magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
    };
    Vector2.distance = function distance(dest, start) {
        return Math.sqrt(Math.pow(dest.y - start.y, 2) + Math.pow(dest.x - start.x, 2));
    }
    return Vector2;
})();
var Entity = (function () {
    function Entity(pos) {
        this.position = pos;
        this.velocity = new Vector2(0, 0);
        this.maxVelocity = 3;
    }
    Entity.prototype.update = function (dt) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    Entity.prototype.draw = function () {
    };
    return Entity;
})();
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(pos) {
        this.velocity = new Vector2((Math.random() * 6) - 3, (Math.random() * 6) - 3);
        _super.call(this, new Vector2(Math.random() * 700, Math.random() * 700));
    }
    Asteroid.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    Asteroid.prototype.draw = function () {
        context.drawImage(asteroidImg, this.position.x, this.position.y);
    };
    return Asteroid;
})(Entity);
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(pos) {
        _super.call(this, pos);
        this.maxDist = 500;
        this.maxAccel = 0.3;
        this.acceleration = 0;
        this.direction = new Vector2(0, 0);
        this.angle = Math.atan2(this.direction.y, this.direction.x);
    }
    Player.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        this.velocity.x += this.direction.x * this.acceleration * dt;
        this.velocity.y += this.direction.y * this.acceleration * dt;
        this.angle = Math.atan2(this.direction.y, this.direction.x);
        if(this.velocity.x > this.maxVelocity) {
            this.velocity.x = this.maxVelocity;
        }
        if(this.velocity.x < -this.maxVelocity) {
            this.velocity.x = -this.maxVelocity;
        }
        if(this.velocity.y < -this.maxVelocity) {
            this.velocity.y = -this.maxVelocity;
        }
        if(this.velocity.y > this.maxVelocity) {
            this.velocity.y = this.maxVelocity;
        }
    };
    Player.prototype.draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle);
        context.drawImage(shipImg[0], -shipImg[0].width * 0.5, -shipImg[0].height * 0.5);
        context.restore();
    };
    return Player;
})(Entity);
var World = (function () {
    function World() {
        objects = new Array();
        objects.push(new Player(new Vector2(100, 100)));
        objects.push(new Asteroid(new Vector2(100, 100)));
    }
    World.prototype.update = function () {
        mouseUpdate();
        viewportMove();
        for(var i = 0; i < objects.length; i++) {
            var e = objects[i];
            e.update(1);
            e.draw();
        }
    };
    return World;
})();
function testLoop() {
}
function init() {
    pause = false;
    shipImg = new Array();
    container = document.getElementById("content");
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    shipX = 40;
    shipY = 40;
    addEventListener("mousedown", onDown);
    addEventListener("mousemove", onMove);
    addEventListener("mouseup", onUp);
    loadImg();
}
function onDown(mouseEvent) {
    mouseLoc = new Vector2(mouseEvent.offsetX, mouseEvent.offsetY);
    mouseDown = true;
}
function onMove(mouseEvent) {
    mouseLoc = new Vector2(mouseEvent.offsetX, mouseEvent.offsetY);
    viewportMove();
}
function onUp(mouseEvent) {
    mouseDown = false;
    var p = objects[0];
    p.acceleration = 0;
}
function mouseUpdate() {
    if(mouseDown) {
        dest = mouseLoc;
        var p = objects[0];
        var travelVector = new Vector2(dest.x - p.position.x, dest.y - p.position.y);
        p.direction = travelVector;
        p.direction.normalize();
        var dist = Vector2.distance(dest, p.position);
        if(dist < p.maxDist) {
            p.acceleration = p.maxAccel * (dist / p.maxDist);
        }
    }
}
function loadImg() {
    shipImg.push(preload("img/shipNoThrust.png"));
    shipImg.push(preload("img/shipThrust1.png"));
    shipImg.push(preload("img/shipThrust2.png"));
    asteroidImg = preload("img/asteroid.png");
}
function preload(uri) {
    var img = new Image();
    img.src = uri;
    return img;
}
function draw() {
}
function viewportMove() {
    var p = objects[0];
    context.setTransform(1, 0, 0, 1, 1, 1);
}
window.onload = function () {
    init();
    world = new World();
    updater = setInterval("world.update()", 17);
};
//@ sourceMappingURL=app.js.map
