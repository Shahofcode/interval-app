import React from 'react';

const LoadingScreen = ({ setView }) => {
  return (
    <div className="loading-screen" onClick={() => setView('set')}>
      <h1>Interval App</h1>
      <p>"For all your timing needs"</p>
    </div>
  );
};

export default LoadingScreen;
