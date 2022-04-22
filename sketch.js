let leftPlayer; 
let rightPlayer;
let leftPlayerScore;
let rightPlayerScore;
let ball;

function setup() {
    createCanvas(1400,700);
    leftPlayer = new Paddle(true);
    rightPlayer = new Paddle(false);
    leftPlayerScore = 0;
    rightPlayerScore = 0;
    ball = new Ball(20, [255,255,255], leftPlayer, rightPlayer);
}

function draw() {
    background(0);
    for (let i = 0; i < height; i+=20) {
        fill(200);
        if (i % 40 == 0) rect(width/2, i, 20, 20);
    }

    leftPlayer.draw();
    rightPlayer.draw();
    ball.draw();

    detectPlayerPoint(ball, leftPlayer.xPos, rightPlayer.xPos);
    drawPlayerScore(true);
    drawPlayerScore(false);

}

function initialize() {
    leftPlayer.yPos = height / 2;
    rightPlayer.yPos = height / 2;

    ball.x = width / 2;
    ball.y = height / 2;

    ball.velocityX = random([10,-10])
    ball.velocityY = random([-1.1, -1.2, -1.3, 1.1, 1.2, 1.3])
}

 function detectPlayerPoint(bll, leftPaddleX, rightPaddleX) {
    if (bll.hitLeftVertWallp()) {
        leftPlayerScore += 1;
        initialize(); 
    }

    if (bll.hitRightVertWallp()) {
        rightPlayerScore += 1;
        initialize();
    }

} 

function drawPlayerScore(left) {
    centerOffset = -120;
    playerScore = leftPlayerScore;

    if (!left) {
        centerOffset = -centerOffset; 
        playerScore = rightPlayerScore;
    }

    textSize(50);
    text(String(playerScore), 
        width/2 + centerOffset,
        60);

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
        return dist(this.xPos, this.yPos, this.xPos, 0) > this.centerHeightDist;
        
    }

    this.paddleWithinUpperboundP = () => {
        return dist(this.xPos, this.yPos, this.xPos, height) > this.centerHeightDist; 
    }

    this.updateYPos = () => {
        movementDist = 10;
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
	this.velocityX = -6;
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

    this.hitLeftVertWallp = () => {
		return dist(this.x, this.y, 0, this.y) <= this.radius 
    };

    this.hitRightVertWallp = () => {
        return dist(this.x, this.y, width, this.y) <= this.radius;
    }

	this.hitVertWallp = () => {
		return this.hitLeftVertWallp() || this.hitRightVertWallp();
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



