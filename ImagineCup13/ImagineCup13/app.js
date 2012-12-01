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
var targetImg;
var play;
var mouseX;
var mouseY;
var world;
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
var Target = (function () {
    function Target(pos) {
        this.position = pos;
    }
    Target.prototype.update = function (dt) {
        this.position = mouseLoc;
    };
    Target.prototype.draw = function () {
        context.drawImage(targetImg, this.position.x, this.position.y);
    };
    return Target;
})();
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(pos) {
        _super.call(this, new Vector2(Math.random() * 700, Math.random() * 700));
        this.velocity = new Vector2((Math.random() * 3) - 1.5, (Math.random() * 3) - 1.5);
    }
    Asteroid.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
        for(var i = 0; i < objects.length; i++) {
            if(objects[i] instanceof Asteroid) {
                if(objects[i] != this) {
                    var dist = Vector2.distance(objects[i].position, this.position);
                    if(dist < asteroidImg.width) {
                        var direction = new Vector2(objects[i].position.x - this.position.x, objects[i].position.y - this.position.y);
                        direction.normalize();
                        var pushOut = asteroidImg.width - dist;
                        objects[i].position.x += direction.x * (pushOut);
                        objects[i].position.y += direction.y * (pushOut);
                        this.position.x -= direction.x * (pushOut);
                        this.position.y -= direction.y * (pushOut);
                        objects[i].velocity.x *= -direction.x;
                        objects[i].velocity.y *= -direction.y;
                        this.velocity.x *= -direction.x;
                        this.velocity.y *= -direction.y;
                    }
                }
            }
        }
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
        this.target.update(dt);
        this.velocity.x += this.direction.x * this.acceleration * dt;
        this.velocity.y += this.direction.y * this.acceleration * dt;
        this.angle = Math.atan2(this.direction.y, this.direction.x);
        if(this.position.x + this.velocity.x * 4 >= canvas.width - 100) {
            this.velocity.x = 0;
        }
        if(this.position.x + this.velocity.x * 4 <= 100) {
            this.velocity.x = 0;
        }
        if(this.position.y + this.velocity.y * 4 >= canvas.height - 100) {
            this.velocity.y = 0;
        }
        if(this.position.y + this.velocity.y * 4 <= 100) {
            this.velocity.y = 0;
        }
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
        this.target.draw();
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
        play = new Player(new Vector2(100, 100));
        play.target = new Target(new Vector2(100, 100));
        objects.push(play);
        for(var i = 0; i < 5; i++) {
            objects.push(new Asteroid(new Vector2(100, 100)));
        }
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
function init() {
    pause = false;
    shipImg = new Array();
    container = document.getElementById("content");
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    shipX = 40;
    shipY = 40;
    setMousePos(100, 100);
    addEventListener("mousedown", onDown);
    addEventListener("mousemove", onMove);
    addEventListener("mouseup", onUp);
    loadImg();
}
function onDown(mouseEvent) {
    setMousePos(mouseEvent.clientX, mouseEvent.clientY);
    mouseDown = true;
}
function onMove(mouseEvent) {
    setMousePos(mouseEvent.clientX, mouseEvent.clientY);
    viewportMove();
}
function onUp(mouseEvent) {
    mouseDown = false;
    play.acceleration = 0;
}
function mouseUpdate() {
    if(mouseDown) {
        dest = mouseLoc;
        var travelVector = new Vector2(dest.x - play.position.x, dest.y - play.position.y);
        play.direction = travelVector;
        play.direction.normalize();
        var dist = Vector2.distance(dest, play.position);
        if(dist < play.maxDist) {
            play.acceleration = play.maxAccel * (dist / play.maxDist);
        }
    }
}
function loadImg() {
    shipImg.push(preload("img/shipNoThrust.png"));
    shipImg.push(preload("img/shipThrust1.png"));
    shipImg.push(preload("img/shipThrust2.png"));
    asteroidImg = preload("img/asteroid.png");
    targetImg = preload("img/target.png");
}
function preload(uri) {
    var img = new Image();
    img.src = uri;
    return img;
}
function setMousePos(x, y) {
    var rect = canvas.getBoundingClientRect();
    mouseLoc = new Vector2(x - rect.left, y - rect.top);
}
function viewportMove() {
    context.setTransform(1, 0, 0, 1, 1, 1);
    context.translate(-(play.position.x - (700 / 2)), -(play.position.y - (700 / 2)));
}
window.onload = function () {
    init();
    world = new World();
    updater = setInterval("world.update()", 17);
};
//@ sourceMappingURL=app.js.map
