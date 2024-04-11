import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import useHourlyWeatherData from "../hooks/useHourlyForecast";
import WeatherCard from "./WeatherCard";

const CurrentWeather = ({
  longitude,
  latitude,
}: {
  longitude: number | null;
  latitude: number | null;
}) => {
  const { hourlyData, error, loading } = useHourlyWeatherData(
    latitude,
    longitude
  );
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (hourlyData) {
      const now = Date.now();
      const next24Hours = now + 24 * 60 * 60 * 1000;
      const filtered = hourlyData.filter(
        (hourly: any) =>
          hourly.dt * 1000 >= now && hourly.dt * 1000 <= next24Hours
      );
      setFilteredData(filtered);
    }
  }, [hourlyData]);

  return (
    <Container>
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h1>Hourly forecast for next 24 hours:</h1>
          <Row xs={1} md={2} lg={2} xl={3}>
            {filteredData.map((hourly: any, index: number) => (
              <Col className="mb-3" key={index}>
                  <WeatherCard
                    title={new Date(hourly.dt * 1000).toLocaleTimeString([], {
                      hour: "numeric",
                      hour12: true,
                    })}
                    temp={hourly.main.temp}
                    icon={hourly.weather[0].icon}
                    description={hourly.weather[0].description}
                  />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default CurrentWeather;
