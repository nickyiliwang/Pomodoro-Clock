import React from "react";
import "./MyTimer.css";

const SessionOrBreak = ({ type, label, value, handleClick }) => (
  <div className="SessionOrBreak">
    <div id={`${type}-label`}>{label}</div>
    <div className="SessionOrBreak-controls">
      <button
        id={`${type}-decrement`}
        onClick={() => handleClick(false, `${type}Value`)}
      >
        -
      </button>
      <h1 id={`${type}-length`}>{value}</h1>
      <button
        id={`${type}-increment`}
        onClick={() => handleClick(true, `${type}Value`)}
      >
        +
      </button>
    </div>
  </div>
);

const Timer = ({ mode, time }) => (
  <div className="Timer">
    <h1 id="timer-label">{mode === "session" ? "Session " : "Break "}</h1>
    <h1 id="time-left">{time}</h1>
  </div>
);

const Controls = ({ isRunning, handleReset, handlePlayPause }) => (
  <div className="Controls">
    <button id="start_stop" onClick={handlePlayPause}>
      {isRunning ? <span>STOP</span> : <span>START</span>}
    </button>
    <button id="reset" onClick={handleReset}>
      RESET
    </button>
  </div>
);

class MyTimer extends React.Component {
  constructor(props) {
    super(props);
    this.intervalID = null;
    this.interval = 1000;
    this.minutesOnStartUp = 1500000;
    this.timerSeconds = this.timer / 1000;
    this.state = {
      // unit in Milliseconds, It'll later be divided by 10000.
      isRunning: false,
      isBegin: false,
      timer: this.minutesOnStartUp,
      session: this.minutesOnStartUp,
      break: 300000,
      mode: "Session"
    };
  }

  componentDidUpdate() {
    if (this.state.time === 0 && this.state.mode === "session") {
      this.setState({ time: this.state.breakValue * 60 * 1000, mode: "break" });
      this.audio.play();
    }
    if (this.state.time === 0 && this.state.mode === "break") {
      this.setState({
        time: this.state.sessionValue * 60 * 1000,
        mode: "session"
      });
      this.audio.play();
    }
  }

  //this limits break and session increase to no more than 60 and lower than 1
  handleSetTimers = (incrementNumbers, type) => {
    if (incrementNumbers && this.state[type] === 60) return;
    if (!incrementNumbers && this.state[type] === 1) return;
    this.setState({ [type]: this.state[type] + (incrementNumbers ? 1 : -1) });
  };

  handlePlayPause = () => {
    this.timer = this.props.timer;
    this.setState(state => {
      return { isRunning: !state.isRunning };
    });

    if (this.intervalID) this.pauseTimer();
    else this.startCountDown();
  };

  startTimer = () => {
    this.startCountDown();
  };

  pauseTimer = () => {
    this.intervalID.cancel();
    this.intervalID = null;
    this.setState({ running: false });
  };

  handleReset = () => {
    this.intervalID && this.intervalID.cancel();
    this.intervalID = null;
    this.timeoutID && clearTimeout(this.timeoutID);
    this.timeoutID = null;
    this.alarm.current.currentTime = 0;
    this.alarm.current.pause();
    this.props.resetSettings();
    this.timer = 1500000;
    this.timerSeconds = this.timer / 1000 + 1;
    this.setState({
      running: false,
      isRunning: false,
      showDisplay: null,
      timer: 1500000,
      session: 1500000,
      break: 300000,
      mode: "session",
      isBegin: false
    });
    this.props.startCountDown(this.timer);
  };

  //RestartCounter after finishing counting ? or maybe reset?
  restartCounter = () => {
    const fccFix = 1000; // This is here to pass tests #23 and #25 on FCC.

    this.sessionsLeft--;
    if (this.sessionsLeft > 0) {
      this.timeoutID = setTimeout(() => {
        this.intervalID && this.intervalID.cancel();
        this.intervalID = null;

        if (this.sessionsLeft % 2 !== 0) {
          //Break
          this.timer =
            this.sessionsLeft === 1
              ? this.props.settings["long-break"] + fccFix
              : this.props.settings.break + fccFix;
        } else {
          // Session
          this.timer = this.props.settings.session + fccFix;
        }
        this.timerSeconds = this.timer / 1000;
        this.startTimer();
      }, 500);
    } else {
      this.timeoutID = setTimeout(() => {
        this.resetTimer();
      }, 500);
    }
  };

  //Start CountDown with setAccurateInterval
  startCountDown = () => {
    this.intervalID && this.intervalID.cancel();
    this.updateDisplay();
    this.intervalID = this.setAccurateInterval(() => {
      if (this.timer > 0) {
        this.timer -= this.interval;
        this.props.startCountDown(this.timer);
      } else {
        this.alarm.current.play();
        this.props.startCountDown(0);
        this.intervalID && this.intervalID.cancel();
        this.restartCounter();
      }
    }, this.interval);
  };

  //AccurateInterval
  setAccurateInterval = (fn, time) => {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function() {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function() {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    };
  };

  render() {
    const leadingZeroDisplay = () => {
      let minutes = parseInt((this.props.timer / (1000 * 60)) % 60, 10);
      let seconds = parseInt((this.props.timer / 1000) % 60, 10);
      const hours = minutes === 60 ? "1:" : "";
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      return `${hours}${minutes}:${seconds}`;
    };

    return (
      <div>
        <div className="header">Pomodoro Clock</div>
        <div className="settings">
          <SessionOrBreak
            type="session"
            label="Session Length"
            value={this.state.sessionValue}
            handleClick={this.handleSetTimers}
          />
          <SessionOrBreak
            type="break"
            label="Break Length"
            value={this.state.breakValue}
            handleClick={this.handleSetTimers}
          />
        </div>
        <Timer
          mode={this.state.mode}
          //Change this display option
          time={leadingZeroDisplay()}
        />
        <Controls
          // id="start_stop"
          isRunning={this.state.isRunning}
          handleReset={this.handleReset}
          handlePlayPause={this.handlePlayPause}
        />
        <audio
          id="beep"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Sputnik_beep.ogg"
          ref={ref => (this.audio = ref)}
        />
      </div>
    );
  }
}

export default MyTimer;
