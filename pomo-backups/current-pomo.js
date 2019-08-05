import React from "react";
import moment from "moment";

class App extends React.Component {
  state = {
    break: 5,
    session: 25,
    label: "Session",
    intervalID: null,
    currentTime: -1,
    sound: null
  };

  componentDidMount = () => {
    const sound = document.querySelector("audio");
    this.setState({ sound: sound });
  };

  // TIMER ****************************************************************************
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
  // TIMER ****************************************************************************

  // handleClick ****************************************************************************
  handleClick = e => {
    let target = e.target.id;
    let breakTime = this.state.break;
    let sessionTime = this.state.session;

    switch (target) {
      case "session-increment":
        if (sessionTime < 60) {
          sessionTime++;
          this.setState({ session: sessionTime });
        }
        break;
      case "session-decrement":
        if (sessionTime > 1) {
          sessionTime--;
          this.setState({ session: sessionTime });
        }
        break;
      case "break-increment":
        if (breakTime < 60) {
          breakTime++;
          this.setState({ break: breakTime });
        }
        break;
      case "break-decrement":
        if (breakTime > 1) {
          breakTime--;
          this.setState({ break: breakTime });
        }
        break;
      case "start_stop":
        if (this.state.intervalID === null) {
          let startTimer;
          if (this.state.currentTime === -1) {
            startTimer = this.state.session * 60;
          } else {
            startTimer = this.state.currentTime;
          }
          this.setState(
            {
              currentTime: startTimer
            },
            () => {
              const intervalID = setInterval(this.timer, 1000);
              this.setState({ intervalID });
            }
          );
        } else {
          clearInterval(this.state.intervalID);
          this.setState({ intervalID: null });
        }
        break;

      case "reset":
        if (this.state.intervalID !== null) {
          clearInterval(this.state.intervalID);
        }
        this.state.sound.pause();
        this.setState({
          break: 5,
          session: 25,
          label: "Session",
          intervalID: null,
          currentTime: -1
        });
        break;

      default:
        return this.state;
    }
  };
  // handleClick ****************************************************************************

  render() {
    let minutes, startStopBtn;

    minutes = this.state.session;

    // start stop button bool
    this.state.intervalID === null
      ? (startStopBtn = "START")
      : (startStopBtn = "STOP");

    return (
      <div
        className="wrapper ui center aligned container"
        style={{ margin: "15vh" }}
        onClick={this.handleClick}
      >
        {/* timer label */}
        <h1 className="timer-label ui header" id="timer-label">
          {this.state.label}
        </h1>
        {/* time display */}
        <h3 className="time-left" id="time-left">
          {moment(minutes, "mm").format("mm:ss")}
        </h3>
        {/* start stop */}
        <button className="start_stop ui button primary" id="start_stop">
          {startStopBtn}
        </button>
        {/* reset */}
        <button className="reset ui button negative" id="reset">
          RESET
        </button>
        {/* session label */}
        <h2 className="session-label ui header" id="session-label">
          Session Length
        </h2>
        {/* session minutes  */}
        <h3 id="session-length">{this.state.session}</h3>
        {/* session inc dec */}
        <button className="ui positive basic button" id="session-increment">
          Session +
        </button>
        <button className="ui negative basic button" id="session-decrement">
          Session -
        </button>
        {/* break label */}
        <h2 className="break-label ui header" id="break-label">
          Break Length
        </h2>
        {/* break minutes */}
        <h3 id="break-length">{this.state.break}</h3>
        {/* break inc dec */}
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
