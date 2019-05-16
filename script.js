//Length
let sessionLength = document.querySelector("#session-length");
let breakLength = document.querySelector("#break-length");
//Increment
let breakInc = document.querySelector("#break-increment");
let sessionInc = document.querySelector("#session-increment");
//Decrement
let breakDec = document.querySelector("#break-decrement");
let sessionDec = document.querySelector("#session-decrement");
//display
let display = document.querySelector("#time-left");
//labels
let label = document.querySelector("#timer-label");
let breakLabel = document.querySelector("#break-length-label");
let sessionLabel = document.querySelector("#session-length-label");
//start/stop
let startStop = document.querySelector("#start_stop");
//Reset
let reset = document.querySelector("#reset");
//audio
let audio = document.querySelector("#beep");
//Bool Check
let isPaused = true;
let isSession = true;
let isBegin = false;
//Time values
let seconds = 0;
let minutes = 0;
///////////////////////////////////////////////////////////////////////////////////

//Increment click listeners
breakInc.addEventListener("click", () => {
  breakLength.value < 60 ? breakLength.value++ : breakLength.value + 0;
  breakLabel.textContent = "Break Length: " + breakLength.value;
});
sessionInc.addEventListener("click", () => {
  sessionLength.value < 60 ? sessionLength.value++ : sessionLength.value + 0;
  sessionLabel.textContent = "Session Length: " + sessionLength.value;
});
//Decrement click listeners
breakDec.addEventListener("click", () => {
  breakLength.value > 1 ? breakLength.value-- : breakLength.value + 0;
  breakLabel.textContent = "Break Length: " + breakLength.value;
});
sessionDec.addEventListener("click", () => {
  sessionLength.value > 1 ? sessionLength.value-- : sessionLength.value + 0;
  sessionLabel.textContent = "Session Length: " + sessionLength.value;
});
///////////////////////////////////////////////////////////////////////////////////

//start stop
startStop.addEventListener("click", () => {
  isSession === true
    ? (label.textContent = "Session is initialized")
    : (label.textContent = "Break is initialized");
  isBegin = true;
  isPaused === false ? (isPaused = true) : (isPaused = false);
});

//reset
reset.addEventListener("click", () => {
  isPaused = true;
  isSession = true;
  isBegin = false;
  sessionLength.value = 25;
  breakLength.value = 5;
  minutes = sessionLength.value.slice();
  seconds = 0;
  label.textContent = "Session is initialized";
  audio.load();
});

//Break or Session?
const breakOrSession = () => {
  //if it isn't break, minutes is session val
  if (isSession === true) {
    label.textContent = "Break is initialized";
    minutes = breakLength.value.slice();
    isSession = false;
    isPaused = false;
  } else if (isSession === false) {
    label.textContent = "Session is initialized";
    minutes = sessionLength.value.slice();
    isSession = true;
    isPaused = false;
  }
};
//display
const displayElements = () => {
  if (minutes < 10 && seconds > 10) {
    display.textContent =
      minutes.toString().padStart(2, "0") + ":" + seconds.toString();
  }

  if (minutes < 10 && seconds < 10) {
    display.textContent =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
  }

  if (minutes > 10 && seconds > 10) {
    display.textContent = minutes.toString() + ":" + seconds.toString();
  }

  if (minutes > 10 && seconds < 10) {
    display.textContent =
      minutes.toString() + ":" + seconds.toString().padStart(2, "0");
  }
};

const stopWatch = () => {
  if (isBegin === false) {
    seconds = 0;
    minutes = sessionLength.value.slice();
  }

  if (seconds > 0 && isPaused === false) {
    seconds--;
  }

  if (seconds === 0 && minutes > 0 && isBegin === true) {
    minutes--;
    seconds = 59;
  }

  if (minutes === 0 && seconds === 0) {
    isPaused = true;
    audio.play();
    breakOrSession();
  }
  displayElements();
};

setInterval(stopWatch, 0);
