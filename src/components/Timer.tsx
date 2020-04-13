import React, { useState, useEffect, FC, useMemo } from "react";
import formatTime from "../lib/formatTime";
import useInterval from "../hooks/useInterval";

export type TimerProps = {
  seconds: number;
  onAlarm?: (note?: string) => void;
  note?: string;
  autoRepeat?: boolean;
};

const Timer: FC<TimerProps> = (props: TimerProps) => {
  const [ paused, setPaused ] = useState(false);
  const [ started, setStarted ] = useState(false);
  const [ startTime, setStartTime ] = useState<number>(0);
  const [ elapsed, setElapsed ] = useState<number>(0);
  const [ lapse, setLapse ] = useState<number>(0);

  const start = () => {
    setStarted(true);
    setPaused(false);
    setStartTime(new Date().getTime());
  };

  const pause = () => {
    setPaused(true);
    const now = new Date().getTime();
    const diff = now - startTime;
    setLapse(lapse + (diff / 1000));
    setElapsed(0);
  };

  const resume = () => {
    setPaused(false);
  }

  const reset = () => {
    setPaused(true);
    setStarted(false);
    setElapsed(0);
    setLapse(0);
  };

  const handleToggle = () => {
    if (!started) {
      start();
    } else {
      if (paused) {
        resume();
      } else {
        pause();
      }
    }
  };


  const { seconds, note, onAlarm } = props;
  const countdown = Math.round(seconds - (lapse + elapsed));
  useMemo(() => {
    if (countdown === 0) {
      onAlarm && onAlarm(note);
      reset();

      if (props.autoRepeat) {
        start();
      }
    }
  }, [countdown, onAlarm, note, props.autoRepeat]);

  useEffect(() => {
  }, [paused, started]);

  useInterval(() => {
    const now = new Date().getTime();
    const diff = now - startTime;
    setElapsed(diff / 1000);
  }, paused || !started || countdown <= 0 ? null : 1000 / 2);

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
      <p>
        {props.autoRepeat && '[R]'}&nbsp;
        {elapsed < 0 ? 0 : formatTime(countdown)}
      </p>
      {note && <p><em>{note}</em></p>}
      <p className="button-wrapper">
        <button onClick={() => handleToggle()}>{toggleButtonLabel}</button>
        <button onClick={() => reset()}>Reset</button>
      </p>
    </section>
  );
};

export default Timer;
