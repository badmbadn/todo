/* eslint-disable react/no-did-update-set-state */
import './timer.css';
import { Component } from 'react';
import Countdown from 'react-countdown';

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <span>time is over</span>;
  }
  return <span>{`${minutes}:${seconds}`}</span>;
};

class Timer extends Component {
  countDown = null;

  constructor(props) {
    const { time, start } = props;
    super(props);
    this.state = {
      time,
      start,
    };
  }

  countDownRef = (countdown) => {
    if (countdown) {
      this.countDown = countdown.getApi();
    }
  };

  onStart = () => {
    const { onStart } = this.props;
    this.countDown.start();
    onStart();
    this.setState({
      start: true,
    });
  };

  onStop = () => {
    const { onStop } = this.props;
    this.countDown.pause();
    console.log('dd');
    onStop();
    this.setState({
      start: false,
    });
  };

  render() {
    const { time, start } = this.state;
    const { countDownRef } = this;
    return (
      <div className="timer">
        <button aria-label="button" className="icon icon-play" type="submit" onClick={this.onStart} />
        <button aria-label="button" className="icon icon-pause" type="submit" onClick={this.onStop} />
        <Countdown ref={countDownRef} date={time} renderer={renderer} autoStart={start} />
      </div>
    );
  }
}

export default Timer;
