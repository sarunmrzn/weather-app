import { useState, useEffect } from "react";
import axios from "axios";

const useHourlyWeatherData = (
  latitude: number | null,
  longitude: number | null
) => {
  const [hourlyData, setHourlyData] = useState<any[]>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHourlyWeatherData = async () => {
      if (latitude !== null && longitude !== null) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?APPID=${process.env.REACT_APP_API_KEY}&lat=${latitude}&lon=${longitude}&units=metric`
          );
          setHourlyData(response.data.list);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch hourly weather data.");
          setLoading(false);
        }
      }
    };

    fetchHourlyWeatherData();
  }, [latitude, longitude]);

  return { hourlyData, error, loading };
};

export default useHourlyWeatherData;
