class App extends React.Component {
  constructor(props) {
    super(props);
    // state initialized
    this.state = {
      break: 5,
      session: 25,
      label: "Session",
      // this is the setInterval will replace
      intervalID: null,
      // why is it -1
      currentTime: -1,
      sound: null
    };
  }

  componentDidMount = () => {
    // as soon as the document loads this readies audio
    const sound = document.querySelector("audio");
    this.setState({ sound: sound });
  };

  // TIMER ***********************************************************************************
  // this arrow function is for updating time and labels
  timer = () => {
    // time variable with used the current time (-1) and minus 1 seems result to -2
    let time = this.state.currentTime - 1;
    // if the time variable is bigger or equal to zero
    if (time >= 0) {
      // set the current time value to the time variable value
      this.setState({ currentTime: time });
      // otherwise
    } else {
      // if the current time value doesn't equal to -1/ the default value
      if (this.state.currentTime !== -1) this.state.sound.play();

      // new time and new label declaration
      let newTime, newLabel;

      // here is the logic determining session or break timer
      // if the label is session
      if (this.state.label === "Session") {
        // newTime is the break value times 60 to make it seconds
        newTime = this.state.break * 60;
        // newLabel is string break
        newLabel = "Break";

        // otherwise use session and its label
      } else {
        newTime = this.state.session * 60;
        newLabel = "Session";
      }

      // at the end set the state to use the new label and new time
      this.setState({
        label: newLabel,
        currentTime: newTime
      });
    }
  };
  // TIMER ***********************************************************************************

  // handleClick ***********************************************************************************
  // this arrow function handles buttons
  handleClick = e => {
    // get the click event's id
    let target = e.target.id;

    //individual values
    let breakTime = this.state.break;
    let sessionTime = this.state.session;

    // using the target id as parameter for the switch statement
    switch (target) {
      // increment and decrements, onClick will increase the targeted value and update the state with setstate
      case "session-increment":
        // setting session inc limit
        if (sessionTime < 60) {
          sessionTime++;
          this.setState({ session: sessionTime });
        }
        break;
      case "session-decrement":
        // setting session dec limit
        if (sessionTime > 1) {
          sessionTime--;
          this.setState({ session: sessionTime });
        }
        break;
      case "break-increment":
        // setting break inc limit
        if (breakTime < 60) {
          breakTime++;
          this.setState({ break: breakTime });
        }
        break;
      case "break-decrement":
        // setting session dec limit
        if (breakTime > 1) {
          breakTime--;
          this.setState({ break: breakTime });
        }
        break;

      // start stop function and inner working of the interval
      case "start_stop":
        // only if the intervalID is null/ no current interval is running
        if (this.state.intervalID === null) {
          // start from declaration
          let startFrom;

          // if the current time is -1 / the default state
          if (this.state.currentTime === -1) {
            // start from always take the session value and converts it into seconds
            startFrom = this.state.session * 60;
          } else {
            // otherwise startFrom is the current time value/ maybe while it's running or default state of -1
            startFrom = this.state.currentTime;
          }

          // the current time will be
          this.setState(
            {
              currentTime: startFrom
            },
            () => {
              const intervalID = setInterval(this.timer, 1000);
              this.setState({ intervalID: intervalID });
            }
          );
        } else {
          clearInterval(this.state.intervalID);
          this.setState({ intervalID: null });
        }
        break;

      // reset
      case "reset":
        // if the intervalID isn't null, which means an instance is running
        if (this.state.intervalID !== null)
          // clear the interval
          clearInterval(this.state.intervalID);
        // pause the sound
        this.state.sound.pause();
        // set the sound back to 0 seconds
        this.state.sound.currentTime = 0;
        // return to default state
        this.setState({
          break: 5,
          session: 25,
          label: "Session",
          intervalID: null,
          currentTime: -1
        });
        break;
    }
  };
  // handleClick ***********************************************************************************
  

  // this JSX renders the page
  render() {
    // declaring variable
    let timeDisplay, minutes, seconds, min, sec, startStopBtn;

    // if the current time is larger than 0
    if (this.state.currentTime < 0) {
      // minutes takes the value from session and seconds is the string "00"
      minutes = this.state.session;
      sec = "00";

      // otherwise if the current time is smaller than 0
    } else {
      // minutes is the rounded number resulting from the current time value divided by 60
      minutes = Math.floor(this.state.currentTime / 60);
      // seconds is the current time minus the result of the current time multiplied by 60
      seconds = this.state.currentTime - minutes * 60;
      // is seconds smaller than 10 ? if it is the sec variable string will have a leading zero, else sec variable will use the seconds
      seconds < 10 ? (sec = "0" + seconds) : (sec = seconds);
    }
    minutes < 10 ? (min = "0" + minutes) : (min = minutes);
    // template literal that sets the display format
    timeDisplay = `${min}:${sec}`;
    // intervalID
    this.state.intervalID === null
      ? (startStopBtn = "START")
      : (startStopBtn = "STOP");

    const divStyle = {
  margin: '25vh'
};
    
    return (
      <div className="wrapper ui center aligned container " style={divStyle} onClick={this.handleClick}>
        {/* timer label */}
        <div className="timer-label massive ui input" id="timer-label">
          {this.state.label}
        </div>
        {/* time display */}
        <div className="time-left" id="time-left">
          {timeDisplay}
        </div>
        {/* start stop */}
        <button className="start_stop ui button primary" id="start_stop">
          {startStopBtn}
        </button>
        {/* reset */}
        <button className="reset ui button negative" id="reset">
          RESET
        </button>
        {/* session label */}
        <div className="session-label" id="session-label">
          Session Length
        </div>
        {/* session inc dec */}
        <button className="ui positive basic button" id="session-increment">Session +</button>
        <div id="session-length">{this.state.session}</div>
        <button className="ui negative basic button"  id="session-decrement">Session -</button>
        {/* break label */}
        <div className="break-label" id="break-label">
          Break Length
        </div>
        {/* break inc dec */}
        <button className="ui positive basic button" id="break-increment">Break +</button>
        <div id="break-length">{this.state.break}</div>
        <button className="ui negative basic button" id="break-decrement">Break -</button>

        <audio
          id="beep"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Sputnik_beep.ogg"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));