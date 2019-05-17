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

//Click Listener
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
let minutes = 0;
let ticking;

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
    label.textContent = "Break";
    minutes = breakLength.value;
    isSession = false;
  } else if (isSession === false) {
    label.textContent = "Session";
    minutes = sessionLength.value;
    isSession = true;
  }
};

const stopWatch = () => {
  if (seconds > 0 && isPaused === false && isRunning === true) {
    seconds--;
  }
  if (seconds === 0 && minutes > 0 && isRunning === true) {
    minutes--;
    seconds = 59;
  }
  if (minutes === 0 && seconds === 0 && isRunning === true) {
    
    audio.play().onended = breakOrSession();
    
  }
  displayElements();
};

startStop.addEventListener(
  "click",
  (PEPEJAM = () => {
    if (isRunning === false) {
      isPaused = false;
      isRunning = true;
      minutes = sessionLength.value;
      ticking = setInterval(stopWatch, 1000);
    } else if (isRunning === true) {
      isPaused === false ? (isPaused = true) : (isPaused = false);
    }
  })
);

reset.addEventListener("click", ALLCLEAR = () => {
  isPaused = true;
  isSession = true;
  isRunning = false;
  sessionLength.value = 25;
  breakLength.value = 5;
  display.textContent = "25:00";
  label.textContent = "Session";
  seconds = 0;
  audio.load();
  clearInterval(ticking);
});
