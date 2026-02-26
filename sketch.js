let bear1, bear2, bear3;
let currentBear;
let handImg;

let clickCount = 0;
let stage = 0;

let bearX, bearY;

let flashRed = false;
let flashAlpha = 0;

let hands = [];

function preload() {
  bear1 = loadImage('bear1.png');
  bear2 = loadImage('bear2.png');
  bear3 = loadImage('bear3.png');
  handImg = loadImage('hand.png');


  bear1.resize(bear1.width/2, bear1.height/2);
  bear2.resize(bear2.width/2, bear2.height/2);
  bear3.resize(bear3.width/2, bear3.height/2);
  handImg.resize(handImg.width/2, handImg.height/2);
}

function setup() {
  createCanvas(1000, 1000);
  imageMode(CENTER);

  currentBear = bear1;
  bearX = width / 2;
  bearY = height / 2;
}

function draw() {
  background(255);

  image(currentBear, bearX, bearY);


  if (flashRed) {
    fill(255, 0, 0, flashAlpha);
    rect(0, 0, width, height);
    flashAlpha -= 12;
    if (flashAlpha <= 0) flashRed = false;
  }


  for (let i = hands.length-1; i >= 0; i--) {
    hands[i].update();
    hands[i].display();
    if (hands[i].isFinished()) hands.splice(i, 1);
  }
}

function mousePressed() {
  if (isClickOnBear(mouseX, mouseY)) {
    clickCount++;
    hands.push(new HandPop(mouseX, mouseY));

    if (stage === 0 && clickCount >= 3) {
      stage = 1;
      currentBear = bear2;
    } else if (stage === 1 && clickCount >= 5) {
      stage = 2;
      currentBear = bear3;
      triggerFlash();
    } else if (stage >= 2) {
      stage = 3;
      let r = random();
      if (r < 0.6) currentBear = bear1;
      else if (r < 0.9) currentBear = bear2;
      else {
        currentBear = bear3;
        triggerFlash();
      }
    }
  }
}

function triggerFlash() {
  flashRed = true;
  flashAlpha = 180;
}


function isClickOnBear(mx, my) {
  let imgW = currentBear.width;
  let imgH = currentBear.height;
  let left = bearX - imgW/2;
  let top = bearY - imgH/2;

  if (mx < left || mx > left+imgW || my < top || my > top+imgH) return false;

  let px = floor(mx - left);
  let py = floor(my - top);

  currentBear.loadPixels();
  let index = py * currentBear.width + px;

  if (index >= 0 && index < currentBear.pixels.length) {
    let alphaVal = alpha(currentBear.pixels[index]);
    return alphaVal > 10;
  }
  return false;
}

// hand class
class HandPop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alphaVal = 255;
    this.scaleVal = 0;
    this.velocity = 0;
    this.target = 0.8;
    this.life = 0;
    this.startFade = false;
  }

  update() {
    this.life++;


    let stiffness = 0.8;
    let damping = 0.5;

    let force = (this.target - this.scaleVal) * stiffness;
    this.velocity += force;
    this.velocity *= damping;
    this.scaleVal += this.velocity;


    if (this.life > 7) {
      this.velocity = 0;
      this.scaleVal = this.target;
      this.startFade = true;
    }

    if (this.startFade) this.alphaVal -= 55;
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scaleVal);
    tint(255, this.alphaVal);
    image(handImg, 0, 0);
    pop();
    noTint();
  }

  isFinished() {
    return this.alphaVal <= 0;
  }
}
