import React, { useEffect, useState } from "react";
import "./App.css";
import hotImage from "./assets/hot.jpg";
import coldImage from "./assets/cold.jpg";
import minImage from "./assets/min.png";
import maxImage from "./assets/max.png";
import humidityImage from "./assets/humidity.png";
import windImage from "./assets/wind.png";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [city, setCity] = useState("mysore");
  const [data, setData] = useState("");

  const API = process.env.REACT_APP_API_KEY;
  const URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const name = e.target.value;
    setCity(name);
  };

  const handleSubmit = async () => {
    const res = await fetch(URL + city + "&APPID=" + API, {
      method: "GET",
    });

    const data = await res.json();

    if (res.status === 200) {
      setData(data);
      setCity("");
    }
    else{
      toast.error(data.message, {
        position: "top-center",
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Search City"
            value={city}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {data ? (
        <>
          <div className="container">
            <div className="upper-data">
              {Math.round(data.main.temp - 273.15) > 15 ? (
                <img src={hotImage} alt="hotimg" />
              ) : (
                <img src={coldImage} alt="coldimg" />
              )}
              <div className="weather-data">
                <div className="location">{data.name}</div>
                <div className="temperature">
                  {" "}
                  {Math.round(data.main.temp - 273.15)}°C{" "}
                </div>
              </div>
            </div>
            <div className="lower-data">
              <div className="more-info-label">More Information</div>
              <div className="more-info-container">
                <div className="info-block">
                  <div className="info-block-label">
                    <img src={minImage} alt="minimg" />
                    <span>min</span>
                  </div>
                  <div className="info-block-value">
                    {Math.round(data.main.temp_min - 273.15)}°C
                  </div>
                </div>

                <div className="info-block">
                  <div className="info-block-label">
                    <img src={maxImage} alt="maximg" />
                    <span>max</span>
                  </div>
                  <div className="info-block-value">
                    {Math.round(data.main.temp_max - 273.15)}°C
                  </div>
                </div>

                <div className="info-block">
                  <div className="info-block-label">
                    <img src={humidityImage} alt="humidityimg" />
                    <span>humidity</span>
                  </div>
                  <div className="info-block-value">{data.main.humidity}%</div>
                </div>

                <div className="info-block">
                  <div className="info-block-label">
                    <img src={windImage} alt="windimg" />
                    <span>wind</span>
                  </div>
                  <div className="info-block-value">
                    {Math.round(data.wind.speed)} km/h
                  </div>
                </div>
              </div>
            </div>
            < ToastContainer/>
          </div>
        </>
      ) : (
        " "
      )}
    </>
  );
};

export default App;
