import React, { useState, useRef, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import SetTimer from './components/SetTimer';
import AnalogTimer from './components/AnalogTimer';
import DigitalTimer from './components/DigitalTimer';
import AlarmView from './components/AlarmView';
import Timer from 'easytimer.js';
import './styles/styles.css';  

function App() {
  const [view, setView] = useState('loading');
  const [timerDuration, setTimerDuration] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 }); // Tid för minuter och sekunder
  const [timeUp, setTimeUp] = useState(false);
  const timer = useRef(new Timer());

  useEffect(() => {
    if (timerDuration > 0) {
      timer.current.start({ countdown: true, startValues: { minutes: timerDuration } });

      // Uppdatera minuter och sekunder
      timer.current.addEventListener('secondsUpdated', () => {
        const { minutes, seconds } = timer.current.getTimeValues();
        setTime({ minutes, seconds });
      });

      timer.current.addEventListener('targetAchieved', () => {
        handleTimeUp();
      });
    }

    return () => {
      timer.current.stop();
    };
  }, [timerDuration]);

  const handleStartTimer = (minutes) => {
    if (minutes > 0) {
      setTimerDuration(minutes);
      setView('analog');
    } else {
      console.error("Ogiltig timer varaktighet. Du måste ställa in minst 1 minut.");
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setView('alarm');
  };

  const handleMenuChange = (newView) => {
    setView(newView); // Byt vy (analog eller digital) utan att nollställa timern
  };

  const handleAbortTimer = () => {
    timer.current.stop();  // Stoppa och nollställ timern
    setTime({ minutes: 0, seconds: 0 });
    setTimerDuration(0);
    setView('set');
  };

  const handleReset = () => {
    timer.current.stop();
    setTime({ minutes: 0, seconds: 0 });
    setTimerDuration(0);
    setView('set');
  };

  return (
    <div className="App">
      {view === 'loading' && <LoadingScreen setView={setView} />}
      {view === 'set' && (
        <SetTimer 
          onStartTimer={handleStartTimer} 
          onMenuChange={handleMenuChange}  // Skicka funktionen till SetTimer
        />
      )}
      {view === 'analog' && (
        <AnalogTimer
          time={time}  // Skicka den aktuella tiden till AnalogTimer
          onTimeUp={handleTimeUp}
          onMenuChange={handleMenuChange}
          onAbortTimer={handleAbortTimer}  // Hantera abort av timern
        />
      )}
      {view === 'digital' && (
        <DigitalTimer
          time={time}  // Skicka den aktuella tiden till DigitalTimer
          onTimeUp={handleTimeUp}
          onMenuChange={handleMenuChange}
          onAbortTimer={handleAbortTimer}  // Hantera abort av timern
        />
      )}
      {view === 'alarm' && <AlarmView onReset={handleReset} />}
    </div>
  );
}

export default App;
