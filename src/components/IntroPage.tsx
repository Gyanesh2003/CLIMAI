import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

interface IntroPageProps {
  onEnter: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = (splineApp: any) => {
    setIsLoaded(true);
    
    // Set initial zoom
    splineApp.setZoom(1.5);
    
    // Add interaction handlers
    splineApp.addEventListener('mouseDown', (e: any) => {
      if (e.target.name === 'Earth') {
        splineApp.setZoom(2);
      }
    });

    splineApp.addEventListener('mouseUp', (e: any) => {
      if (e.target.name === 'Earth') {
        splineApp.setZoom(1.5);
      }
    });

    splineApp.addEventListener('mouseHover', (e: any) => {
      if (e.target.name === 'Earth') {
        splineApp.setZoom(1.8);
      }
    });
  };

  return (
    <div className="intro-page">
      <div className="intro-background">
        <Spline 
          scene="https://prod.spline.design/sk5bOyyGOe8rbM7c/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      <motion.div 
        className="intro-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="intro-text">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Weather Intelligence
            <span className="highlight">Redefined</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Explore global weather patterns with AI precision
          </motion.p>
          <motion.button 
            className="enter-button" 
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Enter</span>
            <FiArrowRight />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}; 