let currentlyPressedKeyCode;
function setup() {
    createCanvas(1400,700);
    leftPlayer = new Paddle(true);
    rightPlayer = new Paddle(false);
    ball = new Ball(20, [255,255,255], leftPlayer, rightPlayer);
}


function draw() {
    background(0);
    leftPlayer.draw();
    rightPlayer.draw();
    ball.draw();
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
    this.centerHeightDist = this.paddleHeight / 2;
    this.centerWidthDist = this.paddleWidth / 2;

    this.draw = () => {
        rectMode(CENTER);
        fill(255);
        rect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);
        rectMode(CORNER);
        this.updateYPos();
    };

    this.paddleWithinLowerboundP = () => {
        return dist(this.xPos, this.yPos, this.xPos, 0) > this.centerHeightDist + 20;
        
    }

    this.paddleWithinUpperboundP = () => {
        return dist(this.xPos, this.yPos, this.xPos, height) > this.centerHeightDist + 20; 
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

function Ball(diameter, colorArr, paddle1, paddle2) {
	this.x = width / 2;
	this.y = height / 2 - 100;
	this.velocityX = -5;
	this.velocityY = 1.2;
	this.diameterX = diameter;
	this.diameterY = diameter;
	this.radius = diameter / 2;
    this.ballColor = colorArr;

	this.draw = () => {
		rectMode(CENTER);
        noStroke();
		fill(this.ballColor[0], this.ballColor[1], this.ballColor[2]);
        noStroke();
		rect(this.x, this.y, this.diameterX, this.diameterY);
		this.x += this.velocityX;
		this.y += this.velocityY;

        if (this.hitVertWallp() || this.hitPaddlep()) {
			this.vertBounce();
		} 

		if (this.hitHorzWallp()) {
			this.horzBounce();
		}

	};

	this.hitVertWallp = () => {
		return dist(this.x, this.y, 0, this.y) <= this.radius || dist(this.x, this.y, width, this.y) <= this.radius;
	};

	this.hitHorzWallp = () => {
		return dist(this.x, this.y, this.x, 0) <= this.radius || dist(this.x, this.y, this.x, height) <= this.radius;
	};

	this.vertBounce = () => {
		this.velocityX = -this.velocityX; 
	};
	this.horzBounce = () => {

		this.velocityY = -this.velocityY;
	};

    this.getSpeed = () => {
        return sqrt(this.velocityX**2 + this.velocityY**2);
    };

    /*this.drawTail = () => {

    };*/

    this.hitPaddlep = () => {

        ballY = this.y;
        function withinYRangep(low, high) {
            return ballY < high && ballY > low;
        }

        paddle1Surface = paddle1.xPos + paddle1.centerWidthDist;
        paddle1Top = paddle1.yPos - paddle1.centerHeightDist;
        paddle1Bottom = paddle1.yPos + paddle1.centerHeightDist;

        p1wr = withinYRangep(paddle1Top, paddle1Bottom);
        if (this.x <= paddle1Surface && withinYRangep(paddle1Top, paddle1Bottom)) {
            return true; 
        }


        paddle2Surface = paddle2.xPos - paddle2.centerWidthDist;
        paddle2Top = paddle2.yPos - paddle2.centerHeightDist;
        paddle2Bottom = paddle2.yPos + paddle2.centerHeightDist;

        if (this.x >= paddle2Surface && withinYRangep(paddle2Top, paddle2Bottom)) {
            return true; 
        }

        return false;
    }
}



function keyisdown() {
    currentlypressedkeycode = keycode;
}
