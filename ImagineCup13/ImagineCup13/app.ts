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

var world: World;

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

class Target{
    position: Vector2;
    
    constructor (pos: Vector2) {        
        this.position = pos;
    } 
    update(dt: number) {
        this.position = mouseLoc;
        //alert(mouseLoc.x);
    }  
    draw() {
        //alert("draw derps");
        context.drawImage(targetImg, this.position.x, this.position.y);	
    }
}

class Asteroid extends Entity {
    constructor (pos: Vector2) {
        this.velocity = new Vector2((Math.random() * 6) - 3, (Math.random() * 6) - 3);
        super(new Vector2(Math.random() * 700, Math.random() * 700));
    }

    update(dt: number) {
        super.update(dt)
    }

    draw() {
        //context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(asteroidImg, this.position.x, this.position.y);	
    }
}

class Player extends Entity {
    acceleration: number;
    direction: Vector2;
    angle: number;
    maxDist: number;
    maxAccel: number;
    target: Target;
    pastPos: Vector2;

    constructor (pos: Vector2) {
        super(pos);
        this.maxDist = 500;
        this.maxAccel = 0.3;
        
        this.acceleration = 0;
        this.direction = new Vector2(0, 0);
        this.angle = Math.atan2(this.direction.y, this.direction.x);
    }

    update(dt: number) {
        super.update(dt);

        this.target.update(dt);
      
        this.velocity.x += this.direction.x * this.acceleration * dt;
        this.velocity.y += this.direction.y * this.acceleration * dt;

        this.angle = Math.atan2(this.direction.y, this.direction.x);
        
        if (this.position.x + this.velocity.x*4 >= canvas.width-100) {
            this.velocity.x = 0;
            //this.acceleration = 0;
        }

        if (this.position.x + this.velocity.x*4 <= 100) {
            this.velocity.x = 0;
            //this.acceleration = 0;
        }

        if (this.position.y + this.velocity.y*4 >= canvas.height-100) {
            this.velocity.y = 0;
            //this.acceleration = 0;
        }

        if (this.position.y + this.velocity.y*4 <= 100) {
            this.velocity.y = 0;
            //this.acceleration = 0;
        }

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

        this.target.draw();

        context.save();
        // Translate to the center point of our image
        context.translate(this.position.x, this.position.y);
        // Perform the rotation
        context.rotate(this.angle);        
        // Finally we draw the image
        context.drawImage(shipImg[0], -shipImg[0].width*.5, -shipImg[0].height*.5);
        // And restore the context ready for the next loop
        context.restore();
        //context.drawImage(shipImg[0], this.position.x, this.position.y);	
    }

}

class World {
    constructor () {
        objects = new Array();
        play = new Player(new Vector2(100, 100));
        play.target = new Target(new Vector2(100,100));
        objects.push(play);
        objects.push(new Asteroid(new Vector2(100, 100)));
        
    }

    update() {
        //setMousePos(mouseX, mouseY);
        mouseUpdate();
        viewportMove();
                
        for (var i: number = 0; i < objects.length; i++) {

            var e : Entity = <Entity>objects[i];
            e.update(1);
            e.draw();
        }
    }
}

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
    if (mouseDown) {
        dest = mouseLoc;

        var travelVector = new Vector2(dest.x - play.position.x, dest.y - play.position.y);

        play.direction = travelVector;
        play.direction.normalize();

        var dist = Vector2.distance(dest, play.position);
        if (dist < play.maxDist) {
            
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

function preload(uri){
	var img = new Image(); //makes a new image
	img.src = uri; //sets new image to passed source
	return img; //return img
}

function setMousePos(x,y) {    
    var rect = canvas.getBoundingClientRect();
    mouseLoc = new Vector2(x - rect.left, y - rect.top);
    mouseX = mouseLoc.x;
    mouseY = mouseLoc.y;
}

function viewportMove() {
    context.setTransform(1,0,0,1,1,1);
    context.translate(-(play.position.x-(700/2)), -(play.position.y-(700/2)));
    //var origin =  context.getBoundingClientRect();
    //mouseLoc.x += (play.position.x)   
    //mouseLoc.y += (play.position.y);
}

window.onload = () => {        
    init();
    world = new World();
    
    updater = setInterval("world.update()", 17);
};