import React, { useState, useEffect } from 'react';
import { Map, ZoomControl, Marker } from 'pigeon-maps';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiStrongWind } from 'react-icons/wi';
import '../styles/components.css';

interface WeatherMarkerProps {
  coordinates: [number, number];
  weather: string;
}

const WeatherMarker: React.FC<WeatherMarkerProps> = ({ coordinates, weather }) => {
  const getWeatherIcon = () => {
    switch (weather.toLowerCase()) {
      case 'rain':
        return <WiRain size={24} color="#4A90E2" />;
      case 'sunny':
        return <WiDaySunny size={24} color="#F5A623" />;
      default:
        return <WiStrongWind size={24} color="#9B9B9B" />;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Marker 
        width={50}
        anchor={coordinates}
      >
        <div className="weather-marker">
          {getWeatherIcon()}
        </div>
      </Marker>
    </motion.div>
  );
};

interface InteractiveMapProps {
  onLocationSelect: (coordinates: [number, number], zoomLevel?: number) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onLocationSelect }) => {
  const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center
  const [zoom, setZoom] = useState(5);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  const handleClick = ({ latLng }: { event: MouseEvent; latLng: [number, number]; pixel: [number, number] }) => {
    setSelectedLocation(latLng);
    setCenter(latLng);
    setZoom(12);
    onLocationSelect(latLng, 12);
  };

  // Function to update map position
  const updateMapPosition = (newCenter: [number, number], newZoom: number) => {
    setCenter(newCenter);
    setZoom(newZoom);
    setSelectedLocation(newCenter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="map-container"
    >
      <Map
        height={400}
        center={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
        onClick={handleClick}
        animate={true}
      >
        <ZoomControl />
        {selectedLocation && (
          <WeatherMarker
            coordinates={selectedLocation}
            weather="default"
          />
        )}
      </Map>
    </motion.div>
  );
}; 