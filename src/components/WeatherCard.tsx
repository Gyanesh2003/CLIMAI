import React from 'react';
import { motion } from 'framer-motion';
import { WiThermometer, WiHumidity, WiStrongWind } from 'react-icons/wi';
import '../styles/components.css';

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  location: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  humidity,
  windSpeed,
  condition,
  location,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="weather-card"
    >
      <div className="weather-card-header">
        <h2>{location}</h2>
        <p>{condition}</p>
      </div>
      
      <div className="weather-stats">
        <div className="weather-stat">
          <WiThermometer className="weather-stat-icon" />
          <span className="weather-stat-value">{temperature}°C</span>
          <span className="weather-stat-label">Temperature</span>
        </div>
        
        <div className="weather-stat">
          <WiHumidity className="weather-stat-icon" />
          <span className="weather-stat-value">{humidity}%</span>
          <span className="weather-stat-label">Humidity</span>
        </div>
        
        <div className="weather-stat">
          <WiStrongWind className="weather-stat-icon" />
          <span className="weather-stat-value">{windSpeed} m/s</span>
          <span className="weather-stat-label">Wind Speed</span>
        </div>
      </div>
    </motion.div>
  );
};

interface WeatherStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const WeatherStat: React.FC<WeatherStatProps> = ({ icon, value, label }) => (
  <div className="weather-stat">
    <div className="weather-stat-icon">{icon}</div>
    <div className="weather-stat-value">{value}</div>
    <div className="weather-stat-label">{label}</div>
  </div>
); 