import React from "react";
import moment from "moment";

class Test extends React.Component {
  state = {
    session: 60,
    currentTime: null,
    isPaused: false,
    intervalID: null
  };

  componentDidMount() {
    this.setState({ currentTime: this.state.session });
  }

  startStop = () => {
    if (this.state.intervalID === null) {
      this.setState({ currentTime: this.state.session });
      let timer = setInterval(() => {
        if (this.state.isPaused === false) {
          this.setState({ currentTime: this.state.currentTime - 1 });
          console.log(this.state.currentTime);
        }
      }, 1000);
      this.setState({ intervalID: timer });
    } else {
      this.state.isPaused === false
        ? this.setState({ isPaused: true })
        : this.setState({ isPaused: false });
    }
  };

  reset = () => {
    clearInterval(this.state.intervalID);
    this.setState({
      session: 60,
      currentTime: this.state.session,
      isPaused: false,
      intervalID: null
    });
  };

  display = () => {
    const millerSeconds = this.state.currentTime * 1000;
    return moment(millerSeconds).format("mm:ss");
  };

  startFrom = () => {
    return this.state.session / 60;
  };

  handleControls = e => {
    switch (e.target.id) {
      case "increase":
        if (this.state.session < 3600) {
          this.setState({ session: this.state.session + 60 });
        }
        break;
      case "decrease":
        if (this.state.session > 60) {
          this.setState({ session: this.state.session - 60 });
        }
        break;
      case "start-stop":
        this.startStop();
        break;
      case "reset":
        this.reset();
        break;
      default:
        return null;
    }
  };

  handleButtonText() {
    return this.state.intervalID === null
      ? "START"
      : this.state.isPaused === false
      ? "PAUSE"
      : "RESUME";
  }

  render() {
    return (
      <div
        className="ui center aligned relaxed grid"
        onClick={this.handleControls}
      >
        <div className="three column row">
          <button id="start-stop" className="column">
            {this.handleButtonText()}
          </button>

          <button id="reset" className="column">
            RESET
          </button>
        </div>
        <div>{this.startFrom()}</div>
        <div className="three column row">
          <button id="increase" className="column">
            INCREASE
          </button>
          <button id="decrease" className="column">
            DECREASE
          </button>
        </div>
        <div>{this.display()}</div>
      </div>
    );
  }
}

export default Test;
