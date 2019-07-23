import React from "react";
import ReactDOM from "react-dom";

//React
//Parent Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: "Break",
      breakTime: 5,
      session: "Session",
      sessionTime: 25,
      playStop: "Play",
      hiddenTime: 1500,
      min: 25,
      sec: "00",
      sesBrkTracker: "Session"
    };
  }

  //callback function for setting session times
  callBackSes = () => {
    if (this.state.sessionTime < 10) {
      this.setState({ min: "0" + this.state.sessionTime });
    } else {
      this.setState({ min: this.state.sessionTime });
    }
    //reset session when clicked
    clearInterval(this.timer);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      sec: "00",
      playStop: "Play"
    });
    //set new time
    this.setState({ hiddenTime: this.state.sessionTime * 60 });
  };

  increaseBreakButtonClick() {
    if (this.state.breakTime < 60) {
      this.setState({ breakTime: this.state.breakTime + 1 });
    }
  }
  increaseSessionButtonClick() {
    if (this.state.sessionTime < 60) {
      this.setState(
        { sessionTime: this.state.sessionTime + 1 },
        this.callBackSes
      );
    }
  }
  decreaseBreakButtonClick() {
    if (this.state.breakTime > 1) {
      this.setState({ breakTime: this.state.breakTime - 1 });
    }
  }
  decreaseSessionButtonClick() {
    if (this.state.sessionTime > 1) {
      this.setState(
        { sessionTime: this.state.sessionTime - 1 },
        this.callBackSes
      );
    }
  }
  playStopButtonClick() {
    // this.state.playStop == 'Play' ? this.setState({playStop: 'Stop'}) : this.setState({playStop: 'Play'});
    if (this.state.playStop === "Play") {
      // set interval needs to be set as a function AND use a function for setstate
      this.timer = setInterval(this.tick, 1000);
      this.setState({ playStop: "Stop" });
    } else {
      clearInterval(this.timer);
      this.setState({ playStop: "Play" });
    }
  }

  //Reset Button clicked
  resetButtonClick() {
    clearInterval(this.timer);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    this.setState({
      break: "Break",
      breakTime: 5,
      session: "Session",
      sessionTime: 25,
      playStop: "Play",
      hiddenTime: 1500,
      min: 25,
      sec: "00",
      sesBrkTracker: "Session"
    });
  }

  //function to be used in the setInterval
  tick = () => {
    //ticking of hiddenTime
    this.setState(
      { hiddenTime: this.state.hiddenTime - 1 },
      this.callBackReset
    );

    let tempMin = Math.floor(this.state.hiddenTime / 60);
    let tempSec = this.state.hiddenTime - tempMin * 60;

    if (tempSec < 10) {
      tempSec = "0" + tempSec;
    }

    if (tempMin < 10) {
      tempMin = "0" + tempMin;
    }

    this.setState({
      min: tempMin,
      sec: tempSec
    });
  };

  //callback to auto reset
  callBackReset = () => {
    if (this.state.hiddenTime < 0) {
      document.getElementById("beep").currentTime = 0;
      document.getElementById("beep").play();
      if (this.state.sesBrkTracker === "Session") {
        this.setState({
          hiddenTime: this.state.breakTime * 60,
          sesBrkTracker: "Break"
        });
        console.log(this.state.sesBrkTracker);
      } else {
        this.setState({
          hiddenTime: this.state.sessionTime * 60,
          sesBrkTracker: "Session"
        });
        console.log(this.state.sesBrkTracker);
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Prodomo Timer</h1>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Selector
                name={this.state.break}
                time={this.state.breakTime}
                id="break-label"
                btnIncId="break-increment"
                btnDecId="break-decrement"
                length="break-length"
                increase={this.increaseBreakButtonClick}
                decrease={this.decreaseBreakButtonClick}
              />
            </div>
            <div className="col-6">
              <Selector
                name={this.state.session}
                time={this.state.sessionTime}
                id="session-label"
                btnIncId="session-increment"
                btnDecId="session-decrement"
                length="session-length"
                increase={this.increaseSessionButtonClick}
                decrease={this.decreaseSessionButtonClick}
              />
            </div>
          </div>
        </div>

        <Timer
          min={this.state.min}
          sec={this.state.sec}
          tracker={this.state.sesBrkTracker}
        />

        <div className="container">
          <div className="row justify-content-center">
            <PlayBack
              button={this.state.playStop}
              btnName="start_stop"
              onclick={this.playStopButtonClick}
            />
            <div id="spacing" />
            <PlayBack
              button="Reset"
              btnName="reset"
              onclick={this.resetButtonClick}
            />
          </div>
        </div>
        <audio
          id="beep"
          className="clip"
          src="http://www.orangefreesounds.com/wp-content/uploads/2019/01/Old-alarm-clock-sound.mp3"
        />
      </div>
    );
  }
}

//Break & Session Components
class Selector extends React.Component {
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <h2 id={this.props.id}>{this.props.name}</h2>
        </div>

        <div className="row justify-content-center">
          <button
            className="btn btn-danger"
            id={this.props.btnDecId}
            onClick={this.props.decrease}
          >
            Decrease
          </button>
          <h3 className="font-weight-bold text-center" id={this.props.length}>
            {this.props.time}
          </h3>
          <button
            className="btn btn-success"
            id={this.props.btnIncId}
            onClick={this.props.increase}
          >
            Increase
          </button>
        </div>
      </div>
    );
  }
}

//Play, Stop & Reset Components
class PlayBack extends React.Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-default"
          id={this.props.btnName}
          onClick={this.props.onclick}
        >
          {this.props.button}
        </button>
      </div>
    );
  }
}

//Timer Component

class Timer extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-center" id="timer-label">
          {this.props.tracker}
        </h1>
        <h1 className="text-center" id="time-left">
          {this.props.min}:{this.props.sec}
        </h1>
      </div>
    );
  }
}

//render to the Dom
ReactDOM.render(<App />, document.getElementById("root"));
