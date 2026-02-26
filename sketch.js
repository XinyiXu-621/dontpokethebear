{\rtf1\ansi\ansicpg1252\cocoartf2818
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs32 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 let bear1, bear2, bear3;\
let currentBear;\
let handImg;\
\
let clickCount = 0;\
let stage = 0;\
\
let bearX, bearY;\
\
let flashRed = false;\
let flashAlpha = 0;\
\
let hands = [];\
\
function preload() \{\
\'a0 bear1 = loadImage('bear1.png');\
\'a0 bear2 = loadImage('bear2.png');\
\'a0 bear3 = loadImage('bear3.png');\
\'a0 handImg = loadImage('hand.png');\
\
\
\'a0 bear1.resize(bear1.width/2, bear1.height/2);\
\'a0 bear2.resize(bear2.width/2, bear2.height/2);\
\'a0 bear3.resize(bear3.width/2, bear3.height/2);\
\'a0 handImg.resize(handImg.width/2, handImg.height/2);\
\}\
\
function setup() \{\
\'a0 createCanvas(1000, 1000);\
\'a0 imageMode(CENTER);\
\
\'a0 currentBear = bear1;\
\'a0 bearX = width / 2;\
\'a0 bearY = height / 2;\
\}\
\
function draw() \{\
\'a0 background(255);\
\
\'a0 image(currentBear, bearX, bearY);\
\
\
\'a0 if (flashRed) \{\
\'a0 \'a0 fill(255, 0, 0, flashAlpha);\
\'a0 \'a0 rect(0, 0, width, height);\
\'a0 \'a0 flashAlpha -= 12;\
\'a0 \'a0 if (flashAlpha <= 0) flashRed = false;\
\'a0 \}\
\
\
\'a0 for (let i = hands.length-1; i >= 0; i--) \{\
\'a0 \'a0 hands[i].update();\
\'a0 \'a0 hands[i].display();\
\'a0 \'a0 if (hands[i].isFinished()) hands.splice(i, 1);\
\'a0 \}\
\}\
\
function mousePressed() \{\
\'a0 if (isClickOnBear(mouseX, mouseY)) \{\
\'a0 \'a0 clickCount++;\
\'a0 \'a0 hands.push(new HandPop(mouseX, mouseY));\
\
\'a0 \'a0 if (stage === 0 && clickCount >= 3) \{\
\'a0 \'a0 \'a0 stage = 1;\
\'a0 \'a0 \'a0 currentBear = bear2;\
\'a0 \'a0 \} else if (stage === 1 && clickCount >= 5) \{\
\'a0 \'a0 \'a0 stage = 2;\
\'a0 \'a0 \'a0 currentBear = bear3;\
\'a0 \'a0 \'a0 triggerFlash();\
\'a0 \'a0 \} else if (stage >= 2) \{\
\'a0 \'a0 \'a0 stage = 3;\
\'a0 \'a0 \'a0 let r = random();\
\'a0 \'a0 \'a0 if (r < 0.6) currentBear = bear1;\
\'a0 \'a0 \'a0 else if (r < 0.9) currentBear = bear2;\
\'a0 \'a0 \'a0 else \{\
\'a0 \'a0 \'a0 \'a0 currentBear = bear3;\
\'a0 \'a0 \'a0 \'a0 triggerFlash();\
\'a0 \'a0 \'a0 \}\
\'a0 \'a0 \}\
\'a0 \}\
\}\
\
function triggerFlash() \{\
\'a0 flashRed = true;\
\'a0 flashAlpha = 180;\
\}\
\
\
function isClickOnBear(mx, my) \{\
\'a0 let imgW = currentBear.width;\
\'a0 let imgH = currentBear.height;\
\'a0 let left = bearX - imgW/2;\
\'a0 let top = bearY - imgH/2;\
\
\'a0 if (mx < left || mx > left+imgW || my < top || my > top+imgH) return false;\
\
\'a0 let px = floor(mx - left);\
\'a0 let py = floor(my - top);\
\
\'a0 currentBear.loadPixels();\
\'a0 let index = py * currentBear.width + px;\
\
\'a0 if (index >= 0 && index < currentBear.pixels.length) \{\
\'a0 \'a0 let alphaVal = alpha(currentBear.pixels[index]);\
\'a0 \'a0 return alphaVal > 10;\
\'a0 \}\
\'a0 return false;\
\}\
\
// hand class\
class HandPop \{\
\'a0 constructor(x, y) \{\
\'a0 \'a0 this.x = x;\
\'a0 \'a0 this.y = y;\
\'a0 \'a0 this.alphaVal = 255;\
\'a0 \'a0 this.scaleVal = 0;\
\'a0 \'a0 this.velocity = 0;\
\'a0 \'a0 this.target = 0.8;\
\'a0 \'a0 this.life = 0;\
\'a0 \'a0 this.startFade = false;\
\'a0 \}\
\
\'a0 update() \{\
\'a0 \'a0 this.life++;\
\
\
\'a0 \'a0 let stiffness = 0.8;\
\'a0 \'a0 let damping = 0.5;\
\
\'a0 \'a0 let force = (this.target - this.scaleVal) * stiffness;\
\'a0 \'a0 this.velocity += force;\
\'a0 \'a0 this.velocity *= damping;\
\'a0 \'a0 this.scaleVal += this.velocity;\
\
\
\'a0 \'a0 if (this.life > 7) \{\
\'a0 \'a0 \'a0 this.velocity = 0;\
\'a0 \'a0 \'a0 this.scaleVal = this.target;\
\'a0 \'a0 \'a0 this.startFade = true;\
\'a0 \'a0 \}\
\
\'a0 \'a0 if (this.startFade) this.alphaVal -= 55;\
\'a0 \}\
\
\'a0 display() \{\
\'a0 \'a0 push();\
\'a0 \'a0 translate(this.x, this.y);\
\'a0 \'a0 scale(this.scaleVal);\
\'a0 \'a0 tint(255, this.alphaVal);\
\'a0 \'a0 image(handImg, 0, 0);\
\'a0 \'a0 pop();\
\'a0 \'a0 noTint();\
\'a0 \}\
\
\'a0 isFinished() \{\
\'a0 \'a0 return this.alphaVal <= 0;\
\'a0 \}\
\}\
}