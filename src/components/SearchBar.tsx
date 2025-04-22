import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchLocations } from '../services/weatherService';
import { FiSearch, FiMapPin, FiX } from 'react-icons/fi';
import { debounce } from 'lodash';

interface SearchBarProps {
  onLocationSelect: (coordinates: [number, number], zoomLevel?: number) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) return;
      
      setIsLoading(true);
      try {
        const locations = await searchLocations(searchQuery);
        setResults(locations);
        setIsOpen(true);
        setHighlightedIndex(-1);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    debouncedSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          handleSelectLocation(
            results[highlightedIndex].lat,
            results[highlightedIndex].lon
          );
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSelectLocation = (lat: number, lon: number) => {
    onLocationSelect([lat, lon], 12); // Add zoom level 12 for better view
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-container">
        <FiSearch className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search any location..."
          className="search-input"
          autoComplete="off"
        />
        {query && (
          <button 
            className="clear-button" 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
        {isLoading && (
          <motion.div
            className="search-loading"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⌛
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            className="search-results"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {results.map((result, index) => (
              <motion.button
                key={`${result.lat}-${result.lon}`}
                className={`search-result-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                onClick={() => handleSelectLocation(result.lat, result.lon)}
                onMouseEnter={() => setHighlightedIndex(index)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FiMapPin className="location-icon" />
                <div className="location-info">
                  <span className="location-name">{result.name}</span>
                  <span className="location-detail">
                    {result.state ? `${result.state}, ` : ''}{result.country}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};