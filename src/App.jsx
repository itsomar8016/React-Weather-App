import { useEffect, useState } from "react";
import "./App.css";

import hotBg from './assets/hot1.jpg';
import coldBg from './assets/cold3.jpg';
import Descriptions from "./components/Descriptions";
import getFormattedWeatherData from "./Service/WeatherService";
function App() {

  const [city,setCity] = useState('Kolkata')
  const [weather, setWeather] = useState(null);
  const [units,setUnits] = useState('metric');
  const [bg,setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city,units);
      setWeather(data);
      console.log(data)

      // dynamic bg
      const threshold = units ==="metric" ? 20 : 60;
      if(data.temp.toFixed() <=threshold){
        setBg(coldBg)
      }
      else{
        setBg(hotBg);
      }
    };
    
    fetchWeatherData();
  }, [units,city]);

  const handleUnitsClick = (event) => {
    const button = event.currentTarget;
    const currentUnit = button.innerText.slice(1);
    
    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? "metric" : "imperial")
  }

  const enterKeyPressed = (e) => {
    if(e.keyCode ===13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterKeyPressed} type="text" placeholder="Enter City..."></input>
              <button onClick={(event) => handleUnitsClick(event)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img
                  src={weather.iconURL}
                  alt="weatherIcon"
                  srcset=""
                />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units==='metric'? "C" : "F" }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
