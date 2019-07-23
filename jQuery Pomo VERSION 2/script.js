let sessionLength = document.querySelector("#session-length");
let breakLength = document.querySelector("#break-length");
let breakInc = document.querySelector("#break-increment");
let sessionInc = document.querySelector("#session-increment");
let breakDec = document.querySelector("#break-decrement");
let sessionDec = document.querySelector("#session-decrement");
let display = document.querySelector("#sessionTime-left");
let label = document.querySelector("#timer-label");
let startStop = document.querySelector("#start_stop");
let reset = document.querySelector("#reset");
let audio = document.querySelector("#beep");

sessionInc.addEventListener("click", () => {
  if (sessionLength.value < 60) {
    sessionLength.value++;
  }
});
breakInc.addEventListener("click", () => {
  if (breakLength.value < 60) {
    breakLength.value++;
  }
});
sessionDec.addEventListener("click", () => {
  if (sessionLength.value > 1) {
    sessionLength.value--;
  }
});
breakDec.addEventListener("click", () => {
  if (breakLength.value > 1) {
    breakLength.value--;
  }
});

// 1 second = 1000
// 1 minute = 60000
// 10 minutes = 600000
//Bool Check
let isSession = true;
let isRunning = false;
//Time values
let interval;
let sessionTime = 0;
let breakTime = 0;

const stopWatch = () => {
  if (sessionTime > 0 && minutes >= 0 && isRunning === true) {
    sessionTime--;
  }
  if (sessionTime === 0 && minutes > 0 && isRunning === true) {
    minutes--;
    sessionTime = 59;
  }
  if (
    minutes === 0 &&
    sessionTime === 0 &&
    isRunning === true &&
    isSession === true
  ) {
    audio.play();
    label.textContent = "Break";
    minutes = breakLength.value;
    isSession = false;
  }
  if (
    minutes === 0 &&
    sessionTime === 0 &&
    isRunning === true &&
    isSession === false
  ) {
    audio.play();
    label.textContent = "Session";
    minutes = sessionLength.value;
    isSession = true;
  }

  display.textContent = moment().format("mm:ss");
};

startStop.addEventListener("click", () => {
  isRunning = true;
  interval = setInterval(stopWatch, 1000);
  if (isRunning === true) {
    clearInterval(interval);
  }
});

reset.addEventListener("click", () => {
  clearInterval(interval);
  isSession = true;
  isRunning = false;
  sessionLength.value = 25;
  breakLength.value = 5;
  minutes = sessionLength.value;
  sessionTime = 0;
  audio.load();
});
