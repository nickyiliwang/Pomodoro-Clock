let sessionLength = document.querySelector("#session-length");
let breakLength = document.querySelector("#break-length");
let breakInc = document.querySelector("#break-increment");
let sessionInc = document.querySelector("#session-increment");
let breakDec = document.querySelector("#break-decrement");
let sessionDec = document.querySelector("#session-decrement");
let display = document.querySelector("#time-left");
let label = document.querySelector("#timer-label");
let startStop = document.querySelector("#start_stop");
let reset = document.querySelector("#reset");
let audio = document.querySelector("#beep");

//Increment click listeners
breakInc.addEventListener("click", () => {
  if (breakLength.value < 60) {
    breakLength.value++;
  }
});
sessionInc.addEventListener("click", () => {
  if (sessionLength.value < 60) {
    sessionLength.value++;
  }
});
//Decrement click listeners
breakDec.addEventListener("click", () => {
  if (breakLength.value > 1) {
    breakLength.value--;
  }
});
sessionDec.addEventListener("click", () => {
  if (sessionLength.value > 1) {
    sessionLength.value--;
  }
});

//Bool Check
let isPaused = true;
let isSession = true;
let isRunning = false;
//Time values
let seconds = 0;
let minutes = sessionLength.value;

const displayElements = () => {
  if (minutes < 10 && seconds >= 10) {
    display.textContent =
      minutes.toString().padStart(2, "0") + ":" + seconds.toString();
  }
  if (minutes < 10 && seconds < 10) {
    display.textContent =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
  }
  if (minutes >= 10 && seconds < 10) {
    display.textContent =
      minutes.toString() + ":" + seconds.toString().padStart(2, "0");
  }
  if (minutes >= 10 && seconds >= 10) {
    display.textContent = minutes.toString() + ":" + seconds.toString();
  }
};

//Break or Session?
const breakOrSession = () => {
  if (isSession === true) {
    label.textContent = "Session";
    minutes = sessionLength.value;
  }
  if (isSession === false) {
    label.textContent = "Break";
    minutes = breakLength.value;
  }
};

const stopWatch = () => {
  console.log("running");
  if (seconds > 0 && isPaused === false && isRunning === true) {
    seconds--;
  }
  if (seconds === 0 && minutes > 0 && isRunning === true) {
    minutes--;
    seconds = 59;
  }
  if (minutes === 0 && seconds === 0 && isRunning === true) {
    isPaused = true;
    audio.play();
  }
  displayElements();
};

//start stop
const startTimer = () => {
  if (isRunning === false) {
    isRunning = true;
    isPaused = false;
    minutes = sessionLength.value;
    setInterval(stopWatch, 1000);
  }

  if (isRunning === true) {
    isPaused === false ? (isPaused = true) : (isPaused = false);
  }
};

startStop.addEventListener("click", startTimer);

//reset
const resetTimer = () => {
  isPaused = true;
  isSession = true;
  isRunning = false;
  sessionLength.value = 25;
  breakLength.value = 5;
  minutes = sessionLength.value;
  seconds = 0;
  audio.load();
};

reset.addEventListener("click", resetTimer);
