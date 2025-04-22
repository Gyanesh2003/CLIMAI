import React from 'react';
import { motion } from 'framer-motion';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiDust
} from 'react-icons/wi';

interface ForecastDay {
  day: string;
  temperature: number;
  condition: string;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WiDaySunny size={32} />;
    case 'clouds':
      return <WiCloudy size={32} />;
    case 'rain':
      return <WiRain size={32} />;
    case 'snow':
      return <WiSnow size={32} />;
    case 'thunderstorm':
      return <WiThunderstorm size={32} />;
    default:
      return <WiDust size={32} />;
  }
};

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="weather-forecast">
      <h2 className="forecast-title">5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="forecast-day"
          >
            <span className="forecast-day-name">{day.day}</span>
            <div className="forecast-icon">
              {getWeatherIcon(day.condition)}
            </div>
            <span className="forecast-temp">{day.temperature}°C</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 