import React from 'react';
import './App.css';
import Timer from './components/Timer';
import { Howl } from 'howler';

function App() {

  const audio = new Howl({
    src: '/audio/alarm1.m4a',
    loop: false,
  });

  return (
    <div className="App">
      <Timer seconds={15} onAlarm={() => audio.play()} />
      <Timer seconds={30} onAlarm={() => audio.play()} />
    </div>
  );
}

export default App;
