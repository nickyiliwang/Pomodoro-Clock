class App extends React.Component {
  constructor(props) {
    super(props);
    // INITAL_STATE
    this.state = {
      break: 5,
      session: 25,
      label: "Session",
      intervalID: null,
      currentTime: -1,
      sound: null
    };
  }
  // original ticking is from minutes to seonds, and minus 1 second per 1000ms
  // we need to do the same but with moment js
  // also need to figure out if we can make currenttime a different value/ change the entire logic, because currently it makes no sense/

  componentDidMount = () => {
    // readies audio on inital render
    const sound = document.querySelector("audio");
    this.setState({ sound: sound });
  };

  // TIMER ***********************************************************************************
  // updating time and labels
  timer = () => {
    let time, newTime, newLabel;
    
    // time variable with used the current time (-1) and minus 1 seems result to -2
    time = this.state.currentTime - 1;
    // if the time variable is bigger or equal to zero
    if (time >= 0) {
      // set the current time value to the time variable value
      this.setState({ currentTime: time });
      // otherwise
    } else {
      // if the current time value doesn't equal to -1/ the default value
      if (this.state.currentTime !== -1) {this.state.sound.play();}

      // determining session or break timer
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

  // handleClick ******************************************************************************
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
        
      case "reset":
        if (this.state.intervalID !== null) {clearInterval(this.state.intervalID)};
        this.state.sound.pause();
        this.state.sound.currentTime = 0;
        this.setState({
          break: 5,
          session: 25,
          label: "Session",
          intervalID: null,
          currentTime: -1
        });
    }
  };
  // handleClick ******************************************************************************



  // this JSX renders the page
  render() {
    // declaring variable
   let timeDisplay, minutes, startStopBtn;

   // if the current time is larger than 0
   if (this.state.currentTime < 0) {
     minutes = this.state.session;
   }

   // start stop button bool
   this.state.intervalID === null ? (startStopBtn = "START") : (startStopBtn = "STOP");

  timeDisplay = this.state.currentTime;

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
        {moment(25, "mm").format("mm:ss")}
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
       <h3 id="session-length">{moment(25, "mm").format("m")}</h3>
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
        <h3 id="break-length">{moment(5, "mm").format("m")}</h3>
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

ReactDOM.render(<App />, document.getElementById("root"));
