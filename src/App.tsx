import React, { useState, useEffect } from 'react';
import { WeatherDashboard } from './components/WeatherDashboard';
import { IntroPage } from './components/IntroPage';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSun, FiMoon, FiMapPin } from 'react-icons/fi';
import './styles/global.css';
import './styles/components.css';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleEnter = () => {
    setShowIntro(false);
    setShowLocationPrompt(true);
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(coords);
          setShowLocationPrompt(false);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setShowLocationPrompt(false);
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  };

  const handleSkipLocation = () => {
    setShowLocationPrompt(false);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}`}>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
      </button>

      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroPage onEnter={handleEnter} />
        ) : (
          <motion.div
            className="app-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="app-header">
              <div className="header-content">
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  ClimAI
                </motion.h1>
                <motion.span 
                  className="header-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  AI-Powered Weather
                </motion.span>
              </div>
            </header>
            <WeatherDashboard initialLocation={userLocation} />

            {/* Location Prompt Modal */}
            <AnimatePresence>
              {showLocationPrompt && (
                <motion.div 
                  className="location-prompt-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div 
                    className="location-prompt"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                  >
                    <FiMapPin size={32} className="location-prompt-icon" />
                    <h2>Enable Location Services</h2>
                    <p>Allow ClimAI to access your location for accurate weather information.</p>
                    <div className="location-prompt-buttons">
                      <button 
                        className="location-allow-button"
                        onClick={handleGetLocation}
                        disabled={isGettingLocation}
                      >
                        {isGettingLocation ? (
                          <span className="loading-dots">Getting Location</span>
                        ) : (
                          'Allow'
                        )}
                      </button>
                      <button 
                        className="location-skip-button"
                        onClick={handleSkipLocation}
                        disabled={isGettingLocation}
                      >
                        Skip
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};