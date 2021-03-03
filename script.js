let interval;
const ballSize = 25; // px
const paddleSizeLong = 100; // px
const paddleSizeShort = 20; // px
const speed = 10; // 10 ms. lower number is faster
let distanceHorizontal = 3;
let distanceVertical = 3;

document.addEventListener('keypress', function (event) {
  var key = event.which || event.keyCode;
  if (key == 32) {
    // 32 is spacebar key
    startStop();
  }
});
document.addEventListener('click', startStop);
document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
  event = event || window.event; // IE
  const mouseX = event.pageX;
  const mouseY = event.pageY;

  const top = document.querySelector('.paddle-top');
  const bottom = document.querySelector('.paddle-bottom');
  const left = document.querySelector('.paddle-left');
  const right = document.querySelector('.paddle-right');

  const horizontals = document.querySelectorAll('.paddle-horizontal');
  const verticals = document.querySelectorAll('.paddle-vertical');

  horizontals.forEach((paddle) => {
    paddle.style.left = mouseX - 50 + 'px';
  });

  verticals.forEach((paddle) => {
    paddle.style.top = mouseY - 50 + 'px';
  });
}

function startStop() {
  if (interval) {
    stopBall();
  } else {
    startBall();
  }
}

function startBall() {
  const ball = document.querySelector('.ball');
  let top;
  let left;
  interval = setInterval(moveBall, speed);
  function moveBall() {
    top = ball.offsetTop;
    left = ball.offsetLeft;
    ball.style.top = top + distanceVertical + 'px';
    ball.style.left = left + distanceHorizontal + 'px';
    checkBounce(top, left);
  }
}

function stopBall() {
  clearInterval(interval);
  interval = undefined;
}

function resetBall() {
  const ball = document.querySelector('.ball');
  const quarterWidth = window.innerWidth / 4;
  const quarterHeight = window.innerHeight / 4;
  ball.style.left =
    getRandomInt(quarterWidth, window.innerWidth - quarterWidth) + 'px';
  ball.style.top =
    getRandomInt(quarterHeight, window.innerHeight - quarterHeight) + 'px';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// function checkBounceTEST(top, left) {
//   const right = left + ballSize
//   const bottom = top + ballSize
//   if (right >= window.innerWidth) {
//     distanceHorizontal = -Math.abs(distanceHorizontal);
//   }
//   if (left <= 0) {
//     distanceHorizontal = Math.abs(distanceHorizontal);
//   }
//   if (bottom >= window.innerHeight) {
//     distanceVertical = -Math.abs(distanceVertical);
//   }
//   if (top <= 0) {
//     distanceVertical = Math.abs(distanceVertical);
//   }
// }

function checkBounce(bTop, bLeft) {
  const bRight = bLeft + ballSize;
  const bBottom = bTop + ballSize;

  const pRight = document.querySelector('.paddle-right');
  const pRightBottom = pRight.offsetTop + paddleSizeLong;

  const pBottom = document.querySelector('.paddle-bottom');
  const pBottomRight = pBottom.offsetLeft + paddleSizeLong;

  const pLeft = document.querySelector('.paddle-left');
  const pLeftRight = pLeft.offsetLeft + paddleSizeShort;
  const pLeftBottom = pLeft.offsetTop + paddleSizeLong;

  const pTop = document.querySelector('.paddle-top');

  // Right Paddle
  if (
    bRight >= pRight.offsetLeft &&
    bBottom > pRight.offsetTop &&
    bTop < pRightBottom
  ) {
    distanceHorizontal = -Math.abs(distanceHorizontal);
  }

  // Bottom Paddle
  if (
    bBottom >= pBottom.offsetTop &&
    bRight > pBottom.offsetLeft &&
    bLeft < pBottomRight
  ) {
    distanceVertical = -Math.abs(distanceHorizontal);
  }

  // Left Paddle
  if (bLeft <= pLeftRight && bBottom > pLeft.offsetTop && bTop < pLeftBottom) {
    distanceHorizontal = Math.abs(distanceHorizontal);
  }

  // Top Paddle
  if (
    bTop < pTop.offsetTop + paddleSizeShort &&
    bLeft > pTop.offsetLeft &&
    bRight < pTop.offsetLeft + paddleSizeLong
  ) {
    distanceVertical = Math.abs(distanceVertical);
  }

  // Check if ball out of bounds / off screen
  if (
    bTop < 0 - ballSize || // top
    bTop > pBottom.offsetTop + paddleSizeShort || // bottom
    bLeft + ballSize < 0 || // left
    bLeft > pRight.offsetLeft + paddleSizeShort // right
  ) {
    console.log('FAIL');
    // stopBall();
    resetBall();
  }
}
