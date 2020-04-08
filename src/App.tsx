import React from 'react';
import './App.css';
import Timer from './components/Timer';
import { Howl } from 'howler';
import notify, { requestNotificationPermission } from './lib/notify';

function App() {
  const audio = new Howl({
    src: '/audio/alarm1.m4a',
    loop: false,
  });

  const handleAlarm = (note?: string) => {
    audio.play();
    notify(note || 'An alarm went off.');
  }

  requestNotificationPermission();

  return (
    <div className="App">
      <Timer seconds={15} onAlarm={handleAlarm} note="Tea is done!" autoRepeat={true} />
      <Timer seconds={30} onAlarm={handleAlarm} />
      <Timer seconds={61} onAlarm={handleAlarm} />
      <Timer seconds={60 * 60 + 1} onAlarm={handleAlarm} />
    </div>
  );
}

export default App;
