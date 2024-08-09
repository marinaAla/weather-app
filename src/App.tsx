import React, {useState} from 'react';
import './App.css';
import Weather from './Weather';

function App() {
    const [city, setCity] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [weather, setWeather] = useState<{temp: number, description: string} | null>(null);

    const fetchWeather = () => {
        const APIkey = 'e3af2a8095b01da13a679b87bd74a432';
        console.log(error);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                setError('City not found');
                setWeather(null);
            } else {
                setWeather({
                    temp: json.main.temp,
                    description: json.weather[0].description
                })
                setError(null);
            }
        })
        .catch(error => {
            console.error('Ошибка: ', error);
            setError('An error occurred')
        })
    }
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    // 
    return (
        <div className="App">
            <h1>Weather App</h1>
            <div>
                <input type="text" onChange={(e) => setCity(e.currentTarget.value)} value={city}/>
                <button onClick={fetchWeather}>Get Weather</button>
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
            {weather && <Weather temp={weather.temp} description={weather.description}></Weather>}
        </div>
    );
}

export default App;