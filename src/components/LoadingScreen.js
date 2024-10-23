import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

const LoadingScreen = ({ setView }) => {
  const handleClick = () => {
    setView('set'); // Växla till SetTimer-vyn
  };

  return (
    <div className="loading-screen" onClick={handleClick}>
      <motion.img
        src={logo}
        alt="Interval Logo"
        className="logo"
        whileHover={{ scale: 1.1 }}
      />
      <h1 className="title">INTERVAL</h1>
      <h2 className="subtitle">For all your timing needs</h2>
    </div>
  );
};

export default LoadingScreen;
