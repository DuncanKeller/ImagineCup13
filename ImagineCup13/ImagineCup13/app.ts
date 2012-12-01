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

class Vector2 {
    x: number;
    y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    normalize() {
        var magnitude = Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2));
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
    }

    static distance(dest: Vector2, start: Vector2) {
        return Math.sqrt(Math.pow(dest.y - start.y, 2) + Math.pow(dest.x - start.x, 2));
    }

}

class Entity {
    position: Vector2;
    velocity: Vector2;
    maxVelocity: number;

    constructor (pos: Vector2) {
        this.position = pos;
        this.velocity = new Vector2(0, 0);
        this.maxVelocity = 3;
    }

    update(dt: number) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw() {

    }

}

class Player extends Entity {
    acceleration: number;
    direction: Vector2;
    maxDist: number;
    maxAccel: number;

    constructor (pos: Vector2) {
        super(pos);
        this.maxDist = 500;
        this.maxAccel = 0.3;
        
        this.acceleration = 0;
        this.direction = new Vector2(1, 0);
        
    }

    update(dt: number) {
        super.update(dt);
      
        this.velocity.x += this.direction.x * this.acceleration * dt;
        this.velocity.y += this.direction.y * this.acceleration * dt;
        
        if (this.velocity.x > this.maxVelocity) {
            this.velocity.x = this.maxVelocity;
        }
        if (this.velocity.x < -this.maxVelocity) {
            this.velocity.x = -this.maxVelocity;
        }
        if (this.velocity.y < -this.maxVelocity) {
            this.velocity.y = -this.maxVelocity;
        }
        if (this.velocity.y > this.maxVelocity) {
            this.velocity.y = this.maxVelocity;
        }
    }

    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(shipImg[0], this.position.x, this.position.y);	
    }

}



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

var world: World;

class World {
    constructor () {
        objects = new Array();
        objects.push(new Player(new Vector2(100, 100)));
    }

    update() {
        mouseUpdate();
                
        for (var i: number = 0; i < objects.length; i++) {

            var e : Entity = <Entity>objects[i];
            e.update(1);
            e.draw();

        }
    }
}

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
}
function onUp(mouseEvent) {
    mouseDown = false;
    var p: Player = <Player>objects[0];
    p.acceleration = 0;
}

function mouseUpdate() {
    if (mouseDown) {
        dest = mouseLoc;

        //alert("derp");

        var p: Player = <Player>objects[0];
        var travelVector = new Vector2(dest.x - p.position.x, dest.y - p.position.y);

        p.direction = travelVector;
        p.direction.normalize();
        //context.rotate(Math.atan2(p.direction.y,p.direction.x));

        var dist = Vector2.distance(dest, p.position);
        if (dist < p.maxDist) {
            
           p.acceleration = p.maxAccel * (dist / p.maxDist);
        }
    }
            
}

function loadImg() {
    shipImg.push(preload("img/shipNoThrust.png"));
    
    shipImg.push(preload("img/shipThrust1.png"));
    
    shipImg.push(preload("img/shipThrust2.png"));    
}

function preload(uri){
	var img = new Image(); //makes a new image
	img.src = uri; //sets new image to passed source
	return img; //return img
}

function draw() {    
    
}

window.onload = () => {        
    init();
    world = new World();
    
    updater = setInterval("world.update()", 17);
};