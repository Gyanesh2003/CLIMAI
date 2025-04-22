import React, { useState, useEffect } from 'react';
import { InteractiveMap } from './InteractiveMap';
import { WeatherCard } from './WeatherCard';
import { WeatherAlert } from './WeatherAlert';
import { WeatherForecast } from './WeatherForecast';
import { fetchWeatherData, fetchForecastData, searchLocations } from '../services/weatherService';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  time: string;
}

interface ForecastDay {
  day: string;
  temperature: number;
  condition: string;
}

interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface WeatherDashboardProps {
  initialLocation?: [number, number] | null;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ initialLocation }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(initialLocation || null);
  const [alerts, setAlerts] = useState<Array<{
    type: 'warning' | 'danger' | 'info';
    title: string;
    message: string;
  }>>([]);

  useEffect(() => {
    if (initialLocation) {
      handleLocationSelect(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Update theme when dark mode changes
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleLocationSelect = async (coordinates: [number, number], zoomLevel?: number) => {
    setIsLoading(true);
    setError(null);
    setSelectedLocation(coordinates);
    
    try {
      console.log('Fetching weather data for coordinates:', coordinates);
      const coordString = coordinates.join(',');
      
      // Fetch both weather and forecast data
      const [{ weatherData }, forecastData] = await Promise.all([
        fetchWeatherData(coordString),
        fetchForecastData(coordString)
      ]);
      
      console.log('Weather data received:', weatherData);
      console.log('Forecast data received:', forecastData);
      
      setWeatherData(weatherData);
      setForecastData(forecastData);
      
      // Generate alerts based on weather conditions
      const newAlerts: Array<{
        type: 'warning' | 'danger' | 'info';
        title: string;
        message: string;
      }> = [];
      
      if (weatherData.temperature > 30) {
        newAlerts.push({
          type: 'warning' as const,
          title: 'Heat Warning',
          message: 'High temperatures expected. Stay hydrated and avoid prolonged sun exposure.'
        });
      }
      if (weatherData.windSpeed > 30) {
        newAlerts.push({
          type: 'danger' as const,
          title: 'Strong Winds',
          message: 'High wind speeds detected. Secure outdoor objects and be cautious.'
        });
      }
      if (weatherData.humidity > 80) {
        newAlerts.push({
          type: 'info' as const,
          title: 'High Humidity',
          message: 'Humidity levels are high. Consider using air conditioning or dehumidifier.'
        });
      }
      setAlerts(newAlerts);

      // Scroll to weather section
      const weatherSection = document.querySelector('.weather-section');
      if (weatherSection) {
        weatherSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchLocations(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching locations:', error);
      setError('Failed to search locations. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationClick = async (location: Location) => {
    setSearchQuery('');
    setSearchResults([]);
    await handleLocationSelect([location.lat, location.lon], 12);
  };

  return (
    <main className="app-main">
      <div className="theme-toggle-container">
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="search-container">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search any location..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchQuery && (
            <FaTimes
              className="clear-icon"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
            />
          )}
          {isSearching && <div className="loading-indicator-small" />}
        </div>
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((location, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleLocationClick(location)}
              >
                <span className="location-name">{location.name}</span>
                <span className="location-country">
                  {location.state ? `${location.state}, ` : ''}{location.country}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <motion.div 
        className="map-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <InteractiveMap onLocationSelect={handleLocationSelect} />
      </motion.div>

      {isLoading && (
        <motion.div 
          className="loading-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="loading-spinner" />
          Loading weather data...
        </motion.div>
      )}

      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div 
        className={`weather-section ${isLoading ? 'loading' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {weatherData && (
          <>
            <WeatherCard
              temperature={weatherData.temperature}
              humidity={weatherData.humidity}
              windSpeed={weatherData.windSpeed}
              condition={weatherData.condition}
              location={weatherData.location}
            />
            <WeatherForecast forecast={forecastData} />
          </>
        )}
      </motion.div>

      <motion.div 
        className="alerts-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {alerts.map((alert, index) => (
          <WeatherAlert
            key={index}
            type={alert.type}
            title={alert.title}
            message={alert.message}
          />
        ))}
      </motion.div>
    </main>
  );
}; 