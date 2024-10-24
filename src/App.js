import React, { useState, useRef, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import SetTimer from './components/SetTimer';
import AnalogTimer from './components/AnalogTimer';
import DigitalTimer from './components/DigitalTimer';
import AlarmView from './components/AlarmView';
import Timer from 'easytimer.js';  // Importerar EasyTimer.js-biblioteket för tidshantering
import './styles/styles.css';  // Importerar applikationens stilblad

function App() {
  const [view, setView] = useState('loading');  // Hanterar vilken vy som visas (loading, set, analog, digital, alarm)
  const [timerDuration, setTimerDuration] = useState(0);  // Sparar timerlängden i minuter
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });  // Sparar nuvarande tid i minuter och sekunder
  const [timeUp, setTimeUp] = useState(false);  // Sparar status för om tiden är slut
  const timer = useRef(new Timer());  // Skapar en referens till en ny instans av EasyTimer

  // Effekt för att starta och hantera timern när timerDuration ändras
  useEffect(() => {
    if (timerDuration > 0) {
      timer.current.start({ countdown: true, startValues: { minutes: timerDuration } });

      // Uppdaterar tiden varje sekund och lagrar den i state
      timer.current.addEventListener('secondsUpdated', () => {
        const { minutes, seconds } = timer.current.getTimeValues();
        setTime({ minutes, seconds });
      });

      // Hanterar när timern når 0
      timer.current.addEventListener('targetAchieved', () => {
        handleTimeUp();
      });
    }

    // Stänger av timern och rensar eventuella timerhändelser när komponenten monteras av eller när duration ändras
    return () => {
      timer.current.stop();
    };
  }, [timerDuration]);  // Effekt körs när timerDuration ändras

  // Funktion för att starta timern och byta till analog vy
  const handleStartTimer = (minutes) => {
    if (minutes > 0) {
      setTimerDuration(minutes);  // Sätter den valda tiden
      setView('analog');  // Växlar till analog vy
    } else {
      console.error("Ogiltig timer varaktighet. Du måste ställa in minst 1 minut.");
    }
  };

  // När timern når 0, växla till alarmvyn
  const handleTimeUp = () => {
    setTimeUp(true);  // Sätter flaggan för att tiden är slut
    setView('alarm');  // Växlar till alarmvy
  };

  // Hanterar vybyten via menyn utan att nollställa timern
  const handleMenuChange = (newView) => {
    setView(newView);  // Byter vy till analog eller digital timer
  };

  // Nollställer timern och går tillbaka till setTimer-vyn
  const handleAbortTimer = () => {
    timer.current.stop();  // Stoppar timern
    setTime({ minutes: 0, seconds: 0 });  // Nollställer tiden
    setTimerDuration(0);  // Nollställer timerlängden
    setView('set');  // Växlar till setTimer-vyn
  };

  // Återställning av timern från alarmvyn till setTimer-vyn
  const handleReset = () => {
    timer.current.stop();  // Stoppar timern
    setTime({ minutes: 0, seconds: 0 });  // Nollställer tiden
    setTimerDuration(0);  // Nollställer timerlängden
    setView('set');  // Växlar till setTimer-vyn
  };

  return (
    <div className="App">
      {/* Renderar olika vyer baserat på den aktuella 'view'-statusen */}
      {view === 'loading' && <LoadingScreen setView={setView} />}  {/* Laddningsskärm */}
      {view === 'set' && (
        <SetTimer 
          onStartTimer={handleStartTimer}  // Skickar funktionen för att starta timern
          onMenuChange={handleMenuChange}  // Skickar funktionen för att byta vy via menyn
        />
      )}
      {view === 'analog' && (
        <AnalogTimer
          time={time}  // Skickar nuvarande tid till AnalogTimer-komponenten
          onTimeUp={handleTimeUp}  // Skickar funktionen som hanterar när timern går ut
          onMenuChange={handleMenuChange}  // Skickar funktionen för att byta vy via menyn
          onAbortTimer={handleAbortTimer}  // Skickar funktionen för att stoppa och nollställa timern
        />
      )}
      {view === 'digital' && (
        <DigitalTimer
          time={time}  // Skickar nuvarande tid till DigitalTimer-komponenten
          onTimeUp={handleTimeUp}  // Skickar funktionen som hanterar när timern går ut
          onMenuChange={handleMenuChange}  // Skickar funktionen för att byta vy via menyn
          onAbortTimer={handleAbortTimer}  // Skickar funktionen för att stoppa och nollställa timern
        />
      )}
      {view === 'alarm' && <AlarmView onReset={handleReset} />}  {/* Alarmvy */}
    </div>
  );
}

export default App;
