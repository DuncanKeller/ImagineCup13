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
var World = (function () {
    function World() {
        this.objects = new Array();
        this.objects.push(new Player(new Vector2(200, 200)));
    }
    World.prototype.update = function (dt) {
        for(var i in this.objects) {
            this.objects[i].update(1);
        }
    };
    return World;
})();
var Vector2 = (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector2;
})();
; ;
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
; ;
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
; ;
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
//@ sourceMappingURL=app.js.map
