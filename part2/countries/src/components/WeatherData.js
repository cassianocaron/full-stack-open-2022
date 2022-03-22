import { useEffect, useState } from "react";
import axios from "axios";

const WeatherData = ({ city }) => {
  const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <div>Temperature {weather.main.temp}°C</div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  );
};

export default WeatherData;
