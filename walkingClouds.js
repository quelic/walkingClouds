/******************************************************************
 * 
 * WalkingClowds, by Quelic Berga
 * 
 * 
 * This sketch becomes nicer after some 15 secs of watching, 
 * it is, to me, like watching colorful clouds. Slower speed of the 
 * random walkers allow imagination to go even further.
 * 
 * It is inspired by the 1st lecture by Daniel Shiffman in the course
 * the nature of code, available on kadenze.com during may'16
 * 
 * It is my take on the RandomWalker assignment 1.
 * 
 * quelic@caotic.net
 * 
 *****************************************************************/

// setting up some variables, for this sketch adding an "oldPos" to remember last position.
var pos;
var oldPos;
var vel;
var acc;

function setup() {
  createCanvas(800, 800);
  // creating the 3 lights RGB objects by calling Light() constructor.
  seedRed = new Light();
  seedGreen = new Light();
  seedBlue = new Light();
  //Setting up backgorund and type of sroke endings.  
  strokeCap(PROJECT);
  background(0);
}


function draw() {
  // we choose the stroke colour each time before calling the object, we play with low opacity to get a more complex result, and we don't erase the background after each loop.
  stroke(235, 10, 10, 2);
  seedRed.update();
  seedRed.display();

  stroke(10, 235, 10, 2);
  seedGreen.update();
  seedGreen.display();

  stroke(10, 10, 235, 2);
  seedBlue.update();
  seedBlue.display();
}

function Light() { // The object is a line that walks around the scene
  // we give initial values to the main vectors
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.pos = createVector(random(width), random(height));
  this.oldPos = createVector(random(width), random(height));

  this.update = function() {
    // Weight of the stroke varies according to x and y velocity, the faster the object moves, the bigger the stroke becomes.
    strokeWeight(80 + 15 * abs(this.vel.x) + 15 * abs(this.vel.y));
    // This conditionals are mean to let the direction, velocity to stay the same but replacing the object always inside the scene.
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;

    }
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;

    }
    // we store the values of position to oldPos x and y before updating them to new ones. 
    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;
    
    // we give moderate values of acceleration
    this.acc.x = random(-.5, .5);
    this.acc.y = random(-.5, .5);
    
    // We stop acceleration if it increases too much to avoid huge velocities
    if (abs(this.vel.x) > 10) {
      this.vel.x = 0;
    }
    if (abs(this.vel.y) > 10) {
      this.vel.y = 0;
    }
    // we add to position the velocity that is a sum of the acceleration. 
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  this.display = function() {
    // we simply draw a line from last position to new one
    line(this.pos.x, this.pos.y, this.oldPos.x, this.oldPos.y);
  }
}
