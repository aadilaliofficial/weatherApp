import React, { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=21805bff7224936fa25d6cec016a0a4b`;
      const response = await fetch(API);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Weather fetch error:", error);
      setData(null);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <>
      {/* Responsive Background Video */}
      <video id="bg-video" autoPlay muted loop playsInline>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="app">
        <header>
          <h1>
            <i className="fas fa-cloud-sun-rain me-2"></i>Weather App
          </h1>
        </header>

        <main>
          <img src="/temp.png" alt="weather-icon" className="icon-img" />

          <form onSubmit={handleSubmit} className="search-box">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          {loading && <h3 className="loading">Loading...</h3>}

          {data && data.cod === 200 && (
            <div className="weather-card">
              <div className="icon">
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt={data.weather[0].main}
                />
              </div>
              <div className="details">
                <h2>{data.name}</h2>
                <h3>{data.main.temp}°C</h3>
                <p>Humidity: {data.main.humidity}%</p>
                <p>{data.weather[0].main}</p>
              </div>
            </div>
          )}

          {data && data.cod === "404" && (
            <div className="error">City not found. Try again.</div>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
