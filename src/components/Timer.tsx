import React, { useState, useEffect, FC } from "react";

export type TimerProps = {
  seconds: number;
  onAlarm?: () => void;
};

const Timer: FC<TimerProps> = (props: TimerProps) => {
  const [ valueInSeconds, setValueInSeconds ] = useState<number>(props.seconds);
  const [ paused, setPaused ] = useState(false);
  const [ started, setStarted ] = useState(false);
  const [ intervalId, setIntervalId ] = useState<any>(0);
  const [ delta, setDelta ] = useState<number>(0);
  const leftInSeconds = Math.abs(Math.round(valueInSeconds - (delta / 1000)));

  const reset = () => {
    setValueInSeconds(props.seconds);
    setDelta(0);
    setStarted(false);
    setPaused(true);
  };


  React.useMemo(() => {
    if (leftInSeconds === 0) {
      props.onAlarm && props.onAlarm();
      reset();
    }
  }, [leftInSeconds, props]);

  useEffect(() => {
    const startTime = new Date().getTime();
    setDelta(0);

    if (paused || !started) {
      clearInterval(intervalId);
      setValueInSeconds(leftInSeconds)
    } else {
      setIntervalId(setInterval(() => {
        const now = new Date().getTime();
        setDelta(now - startTime);
        console.log('--- tick!', intervalId);
      }, 300));
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [started, paused]);

  let toggleButtonLabel = 'Start';
  if (started) {
    if (paused) {
      toggleButtonLabel = 'Resume';
    } else {
      toggleButtonLabel = 'Pause'
    }
  }

  console.log(toggleButtonLabel, started, paused);

  const handleToggle = () => {
    if (!started) {
      setStarted(true);
      setPaused(false);
    } else {
      if (paused) {
        setPaused(false);
      } else {
        setPaused(true);
      }
    }
  }

  return (
    <section>
      <p>Timer {leftInSeconds < 0 ? 0 : leftInSeconds}</p>
      <p>
        <button onClick={() => handleToggle()}>{toggleButtonLabel}</button>
        <button onClick={() => reset()}>Reset</button>
      </p>
    </section>
  );
};

export default Timer;
