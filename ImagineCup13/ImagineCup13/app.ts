class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    
    constructor (element: HTMLElement) { 
        this.element = element;
        this.element.innerText += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerText = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

class World {
    objects = new Array();

    constructor () {
        this.objects.push(new Player(new Vector2(200, 200)));
    }

    update(dt: number) {
        for (var i in this.objects) {
            this.objects[i].update(1);
        }
    }
};

class Vector2 {
    x: number;
    y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

};

class Entity {
    position: Vector2;
    velocity: Vector2;

    constructor (pos: Vector2) {
        this.position = pos;
    }

    update(dt: number) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

};

class Player extends Entity {

    constructor (pos: Vector2) {
        super(pos);
    }

    update(dt: number) {
        super.update(dt);
    }

};

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};