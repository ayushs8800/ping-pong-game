const leftBar = document.querySelector("#left-bar");
const rightBar = document.querySelector("#right-bar");
const ball = document.querySelector("#ball");

let leftBarPos = 0, rightBarPos = 0;
let speed = 8;
let barPosFromTopMin = 0, barPosFromTopMax = 210;

const handleKeyMovements = (event) => {
    if( event.keyCode === 87 ) {
        leftBarPos -= speed;
        leftBarPos = Math.max(barPosFromTopMin,leftBarPos);
    }
    if( event.keyCode === 83 ) {
        leftBarPos += speed;
        leftBarPos = Math.min(barPosFromTopMax,leftBarPos);
    }
    if( event.keyCode === 38 ) {
        rightBarPos -= speed;
        rightBarPos = Math.max(barPosFromTopMin,rightBarPos);
    }
    if( event.keyCode === 40 ) {
        rightBarPos += speed;
        rightBarPos = Math.min(barPosFromTopMax,rightBarPos);
    }

    leftBar.style.top = `${leftBarPos}px`
    rightBar.style.top = `${rightBarPos}px`
}

document.addEventListener('keydown', handleKeyMovements );

let ballPosFromLeftMin = 25, ballPosFromLeftMax = 775;
let ballPosFromTopMin = 0, ballPosFromTopMax = 300;
let ballCurrPosX = 375, ballCurrPosY = 150;
// let ballCurrPosX = 375, ballCurrPosY = 280;
let ballSpeed = 10;
let speedHorizontal = ballSpeed, speedVertical = ballSpeed;

//0 to 138 when 24

const handleBallPos = () => {
    ballCurrPosX += speedHorizontal;
    ballCurrPosY += speedVertical;
    ballCurrPosX = Math.min(ballCurrPosX,ballPosFromLeftMax);
    ballCurrPosX = Math.max(ballCurrPosX,ballPosFromLeftMin);
    if( (ballCurrPosX === ballPosFromLeftMax) || (ballCurrPosX === ballPosFromLeftMin) ) {
        speedHorizontal *= (-1);
    }
    ballCurrPosY = Math.min(ballCurrPosY,ballPosFromTopMax);
    ballCurrPosY = Math.max(ballCurrPosY,ballPosFromTopMin);
    if( (ballCurrPosY === ballPosFromTopMax) || (ballCurrPosY === ballPosFromTopMin) ) {
        speedVertical *= (-1);
    }
    console.log(ballCurrPosX,speedHorizontal,ballCurrPosY,speedVertical);
    if( ballCurrPosX === ballPosFromLeftMin && (leftBarPos-24 > ballCurrPosY || leftBarPos+114 < ballCurrPosY) ) {
        clearInterval(intervalID);
        let div = document.createElement("div");
        div.innerText = "Right Player Wins";
        document.querySelector("body").prepend(div);
        div.style.textAlign = "centre";
    }
    if( ballCurrPosX === ballPosFromLeftMax && (rightBarPos-24 > ballCurrPosY || rightBarPos+114 < ballCurrPosY) ) {
        clearInterval(intervalID);
        let div = document.createElement("div");
        div.innerText = "Left Player Wins";
        document.querySelector("body").prepend(div);
        div.style.textAlign = "centre";
    }
    ball.style.top = `${ballCurrPosY}px`;
    ball.style.left = `${ballCurrPosX}px`;
}

const intervalID = setInterval(handleBallPos,100);

