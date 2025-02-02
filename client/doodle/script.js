/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
const grid = document.querySelector('.grid');
const doodler = document.createElement('div');
let doodlerLeftSpace = 50;
let startPoint = 150;
let doodlerBottomSpace = startPoint;
let isGameOver = false;
const platformCount = 5;
const platforms = [];
let upTimerId;
let downTimerId;
let isJumping = false;
let isGoingLeft = false;
let isGoingRight = false;
let leftTimerId;
let rightTimerId;
let score = 0;

function createDoodler() {
  grid.appendChild(doodler);
  doodler.classList.add('doodler');
  doodlerLeftSpace = platforms[0].left;
  doodler.style.left = `${doodlerLeftSpace}px`;
  doodler.style.bottom = `${doodlerBottomSpace}px`;
}



function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    const platGap = 600 / platformCount;
    const newPlatBottom = 100 + i * platGap;
    const newPlatform = new Platform(newPlatBottom);
    platforms.push(newPlatform);
    console.log(platforms);
  }
}

function movePlatforms() {
  if (doodlerBottomSpace > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      const {visual} = platform;
      visual.style.bottom = `${platform.bottom}px`;

      if (platform.bottom < 10) {
        const firstPlatform = platforms[0].visual;
        firstPlatform.classList.remove('platform');
        platforms.shift();
        score++;
        console.log(platforms);
        const newPlatform = new Platform(600);
        platforms.push(newPlatform);
      }
    });
  }
}

function jump() {
  // console.log(doodlerBottomSpace)
  clearInterval(downTimerId);
  isJumping = true;
  upTimerId = setInterval(() => {
    doodlerBottomSpace += 20;
    // console.log(doodlerBottomSpace)
    doodler.style.bottom = `${doodlerBottomSpace}px`;
    if (doodlerBottomSpace > startPoint + 200) {
      // console.log(doodlerBottomSpace)
      fall();
    }
  }, 30);
}

function fall() {
  clearInterval(upTimerId);
  isJumping = false;
  downTimerId = setInterval(() => {
    doodlerBottomSpace -= 5;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
    if (doodlerBottomSpace <= 0) {
      gameOver();
    }
    platforms.forEach((platform) => {
      if (
        (doodlerBottomSpace >= platform.bottom)
                && (doodlerBottomSpace <= platform.bottom + 15)
                && ((doodlerLeftSpace + 60) >= platform.left)
                && (doodlerLeftSpace <= (platform.left + 85))
                && !isJumping
      ) {
        console.log('landed');
        startPoint = doodlerBottomSpace;
        jump();
      }
    });
  }, 30);
}

class Platform {
  constructor(newPlatBottom) {
    this.bottom = newPlatBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement('div');

    const {visual} = this;
    visual.classList.add('platform');
    visual.style.left = `${this.left}px`;
    visual.style.bottom = `${this.bottom}px`;

    grid.appendChild(visual);
  }
}

function gameOver() {
  console.log('game over');
  isGameOver = true;
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  grid.innerHTML = score;
  clearInterval(upTimerId);
  clearInterval(downTimerId);
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
}

function control (e) {
  if (e.key === 'ArrowLeft') {
    moveLeft();
  } else if (e.key === 'ArrowRight') {
    moveRight();
  } else if (e.key === 'ArrowUp') {
    moveStraight();
  }
}

function moveLeft() {
  if (isGoingRight) {
    clearInterval(rightTimerId);
    isGoingRight = false;
  }
  isGoingLeft = true;
  leftTimerId = setInterval(() => {
    if (doodlerLeftSpace >= 0) {
      doodlerLeftSpace -= 5;
      doodler.style.left = `${doodlerLeftSpace}px`;
    } else moveRight();
  }, 20);
}
function moveRight() {
  if (isGoingLeft) {
    clearInterval(leftTimerId);
    isGoingLeft = false;
  }
  isGoingRight = true;
  rightTimerId = setInterval(() => {
    if (doodlerLeftSpace <= 340) {
      doodlerLeftSpace += 5;
      doodler.style.left = `${doodlerLeftSpace}px`;
    } else moveLeft();
  }, 20);
}

function moveStraight() {
  isGoingRight = false;
  isGoingLeft = false;
  clearInterval(leftTimerId);
  clearInterval(rightTimerId);
}

function start() {
  if (!isGameOver) {
    console.log('test')
    createPlatforms();
    createDoodler();
    setInterval(movePlatforms, 30);
    // console.log(doodlerBottomSpace)
    jump();
    document.addEventListener('keyup', control);
  }
}

start();