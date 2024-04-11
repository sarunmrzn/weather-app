import { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import { Alert } from "react-bootstrap";

function App() {
  const [state, setState] = useState<{
    lon: number | null;
    lat: number | null;
  }>({
    lon: null,
    lat: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="app">
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <CurrentWeather longitude={state.lon} latitude={state.lat} />
      <HourlyForecast longitude={state.lon} latitude={state.lat} />
    </div>
  );
}

export default App;
