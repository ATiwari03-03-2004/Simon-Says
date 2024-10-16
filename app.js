let originalOrder = [];
let clickOrder = [];
let started = false;
let level = 1;
let idx = -1;
let highestScore = 0;

let container = document.querySelector(".container");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let btn3 = document.querySelector(".btn3");
let btn4 = document.querySelector(".btn4");
let highestS = document.querySelector("span");
highestS.parentElement.style.display = "none";

function gameEnd() {
  h3.innerHTML = `OOPS, GAME OVER! Your score: ${level - 1} <br> Press any key to restart the game`;
  if (level - 1 > highestScore) highestScore = level - 1;
  highestS.innerHTML = `<b>${highestScore}</b>`;
  level = 1;
  originalOrder = [];
  clickOrder = [];
  started = false;
}

function setLevel() {
  h3.innerText = `Level ${level}`;
}

function reset(bgColor, obj) {
  setTimeout(() => {
    obj.classList.remove(bgColor);
  }, 250);
}

function blink(bgColor, obj) {
  obj.classList.add(bgColor);
  reset(bgColor, obj);
}

function gameStart() {
  let btnNum = Math.floor(Math.random() * 4) + 1;
  originalOrder.push(btnNum);
  if (btnNum == 1) {
    blink("green", btn1);
  } else if (btnNum == 2) {
    blink("red", btn2);
  } else if (btnNum == 3) {
    blink("blue", btn3);
  } else {
    blink("yellow", btn4);
  }
}

function check(idx) {
  if (clickOrder[idx] != originalOrder[idx]) {
    container.classList.add("wrong");
    gameEnd();
    return -1;
  }
  if (idx + 1 == originalOrder.length) {
    level++;
    setLevel();
    setTimeout(() => {
      gameStart();
    }, 1000);
    return -1;
  } else {
    return idx;
  }
}

btn1.addEventListener("click", function () {
  blink("green", this);
  clickOrder[++idx] = 1;
  idx = check(idx);
});

btn2.addEventListener("click", function () {
  blink("red", this);
  clickOrder[++idx] = 2;
  idx = check(idx);
});

btn3.addEventListener("click", function () {
  blink("blue", this);
  clickOrder[++idx] = 3;
  idx = check(idx);
});

btn4.addEventListener("click", function () {
  blink("yellow", this);
  clickOrder[++idx] = 4;
  idx = check(idx);
});

document.addEventListener("keydown", function () {
  if (!started) {
    reset("wrong", container);
    highestS.parentElement.style.display = "block";
    setLevel();
    setTimeout(() => {
      gameStart();
    }, 1000);
    started = true;
  }
});
