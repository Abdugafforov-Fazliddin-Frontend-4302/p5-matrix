let _particleStreams = [];
let _pSpeed;
const _pSize = 28;

function setup() {
  createCanvas(windowWidth, windowHeight);

  

  let x = 0;
  let y = 0;
  for (let i = 0; i < width / _pSize - 1; i++) {
    let s = new ParticleStream(x, y, 5, 15);
    _particleStreams.push(s);
    x += _pSize;
  }
  
}

function draw() {
  background(0);

  _particleStreams.forEach(stream => {
    stream.render();
  });
  
}

class Particle {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
    this.speed = _pSpeed;
    this.char = ";)";
  }

  getRandomChar() {
    if (frameCount % 9 === 0) {
      this.char = String.fromCharCode(random(0x2C80, 0x2CB3));
    }
  }

  move() {
    if (this.pos.y < height) {
      this.pos.y += this.speed;
    } else if (this.pos.y >= height) {
      this.pos.y = 0;
    }
  }

  render() {
    fill(0, 175, 0, 200);
    textSize(this.size);
    text(this.char, this.pos.x, this.pos.y);
    this.getRandomChar();
  }

}

class ParticleStream {
  constructor(x, y, minLength, maxLength) {
    this.particles = [];
    this.pos = createVector(x, y);
    this.createParticles(minLength, maxLength);
    _pSpeed = random(5, 15);
  }

  createParticles(minP, maxP) {
    console.log("Hello!");
    const numOfParticles = round(random(minP, maxP));
    
    let y = 0;
    for (let i = 0; i < numOfParticles; i++) {
      let particle = new Particle(this.pos.x, y, _pSize, _pSpeed);
      this.particles.push(particle);
      y += particle.size;
    }
  }
  render() {
    this.particles.forEach(p => {
      p.move();
      p.render();
    });
  }
}