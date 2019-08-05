import React from "react";
import moment from "moment";

class App extends React.Component {
  state = {
    break: 300,
    session: 1500,
    currentTime: 1500,
    label: "Session",
    intervalID: null,
    isPaused: false,
    sound: null
  };

  componentDidMount = () => {
    const sound = document.querySelector("audio");
    this.setState({ sound: sound });
  };

  // *************************************************************************
  timer = () => {
    let time, newTime, newLabel;
    time = this.state.currentTime - 1;

    if (time >= 0) {
      this.setState({ currentTime: time });
    } else {
      if (this.state.currentTime !== -1) {
        this.state.sound.play();
      }
      if (this.state.label === "Session") {
        newTime = this.state.break * 60;
        newLabel = "Break";
      } else {
        newTime = this.state.session * 60;
        newLabel = "Session";
      }
      this.setState({
        label: newLabel,
        currentTime: newTime
      });
    }
  };
  // *************************************************************************

  // *************************************************************************
  handleStartStop = () => {
    if (this.state.intervalID === null) {
      this.setState({ currentTime: this.state.session });
      let timer = setInterval(() => {
        if (this.state.isPaused === false) {
          this.setState({ currentTime: this.state.currentTime - 1 });
        }
      }, 1000);
      this.setState({ intervalID: timer });
    } else {
      this.state.isPaused === false
        ? this.setState({ isPaused: true })
        : this.setState({ isPaused: false });
    }
  };

  handleReset = () => {
    clearInterval(this.state.intervalID);
    this.state.sound.pause();
    this.state.sound.currentTime = 0;

    this.setState({
      break: 300,
      session: 1500,
      currentTime: this.state.session,
      label: "Session",
      intervalID: null,
      isPaused: false,
      sound: null
    });
  };
  // *************************************************************************

  // *************************************************************************
  handleClick = e => {
    switch (e.target.id) {
      case "session-increment":
        if (this.state.session < 3600) {
          this.setState({ session: this.state.session + 60 });
        }
        break;
      case "session-decrement":
        if (this.state.session > 60) {
          this.setState({ session: this.state.session - 60 });
        }
        break;
      case "break-increment":
        if (this.state.break < 3600) {
          this.setState({ break: this.state.break + 60 });
        }
        break;
      case "break-decrement":
        if (this.state.break > 60) {
          this.setState({ break: this.state.break - 60 });
        }
        break;
      case "start_stop":
        this.handleStartStop();
        break;

      case "reset":
        this.handleReset();
        break;

      default:
        return null;
    }
  };
  // *************************************************************************

  handleButtonText() {
    return this.state.intervalID === null
      ? "START"
      : this.state.isPaused === false
      ? "PAUSE"
      : "RESUME";
  }

  renderDisplay = () => {
    const millerSeconds = this.state.currentTime * 1000;
    return moment(millerSeconds).format("mm:ss");
  };

  render() {
    return (
      <div className="ui center aligned container" onClick={this.handleClick}>
        <div className="ui huge header" />
        <h1 className="timer-label ui header" id="timer-label">
          {this.state.label}
        </h1>
        {/* time display */}
        <h3 className="time-left" id="time-left">
          {this.renderDisplay()}
        </h3>
        {/* start stop */}
        <button className="start_stop ui button primary" id="start_stop">
          {this.handleButtonText()}
        </button>
        <button className="reset ui button negative" id="reset">
          RESET
        </button>
        <h2 className="session-label ui header" id="session-label">
          Session Length
        </h2>
        {/* session minutes  */}
        <h3 id="session-length">{this.state.session / 60}</h3>
        <button className="ui positive basic button" id="session-increment">
          Session +
        </button>
        <button className="ui negative basic button" id="session-decrement">
          Session -
        </button>
        <h2 className="break-label ui header" id="break-label">
          Break Length
        </h2>
        {/* break minutes */}
        <h3 id="break-length">{this.state.break / 60}</h3>
        <button className="ui positive basic button" id="break-increment">
          Break +
        </button>
        <button className="ui negative basic button" id="break-decrement">
          Break -
        </button>
        <audio
          id="beep"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Sputnik_beep.ogg"
        />
      </div>
    );
  }
}

export default App;
