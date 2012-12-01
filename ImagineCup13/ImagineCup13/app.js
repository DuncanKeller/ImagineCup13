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
    }
    Entity.prototype.update = function (dt) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };
    return Entity;
})();
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(pos) {
        _super.call(this, pos);
    }
    Player.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
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
function testLoop() {
    draw();
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
    updater = setInterval("testLoop()", 17);
};
//@ sourceMappingURL=app.js.map
