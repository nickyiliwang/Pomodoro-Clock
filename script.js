//start/stop
let startStop = document.querySelector("#start_stop");
//Reset
let reset = document.querySelector("#reset");
//Length
let sessionLength = document.querySelector("#session-length");
let breakLength = document.querySelector("#break-length");
//Increment
let breakInc = document.querySelector("#break-increment");
let sessionInc = document.querySelector("#session-increment");
//Decrement
let breakDec = document.querySelector("#break-decrement");
let sessionDec = document.querySelector("#session-decrement");

reset.addEventListener("click", () => {
  //running timer should be stopped
  sessionLength.value = 25;
  breakLength.value = 5;
});

breakInc.addEventListener("click", () => {
  breakLength.value < 60 ? breakLength.value++ : breakLength.value + 0;
});
breakDec.addEventListener("click", () => {
  breakLength.value > 1 ? breakLength.value-- : breakLength.value + 0;
});
sessionInc.addEventListener("click", () => {
  sessionLength.value < 60 ? sessionLength.value++ : sessionLength.value + 0;
});
sessionDec.addEventListener("click", () => {
  sessionLength.value > 1 ? sessionLength.value-- : sessionLength.value + 0;
});

startStop.addEventListener("click", () => {});
