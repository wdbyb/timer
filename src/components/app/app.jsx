import React, {useEffect, useState} from 'react';

const START_COUNT_VALUE = 0;
const DBLCLICK_DELAY = 300;

const getTime = (duration) => {
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = Math.floor(duration) % 60;

  return `${hrs < 10 ? `0${hrs}` : hrs}: ${mins < 10 ? `0${mins}` : mins}: ${secs < 10 ? `0${secs}` : secs}`;
};

const App = () => {
  const [isTimerStarted, setTimerStart] = useState(false);
  const [isTimerStoped, setTimerStop] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleClickOnStart = () => {
    setTimerStart(true);
    setTimerStop(false);
  };

  const handleClickOnWait = () => {
    setClicks((prevClicks) => prevClicks + 1);

    const dblClickDelay = setTimeout(() => {
      setClicks(() => START_COUNT_VALUE);
      clearTimeout(dblClickDelay);
    }, DBLCLICK_DELAY);
  };

  const handleClickOnStop = () => {
    setDuration(() => START_COUNT_VALUE);
    setTimerStart(false);
    setTimerStop(true);
  };

  const handleClickOnReset = () => {
    setDuration(() => START_COUNT_VALUE);
    setTimerStart(true);
    setTimerStop(false);
  };

  useEffect(() => {
    if (isTimerStarted) {
      const interval = setInterval(
          () => setDuration((prevDuration) => prevDuration + 1),
          1000
      );

      return () => {
        clearInterval(interval);
      };
    }

    if (isTimerStoped) {
      setDuration(() => START_COUNT_VALUE);
    }

    return () => {};
  }, [isTimerStarted, isTimerStoped, setDuration]);

  useEffect(() => {
    if (clicks === 2) {
      setTimerStart(false);
      setTimerStop(false);
    }
  }, [clicks]);

  return (
    <>
      <div className="timer">
        {getTime(duration)}
      </div>
      <button onClick={handleClickOnStart}>Start</button>
      <button onClick={handleClickOnStop}>Stop</button>
      <button onClick={handleClickOnWait}>Wait</button>
      <button onClick={handleClickOnReset}>Reset</button>
    </>
  );
};

export default App;
