import { useState } from "react";
import "./InputStyle.css";

const Input = ({ onSearch }) => {
  const [inputCity, setInputCity] = useState(""); // Dữ liệu nhập từ input

  const handleChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleSearch = () => {
    if (inputCity.trim() !== "") {
      onSearch(inputCity); // Gửi city lên Weather.js
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        value={inputCity}
        onChange={handleChange}
        placeholder="Nhập thành phố..."
      />
      <button className="btn" onClick={handleSearch}>
        Tìm kiếm
      </button>
    </div>
  );
};

export default Input;
