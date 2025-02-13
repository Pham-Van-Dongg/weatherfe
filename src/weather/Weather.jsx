import axios from "axios";
import { useEffect, useState } from "react";
import Input from "./Input";
import "./weatherStyle.css";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Hanoi"); // Thành phố mặc định
  const [error, setError] = useState(null); // Lưu lỗi nếu có

  useEffect(() => {
    if (!city) return;

    axios
      .get(
        `https://weatherapi-production-7096.up.railway.app/api/weather/current/${city}`
      )
      .then((response) => {
        if (response.data.success === false) {
          setError(response.data.error); // Lưu thông tin lỗi từ API
          setWeather(null);
        } else {
          setWeather(response.data);
          setError(null); // Xóa lỗi nếu gọi API thành công
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
        setError({
          code: "NETWORK_ERROR",
          type: "Lỗi mạng",
          info: "Không thể kết nối đến máy chủ.",
        });
        setWeather(null);
      });
  }, [city]);

  return (
    <div className="weather">
      <div className="weather-container">
        <div className="header">
          <h1 id="word">Dự báo thời tiết</h1>
        </div>

        <Input onSearch={setCity} />

        {/* Hiển thị lỗi nếu có */}
        {error ? (
          <div className="error-message">
            <h2>Lỗi {error.code}</h2>
            <p>{error.type}</p>
            <p>{error.info}</p>
          </div>
        ) : weather ? (
          <div className="weather-info">
            <h2>
              Thời tiết tại {weather.location.name}, {weather.location.country}
            </h2>
            <p>
              <strong>Nhiệt độ:</strong> {weather.current.temperature}°C
            </p>
            <p>
              <strong>Múi giờ:</strong> {weather.location.timezone_id}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              {weather.current.weather_descriptions[0]}
            </p>
            <p>
              <strong>Độ ẩm:</strong> {weather.current.humidity}%
            </p>
            <p>
              <strong>Tốc độ gió:</strong> {weather.current.wind_speed} km/h (
              {weather.current.wind_dir})
            </p>
            <p>
              <strong>Áp suất:</strong> {weather.current.pressure} hPa
            </p>
            <p>
              <strong>Trạng thái: </strong>
              {weather.current.is_day ? "Ban ngày" : "Ban đêm"}
            </p>
            <div className="weather-pictured">
              <p>
                <strong>Hình ảnh</strong>
              </p>
              <img src={weather.current.weather_icons} alt="Weather icon" />
            </div>
          </div>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
