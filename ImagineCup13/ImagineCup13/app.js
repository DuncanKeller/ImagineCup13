var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
    return Vector2;
})();
var Entity = (function () {
    function Entity(pos) {
        this.position = pos;
        this.velocity = new Vector2(0, 0);
    }
    Entity.prototype.update = function (dt) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    Entity.prototype.draw = function () {
    };
    return Entity;
})();
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(pos) {
        _super.call(this, pos);
        this.acceleration = 0.5;
        this.direction = new Vector2(1, 0);
    }
    Player.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        this.velocity.x += this.direction.x * this.acceleration * dt;
        this.velocity.y += this.direction.y * this.acceleration * dt;
    };
    Player.prototype.draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(shipImg[0], this.position.x, this.position.y);
    };
    return Player;
})(Entity);
var pause;
var shipImg;
var canvas;
var context;
var updater;
var shipX;
var shipY;
var container;
var world;
var World = (function () {
    function World() {
        this.objects = new Array();
        this.objects.push(new Player(new Vector2(100, 100)));
    }
    World.prototype.update = function () {
        for(var i = 0; i < this.objects.length; i++) {
            var e = this.objects[i];
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
    loadImg();
}
function loadImg() {
    shipImg.push(preload("img/shipNoThrust.png"));
    shipImg.push(preload("img/shipThrust1.png"));
    shipImg.push(preload("img/shipThrust2.png"));
}
function preload(uri) {
    var img = new Image();
    img.src = uri;
    return img;
}
function draw() {
    context.drawImage(shipImg[0], shipX, shipY);
}
window.onload = function () {
    init();
    world = new World();
    updater = setInterval("world.update()", 17);
};
//@ sourceMappingURL=app.js.map
