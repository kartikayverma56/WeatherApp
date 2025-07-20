import React, { useState, useEffect } from "react";

const WeatherWidget = () => {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "b375df7704694e465ac1916bcec6d268";

  
  const fetchWeather = async (cityName) => {
  setLoading(true);
  setError("");
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    setWeatherData(data);
  } catch (err) {
    setError(err.message);
    setWeatherData(null);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchWeather("Jaipur");
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div style={styles.widget}>
      <h2 style={styles.title}>🌤️ Weather Widget</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {weatherData && (
        <div style={styles.dataBox}>
          <h3>{weatherData.name}</h3>
          <p>🌡️ Temp: {weatherData.main.temp}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>⛅ Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  widget: {
    maxWidth: "350px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#f5f7fa",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px 0 0 4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "8px 12px",
    fontSize: "14px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "0 4px 4px 0",
  },
  loading: {
    color: "#888",
  },
  error: {
    color: "red",
  },
  dataBox: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};

export default WeatherWidget;
