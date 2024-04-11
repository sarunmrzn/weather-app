import { Alert, Container } from "react-bootstrap";
import useCurrentWeatherData from "../hooks/useCurrentWeatherData";
import WeatherCard from "./WeatherCard";

const CurrentWeather = ({
  longitude,
  latitude,
}: {
  longitude: number | null;
  latitude: number | null;
}) => {
  const { weatherData, error, loading } = useCurrentWeatherData(
    latitude,
    longitude
  );

  return (
    <Container>
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {loading ? (
        <span>Loading...</span>
      ) : weatherData ? (
        <>
          <h1>Current:</h1>
          <WeatherCard
            temp={weatherData.main.temp}
            humidity={weatherData.main.humidity}
            speed={weatherData.main.speed}
            icon={weatherData.weather[0].icon}
            description={weatherData.weather[0].description}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default CurrentWeather;
