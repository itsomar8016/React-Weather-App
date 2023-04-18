const API_KEY = '5af97d1bdabd1c8aacf798329c484ce0';

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`


const getFormattedWeatherData = async (city,units='metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    const data = await fetch(URL)
                 .then((res) => res.json())
                 .then((data)=> data)
    const {
        weather,
        main: {temp,feels_like,humidity,temp_max,temp_min,pressure},
        wind:{speed},
        sys:{country},
        name
        } = data;

    const {description,icon} = weather[0];
    return {description,iconURL: makeIconURL(icon),temp,feels_like,humidity,temp_max,temp_min,speed,country,name,pressure};
}

export default getFormattedWeatherData;