import React, { useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import { Howl } from 'howler';
import notify, { requestNotificationPermission } from './lib/notify';
import formatTime from './lib/formatTime';
import AddTimerForm from './components/AddTimerForm';

interface TimerInterface {
  seconds: number;
  note?: string;
  autoRepeat?: boolean;
};

function App() {
  const audio = new Howl({
    src: '/audio/alarm1.m4a',
    loop: false,
  });
  const [timers, setTimers] = useState<TimerInterface[]>([]);
  const [formSeconds, setFormSeconds] = useState<any>('');
  const [formAutoRepeat, setFormAutoRepeat] = useState<boolean>(false);

  const handleAlarm = (note?: string) => {
    audio.play();
    notify(note || 'An alarm went off.');
  };

  const handleAddTimer = (data: any) => {
    setTimers([...timers, data]);
  };

  const handleRemoveTimer = (index: number) => {
    setTimers(timers.filter((timer: any, i: number) => {
      return i !== index;
    }));
  };

  requestNotificationPermission();

  return (
    <div className="App">
      <AddTimerForm onSubmit={handleAddTimer} />
      <hr/>
        {timers.map((timer: any, index: number) => (
          <div>
            <Timer key={index} {...timer} onAlarm={handleAlarm} />
            <button onClick={() => handleRemoveTimer(index)}>Remove</button>
          </div>
        ))}
    </div>
  );
}

export default App;
