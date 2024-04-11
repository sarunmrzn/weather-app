import { useState, useEffect } from "react";
import axios from "axios";

const useCurrentWeatherData = (
  latitude: number | null,
  longitude: number | null
) => {
  const [weatherData, setWeatherData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (latitude !== null && longitude !== null) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?APPID=${process.env.REACT_APP_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`
          );
          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch weather data.");
          setLoading(false);
        }
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return { weatherData, error, loading };
};

export default useCurrentWeatherData;
