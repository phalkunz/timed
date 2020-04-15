import React, { useState, useEffect, FC, useMemo } from "react";
import formatTime from "../lib/formatTime";
import useInterval from "../hooks/useInterval";
import styled from 'styled-components';

const TimerDisplayWrapper = styled.p`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0;
`;

const TimerDisplay = styled.span`
  font-family: var(--font-family-code);
  font-size: 1.3rem;
  color: #333;
`;

const RepeatIndicator = styled.span`
  font-size: 0.6rem;
  border: 1px solid #aaa;
  color: #aaa;
  border-radius: 0.3rem;
  padding: 0.2rem 0.4rem;
  margin-right: 0.5rem;
`;

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
      <TimerDisplayWrapper>
        {props.autoRepeat && <RepeatIndicator>Repeat</RepeatIndicator>}&nbsp;
        <TimerDisplay>{elapsed < 0 ? 0 : formatTime(countdown)}</TimerDisplay>
      </TimerDisplayWrapper>
      {note && <p><em>{note}</em></p>}
      <p className="button-wrapper">
        <button onClick={() => handleToggle()}>{toggleButtonLabel}</button>
        <button onClick={() => reset()}>Reset</button>
      </p>
    </section>
  );
};

export default Timer;
