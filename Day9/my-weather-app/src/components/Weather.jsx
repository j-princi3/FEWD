import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Use environment variable for API key
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError('');
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather Forecast</h2>
      <div className="input-group">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-data">
          <h3>{weatherData.name}</h3>
          <div className="weather-info">
            <p>
              <strong>Temperature:</strong> {weatherData.main.temp}°C
            </p>
            <p>
              <strong>Weather:</strong> {weatherData.weather[0].description}
            </p>
          </div>
          <div className="widget-grid">
            <div className="widget">
              <p><strong>Humidity</strong></p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="widget">
              <p><strong>Wind Speed</strong></p>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
