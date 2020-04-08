import React, { useState, useEffect, FC } from "react";
import formatTime from "../lib/formatTime";

export type TimerProps = {
  seconds: number;
  onAlarm?: (note?: string) => void;
  note?: string;
  autoRepeat?: boolean;
};

const Timer: FC<TimerProps> = (props: TimerProps) => {
  const [ valueInSeconds, setValueInSeconds ] = useState<number>(props.seconds);
  const [ paused, setPaused ] = useState(false);
  const [ started, setStarted ] = useState(false);
  const [ intervalId, setIntervalId ] = useState<any>(0);
  const [ delta, setDelta ] = useState<number>(0);
  const [ alarmed, setAlarmed ] = useState(false);
  const leftInSeconds = Math.abs(Math.round(valueInSeconds - (delta / 1000)));

  const start = () => {
    setStarted(true);
    setPaused(false);
  };

  const handleToggle = () => {
    if (!started) {
      start();
    } else {
      if (paused) {
        setPaused(false);
      } else {
        setPaused(true);
      }
    }
  }

  const reset = React.useCallback(() => {
    setValueInSeconds(props.seconds);
    setDelta(0);
    setStarted(false);
    setPaused(true);
  }, [props.seconds]);

  const restart = () => {
    setAlarmed(false);
    start();
  }

  React.useMemo(() => {
    if (leftInSeconds === 0) {
      props.onAlarm && props.onAlarm(props.note);
      setAlarmed(true);
      reset();
    }
  }, [leftInSeconds, props, reset]);

  useEffect(() => {
    if (alarmed && props.autoRepeat) {
      restart();
    }
  }, [alarmed, props.autoRepeat, React.useCallback(restart, [])]);

  useEffect(() => {
    const startTime = new Date().getTime();
    setDelta(0);

    if (paused || !started) {
      clearInterval(intervalId);
      setIntervalId(0);
      setValueInSeconds(leftInSeconds)
    } else {
      setIntervalId(setInterval(() => {
        const now = new Date().getTime();
        setDelta(now - startTime);
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

  return (
    <section>
      <p>Timer {leftInSeconds < 0 ? 0 : formatTime(leftInSeconds)}</p>
      <p>
        <button onClick={() => handleToggle()}>{toggleButtonLabel}</button>
        <button onClick={() => reset()}>Reset</button>
      </p>
    </section>
  );
};

export default Timer;
