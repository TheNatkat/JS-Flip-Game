let firstBox;
let secondBox;
let bodyColorPercent = 0;
let bodyIsComplete = false;
let boxColorPercent = 0;
let boxIsComplete = false;
let startBtnPressed = false;
let flippedCount = 0;
let gameComplete = false;
let hasFlipped = false;
let isStarted = true;
let sec = 0;
let moves = 0;

let box = document.querySelector(".main-box");
let allbox = document.querySelectorAll(".box");
let timeText = document.querySelector(".timer");
let moveText = document.querySelector(".moves");
let startButton = document.querySelector("#btn");
let winHeading = document.querySelector("h1");
let canvas = document.querySelector("canvas");

setInterval(() => {
  if (!bodyIsComplete) {
    document.body.style.background = `linear-gradient(135deg,#F7A413 0%,#F9601E ${bodyColorPercent}%, #B01EF9 100%)`;
    bodyColorPercent++;
    box.style.background = `linear-gradient(320deg,#B01EF9 0%,#F9601E ${boxColorPercent}%,#F7A413 100%)`;
    boxColorPercent++;
    if (bodyColorPercent === 100) {
      bodyIsComplete = true;
    }
  } else {
    document.body.style.background = `linear-gradient(135deg,#F7A413 0%,#F9601E ${bodyColorPercent}%, #B01EF9 100%)`;
    bodyColorPercent--;
    box.style.background = `linear-gradient(320deg,#B01EF9 0%,#F9601E ${boxColorPercent}%, #F7A413 100%)`;
    boxColorPercent--;
    if (bodyColorPercent === 0) {
      bodyIsComplete = false;
    }
  }
}, 50);

function timer() {
  setInterval(() => {
    if (!gameComplete) sec++;
    timeText.innerText = `time: ${sec} sec`;
  }, 1000);
  
}

function flipCard() {
  if (isStarted) {
    timer();
    isStarted = false;
    startButton.style.color = "grey";
  }

  this.classList.add("flipped");
  moves++;
  moveText.innerText = `${moves} moves`;

  if (!hasFlipped) {
    hasFlipped = true;
    firstBox = this;
  } else {
    secondBox = this;
    hasFlipped = false;
    if (firstBox.innerText !== secondBox.innerText) {
      setTimeout(() => {
        firstBox.classList.remove("flipped");
        secondBox.classList.remove("flipped");
      }, 400);
    } else {
      firstBox = null;
      secondBox = null;
      flippedCount = flippedCount + 2;
      if (flippedCount === 16) {
        gameComplete = true;
      }

    }
  }
  if (gameComplete) {
    winHeading.innerText = `Congratulations Game Complete in ${sec} secs`;
    winHeading.classList.add("win");
    var confettiSettings = { target: "my-canvas" };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }
}

function startGame() {
  console.log("Starting game");
  allbox.forEach((box) => box.classList.add("flipped"));
  setTimeout(
    () => allbox.forEach((box) => box.classList.remove("flipped")),
    1000
  );
  allbox.forEach((box) => {
    box.addEventListener("click", flipCard);
  });
  startButton.disabled = true;
}

startButton.addEventListener("click", startGame);

const fruitEmojis = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🍉",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🍉",
  "🍑",
  "🍑",
  "🍆",
  "🍆",
];

fruitEmojis.sort(() => Math.random() - 0.5);

let idx = 0;
allbox.forEach((box) => (box.innerText = fruitEmojis[idx++]));


