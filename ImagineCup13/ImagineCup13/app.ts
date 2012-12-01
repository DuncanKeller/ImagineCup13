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

}

class Entity {
    position: Vector2;
    velocity: Vector2;

    constructor (pos: Vector2) {
        this.position = pos;
        this.velocity = new Vector2(0, 0);
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

    constructor (pos: Vector2) {
        super(pos);
        this.acceleration = 0.5;
        this.direction = new Vector2(1, 0);
    }

    update(dt: number) {
        super.update(dt);
        this.velocity.x += this.direction.x * this.acceleration * dt;
        this.velocity.y += this.direction.y * this.acceleration * dt;
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

var world: World;

class World {
    objects = new Array();

    constructor () {
        this.objects.push(new Player(new Vector2(100, 100)));
    }

    update() {
        
        for (var i: number = 0; i < this.objects.length; i++) {

            var e : Entity = <Entity>this.objects[i];
            e.update(1);
            e.draw();

        }
    }
}

function testLoop() {
    //context.clearRect(0, 0, canvas.width, canvas.height);       
    //draw();    
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

function preload(uri){
	var img = new Image(); //makes a new image
	img.src = uri; //sets new image to passed source
	return img; //return img
}

function draw() {    
    context.drawImage(shipImg[0], shipX, shipY);	
}

window.onload = () => {        
    init();
    world = new World();
    
    updater = setInterval("world.update()", 17);
};