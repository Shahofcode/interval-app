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
  const [nextView, setNextView] = useState(null); // För den nya vyn
  const [transitioning, setTransitioning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [timeUp, setTimeUp] = useState(false);
  const timer = useRef(new Timer());

  useEffect(() => {
    if (timerDuration > 0) {
      timer.current.start({ countdown: true, startValues: { minutes: timerDuration } });

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
      changeView('analog');
    } else {
      console.error("Ogiltig timer varaktighet. Du måste ställa in minst 1 minut.");
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    changeView('alarm');
  };

  const handleMenuChange = (newView) => {
    changeView(newView);
  };

  const handleAbortTimer = () => {
    timer.current.stop();
    setTime({ minutes: 0, seconds: 0 });
    setTimerDuration(0);
    changeView('set');
  };

  const handleReset = () => {
    timer.current.stop();
    setTime({ minutes: 0, seconds: 0 });
    setTimerDuration(0);
    changeView('set');
  };

  const changeView = (newView) => {
    setTransitioning(true);
    setNextView(newView);

    // Efter 500 ms (fade out) sätts nästa vy
    setTimeout(() => {
      setView(newView);
      setTransitioning(false);
    }, 500);
  };

  return (
    <div className={`App ${transitioning ? 'fade-exit-active' : 'fade-enter-active'}`}>
      {view === 'loading' && <LoadingScreen setView={changeView} />}
      {view === 'set' && (
        <SetTimer 
          onStartTimer={handleStartTimer} 
          onMenuChange={handleMenuChange}  
        />
      )}
      {view === 'analog' && (
        <AnalogTimer
          time={time}  
          onTimeUp={handleTimeUp}
          onMenuChange={handleMenuChange}
          onAbortTimer={handleAbortTimer}  
        />
      )}
      {view === 'digital' && (
        <DigitalTimer
          time={time}  
          onTimeUp={handleTimeUp}
          onMenuChange={handleMenuChange}
          onAbortTimer={handleAbortTimer}  
        />
      )}
      {view === 'alarm' && <AlarmView onReset={handleReset} />}
    </div>
  );
}

export default App;
