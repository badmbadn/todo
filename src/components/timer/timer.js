import './timer.css';
import { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <span>time is over</span>;
  }
  return <span>{`${minutes}:${seconds}`}</span>;
};

function Timer({ time, start, onStart, onStop, mainTimer }) {
  const [timer] = useState(time);
  const [come, SetStart] = useState(start);
  const [maintimer] = useState(mainTimer);
  const countDown = useRef(null);
  const interval = useRef(null);
  useEffect(() => {
    interval.current = maintimer;
    return () => clearInterval(interval.current);
  }, [mainTimer]);

  const countDownRef = (countdown) => {
    if (countdown) {
      countDown.current = countdown.getApi();
    }
  };

  const play = () => {
    countDown.current.start();
    onStart();
    SetStart(true);
  };

  const stop = () => {
    countDown.current.pause();
    onStop();
    SetStart(false);
  };

  return (
    <div className="timer">
      <button aria-label="button" className="icon icon-play" type="submit" onClick={play} />
      <button aria-label="button" className="icon icon-pause" type="submit" onClick={stop} />
      <Countdown ref={countDownRef} date={timer} renderer={renderer} autoStart={come} />
    </div>
  );
}

export default Timer;
