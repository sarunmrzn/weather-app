const WeatherCard = ({
  title,
  temp,
  humidity,
  speed,
  icon,
  description,
}: {
  title?: string;
  temp: string;
  humidity?: string;
  speed?: string;
  icon: string;
  description: string;
}) => (
  <div className="weather-card">
    {title && <h2 className="mb-3">{title}</h2>}
    {humidity && <p className="mb-2">Humidity: {humidity}%</p>}
    {speed && <p className="mb-2">Wind Speed: {speed} m/s</p>}
    <p className="mb-2">Temperature: {temp}°C</p>
    <div className="weather-details">
      Weather:{" "}
      {description}
    </div>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt="Weather Icon"
        className="weather-icon mb-2"
      />{" "}
  </div>
);

export default WeatherCard;
