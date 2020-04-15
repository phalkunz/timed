import React, { useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import { Howl } from 'howler';
import notify, { requestNotificationPermission } from './lib/notify';
import formatTime from './lib/formatTime';
import AddTimerForm, { TimerFormData } from './components/AddTimerForm';
import styled from 'styled-components';
import useLocalStorage from './hooks/useLocaleStorage';

interface TimerInterface {
  seconds: number;
  note?: string;
  autoRepeat?: boolean;
};

const StyledTimerWrapper = styled.section`
  position: relative;
  border-bottom: 1px dotted #ccc;
`;

const StyledRemoveButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 100rem;
`;

function App() {
  const audio = new Howl({
    src: '/audio/alarm1.m4a',
    loop: false,
  });
  const [timers, setTimers] = useLocalStorage('REMINDERS', []);

  const handleAlarm = (note?: string) => {
    audio.play();
    notify(note || 'An alarm went off.');
  };

  const handleAddTimer = (data: any) => {
    const updated = [...timers, data];
    setTimers(updated);
  };

  const handleRemoveTimer = (index: number) => {
    if (!window.confirm('Are you sure you want to remove this timer?')) return;
    const updated = timers.filter((timer: any, i: number) => {
      return i !== index;
    });
    setTimers(updated);
  };

  requestNotificationPermission();

  return (
    <div className="App">
      <AddTimerForm onSubmit={handleAddTimer} />
      <hr/>
      {timers.map((timer: any, index: number) => (
        <StyledTimerWrapper>
          <Timer key={index} {...timer} onAlarm={handleAlarm} />
          <StyledRemoveButton
            onClick={() => handleRemoveTimer(index)}
          >
            x
            <span className="sr-only">Remove</span>
          </StyledRemoveButton>
        </StyledTimerWrapper>
      ))}
      {timers.length === 0 &&
        <p className="message message--empty">Start adding a timer!</p>
      }
    </div>
  );
}

export default App;
