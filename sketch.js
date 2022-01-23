let currentlyPressedKeyCode;
function setup() {
    createCanvas(1400,700);
    leftPlayer = new Paddle(true);
    rightPlayer = new Paddle(false);
}


function draw() {
    background(0);
    leftPlayer.draw();
    rightPlayer.draw();
}


function Paddle(left) {
    distFromWall = 200;
    if (left) {
        this.xPos = distFromWall; 
        this.paddleUpKeyCode = 87;
        this.paddleDownKeyCode = 83;
    } else {
        this.xPos = width - distFromWall; 
        this.paddleUpKeyCode = 38;
        this.paddleDownKeyCode = 40;

    }

    this.paddleHeight = 90;
    this.paddleWidth = 20;
    this.yPos = height / 2;
    centreDist = this.paddleHeight / 2;

    this.draw = () => {
        rectMode(CENTER);
        fill(255);
        rect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);
        rectMode(CORNER);
        this.updateYPos();
    };

    this.paddleWithinLowerboundP = () => {
        return dist(this.xPos, this.yPos, this.xPos, 0) > centreDist + 20;
        
    }

    this.paddleWithinUpperboundP = () => {
        return dist(this.xPos, this.yPos, this.xPos, height) > centreDist + 20; 
    }

    this.updateYPos = () => {
        movementDist = 8;
        if (keyIsDown(this.paddleUpKeyCode) && this.paddleWithinLowerboundP()) {
            this.yPos -= movementDist;     
        } 

        if (keyIsDown(this.paddleDownKeyCode) && this.paddleWithinUpperboundP()) {
            this.yPos += movementDist;
        }
        
    };
   
}

function keyisdown() {
    currentlypressedkeycode = keycode;
}
