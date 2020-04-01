import React, { useState, useEffect } from "react";

export type TimerProps = {
  seconds: number;
  paused?: boolean;
};

const Timer = (props: TimerProps) => {
  const [ valueInSeconds, setValueInSeconds ] = useState<number>(props.seconds);
  const [ intervalId, setIntervalId ] = useState<any>(0);
  const [ delta, setDelta ] = useState<number>(0);
  const leftInSeconds = Math.round(valueInSeconds - (delta / 1000));

  useEffect(() => {
    const startTime = new Date().getTime();
    setDelta(0);
    
    if (props.paused) {
      console.log('paused');
      clearInterval(intervalId);
      setValueInSeconds(leftInSeconds)
    } else {
      console.log('started');
      setIntervalId(setInterval(() => {
        const now = new Date().getTime();
        setDelta(now - startTime);
      }, 100));
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [props.paused]);

  return (
    <section>
      <h1>Timer {leftInSeconds < 0 ? 0 : leftInSeconds}</h1>
    </section>
  );
};

export default Timer;