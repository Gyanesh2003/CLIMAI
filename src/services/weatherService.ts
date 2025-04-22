const API_KEY = '77eb0ff2a8fe8960adf7258575c7eceb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
  }>;
}

interface LocationResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const searchLocations = async (query: string): Promise<LocationResult[]> => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Location search failed');
    }

    const data: LocationResult[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
};

export const fetchWeatherData = async (coordinates: string) => {
  try {
    const [lat, lon] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Weather API Error:', errorData);
      throw new Error(`Weather data fetch failed: ${errorData.message || response.statusText}`);
    }

    const data: WeatherResponse = await response.json();
    
    return {
      weatherData: {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        location: data.name,
        time: new Date().toLocaleTimeString()
      },
      forecastData: [] // Will be filled by fetchForecastData
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchForecastData = async (coordinates: string) => {
  try {
    const [lat, lon] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Forecast API Error:', errorData);
      throw new Error(`Forecast data fetch failed: ${errorData.message || response.statusText}`);
    }

    const data: ForecastResponse = await response.json();
    
    // Get one forecast per day for the next 5 days
    const dailyForecasts = data.list
      .filter((item, index) => index % 8 === 0) // Get one reading per day (every 24 hours)
      .slice(0, 5) // Get only 5 days
      .map(item => ({
        day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main
      }));

    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}; 