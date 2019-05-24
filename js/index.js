let number = 0;
let isSessionLength = false;
class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      secondes: "00",
      playTimer: false,
      timeLabel: "Session" };

    this.url = "https://goo.gl/65cBl1";
    this.audio = new Audio(this.url);
    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  handleReset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      secondes: "00",
      playTimer: false });

    number = 0;
  }
  handleBreak(event) {
    if (event.currentTarget.id === "break-decrement") {
      if (this.state.breakLength > 1) {
        this.setState({
          breakLength: this.state.breakLength - 1 });

      }

    } else
    {
      if (this.state.breakLength < 60) {
        this.setState({
          breakLength: this.state.breakLength + 1 });

      }}
  }
  handleSession(event) {
    if (event.currentTarget.id === "session-decrement") {
      if (this.state.sessionLength > 1) {

        this.setState({
          sessionLength: this.state.sessionLength - 1,
          minutes: this.state.minutes - 1 });

      }

    } else
    {
      if (this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          minutes: this.state.minutes + 1 });

      }

    }
  }
  handlePlay(event) {
    this.setState({
      playTimer: !this.state.playTimer });

    console.log(this.state.playTimer);
  }
  componentDidMount() {

    this.interval = setInterval(() => {

      if (this.state.playTimer) {
        if (number === 0) {
          number = 60;
          this.setState({
            minutes: this.state.minutes - 1 });

        }
        number = number - 1;
        this.setState({ secondes: number });
      }


      if (this.state.minutes === 0 && this.state.secondes === 0) {
        this.audio.play();
        if (!isSessionLength) {
          this.setState({
            minutes: this.state.breakLength,
            secondes: "00",
            timeLabel: "Break" });

          isSessionLength = !isSessionLength;
        } else
        {
          this.setState({
            minutes: this.state.sessionLength,
            secondes: "00",
            timeLabel: "Session" });

          isSessionLength = !isSessionLength;
        }

      }

    }, 1000);





  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return React.createElement("div", { class: "container" },
    React.createElement("div", { class: "row" },
    React.createElement("div", { class: "col-sm-9 col-lg-6 column centerIt" },
    React.createElement("div", { class: "pomodoro-container" },
    React.createElement("h1", { class: "title text-center" }, "Pomodoro Clock"),
    React.createElement("div", { id: "settings-container" },
    React.createElement("div", { class: "row" },
    React.createElement("div", { class: "col" },
    React.createElement("div", { class: "break-container text-center" },
    React.createElement("p", { id: "break-label" }, " Break Length"),
    React.createElement("button", { id: "break-decrement", class: "btn btn-link", onClick: this.handleBreak }, React.createElement("i", { class: "fa fa-arrow-down" })),
    React.createElement("span", { id: "break-length" }, this.state.breakLength),
    React.createElement("button", { id: "break-increment", class: "btn btn-link", onClick: this.handleBreak }, React.createElement("i", { class: "fa fa-arrow-up" })))),

    React.createElement("div", { class: "col" },
    React.createElement("div", { class: "session-container text-center" },
    React.createElement("p", { id: "session-label" }, " Session Length"),
    React.createElement("button", { id: "session-decrement", class: "btn btn-link", onClick: this.handleSession }, React.createElement("i", { class: "fa fa-arrow-down" })),
    React.createElement("span", { id: "session-length" }, this.state.sessionLength),
    React.createElement("button", { id: "session-increment", class: "btn btn-link", onClick: this.handleSession }, React.createElement("i", { class: "fa fa-arrow-up" })))))),








    React.createElement(Timer, { minutes: this.state.minutes, secondes: this.state.secondes, playTimer: this.state.playTimer, timeLabel: this.state.timeLabel }),
    React.createElement("button", { id: "start_stop", class: "btn btn-link text-right", onClick: this.handlePlay }, React.createElement("i", { class: "fa fa-play" }), React.createElement("i", { class: "fa  fa-pause" })),
    React.createElement("button", { id: "reset", class: "btn btn-link text-left", onClick: this.handleReset }, React.createElement("i", { class: "fas fa-undo" })),
    React.createElement("p", { class: "credit text-center" }, "Designed and coded by Alex Gnakadja")))));




  }}


class Timer extends React.Component {
  constructor(props) {
    super(props);

  }





  render() {
    return React.createElement("div", { class: "timer-box text-center" },
    React.createElement("p", { id: "timer-label" }, " ", this.props.timeLabel),
    React.createElement("span", { id: "time-left" }, this.props.minutes, " : ", this.props.secondes));

  }}


ReactDOM.render(React.createElement(Pomodoro, null), document.getElementById("root"));