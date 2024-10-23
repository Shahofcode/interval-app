import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import SetTimer from './components/SetTimer';
import AnalogTimer from './components/AnalogTimer';
import DigitalTimer from './components/DigitalTimer';
import AlarmView from './components/AlarmView';
import './styles/styles.css';  

function App() {
  const [view, setView] = useState('loading');
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  const handleStartTimer = (minutes) => {
    setTimerDuration(minutes);
    setView('analog');  // Byt till analog timer när timern startar
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setView('alarm');
  };

  const handleMenuChange = (newView) => {
    setView(newView);  // Hantera vyväxling från menyn
  };

  return (
    <div className="App">
      {view === 'loading' && <LoadingScreen setView={setView} />}
      {view === 'set' && <SetTimer onStartTimer={handleStartTimer} onMenuChange={handleMenuChange} />}
      {view === 'analog' && (
        <AnalogTimer
          duration={timerDuration}
          onTimeUp={handleTimeUp}
          onMenuChange={handleMenuChange}
        />
      )}
      {view === 'digital' && (
        <DigitalTimer
          duration={timerDuration}
          onTimeUp={handleTimeUp}
          onMenuChange={handleMenuChange}
        />
      )}
      {view === 'alarm' && <AlarmView onReset={() => setView('set')} />}
    </div>
  );
}

export default App;
