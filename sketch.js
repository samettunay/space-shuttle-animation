let rocket, world;
let take_off = false, starsPlay = false;
let r = 118, g = 207, b = 245;
particles = [];

function setup() {
  createCanvas(400, 400);
  stars = new Stars();
  rocket = new Rocket();
  world = new World();
}

function draw() {
  background(r, g, b);
  world.display();
  
  if (take_off == true) {
    rocket.particles();
    
    sleep(2000).then(function() {
    rocket.move();
  })
    
    if (rocket.flight == true) {
      world.move();
      sleep(3000).then(function() {
        if (r != 0)
            r -= 1;
        if (g != 0)
            g -= 1; 
        if (b != 0)
            b -= 1;
        if (r == 0 && g == 0 && b == 0)
          starsPlay = true;
      })
    }
    if (starsPlay) {
      stars.move();
      stars.display(); 
    }

  }
  
  rocket.display();
}

class Rocket {
    constructor() {
      this.x = 150;
      this.y = 250;
      this.flight = false;
      this.speed = 1;
      this.rocket = loadImage('Rocket.png');
      this.rocketPart1 = loadImage('RocketPart1.png');
      this.rocketPart2 = loadImage('RocketPart2.png');
    }
  
    particles() {
      for (let i = 0; i < 5; i++) {
          let p = new Particle(this.x + 37.5, this.y + 85);
          particles.push(p);
        }
        for (let i = particles.length - 1; i >= 0; i--)         {
          particles[i].update();
          particles[i].show();
          if (particles[i].finished()) {
            particles.splice(i, 1);
          }
        }
    }
    
    display() {
      image(this.rocketPart1, this.x+7, this.y-6);
      image(this.rocketPart1, this.x+52, this.y-6);
      image(this.rocketPart2, this.x+22, this.y-20);
      image(this.rocket, this.x, this.y);
    }
    move() {
      if(this.y > 140)
        {
          this.flight = true;
          this.y -= this.speed;
        }
        
    }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-2, -1);
    this.alpha = 255;
    this.d = 7;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x -= this.vx;
    this.y -= this.vy;
    this.alpha -= 3;
    this.d -= random(0.05, 0.1);
  }

  show() {
    noStroke();
    fill(random(200,230), random(50, 150), 10, this.alpha);
    ellipse(this.x, this.y, this.d);
  }
}

class World {
   constructor() {
    this.x = 0;
    this.y = 0;
    this.world = loadImage('world.png');
  }

  move() {
    this.y += 1;
  }

  display() {
      image(this.world, this.x, this.y);
  }
}

class Stars {
  constructor() {
    this.x = random(0, 400);
    this.y = random(0, 400);
  }

  move() {
    this.y += 30;
    if(this.y > height) {
      this.x = random(0, 400);
      this.y = 0;
    }
  }

  display() {
      stroke(random(0, 255))
      line(this.x, this.y, this.x, this.y + 10);
      line(this.x, this.y, this.x, this.y + 10);
      line(this.x, this.y, this.x, this.y + 10);
      line(this.x, this.y, this.x, this.y + 10);
      line(this.x, this.y, this.x, this.y + 10);
      line(this.x, this.y, this.x, this.y + 10);
  }
}

function mousePressed() {
  take_off = true;
}

function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}
