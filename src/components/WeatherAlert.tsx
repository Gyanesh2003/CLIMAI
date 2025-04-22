import React from 'react';
import { motion } from 'framer-motion';
import { WiThunderstorm, WiDayHaze, WiRainMix } from 'react-icons/wi';
import '../styles/components.css';

interface WeatherAlertProps {
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
}

const alertIcons = {
  warning: <WiThunderstorm size={24} />,
  danger: <WiDayHaze size={24} />,
  info: <WiRainMix size={24} />
};

export const WeatherAlert: React.FC<WeatherAlertProps> = ({ type, title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`weather-alert weather-alert-${type}`}
    >
      <div className="weather-alert-icon">
        {alertIcons[type]}
      </div>
      <div className="weather-alert-content">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </motion.div>
  );
}; 