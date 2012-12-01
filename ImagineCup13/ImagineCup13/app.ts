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
    }

    update(dt: number) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

}

class Player extends Entity {

    constructor (pos: Vector2) {
        super(pos);
    }

    update(dt: number) {
        super.update(dt);
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
    
    updater = setInterval("testLoop()", 17);
};