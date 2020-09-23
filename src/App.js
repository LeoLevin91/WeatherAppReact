import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Icon from '@mdi/react'
import { mdiWeatherCloudy } from '@mdi/js';
import { mdiWeatherWindy } from '@mdi/js';
import './App.css';


const API = {
    key: "764a3609f4d2854eddfc57cb22197806",
    path: "https://api.openweathermap.org/data/2.5/"
}


function App() {
    /*
    * -> Получаем данные из строки поиска (при нажатии на Enter)
    * -> Формируем запрос через fetch
    * -> Получаем ответ от сервера и разпарсиваем его (в случае bad-request-а выводим номер ошибки)
    * */


    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({
        name: "Your city",
        sys: {
            country: "Your country"
        },
        main: {
            temp: 0,
            feels_like: 0,
            humidity: 0,
            pressure: 0
        },
        clouds: {
            all: ""
        },
        weather: {
            0: {
                main: "",
                description: ""
            }
        },
        wind: {
            speed: 0
        }
    });
    const[classNamee, setClasseName] = useState("text-field search-bar");

    const statusResponse = (response) => {
        if(response.status >= 200 && response.status < 300 ){
            return Promise.resolve(response);
        } else {
            // return
            // return Promise.reject(
            //     setClasseName("text-field search-bar error")
            // );
            setClasseName("text-field search-bar error");
            return Promise.reject(new Error(response.statusText))

        }
    }

    const json = (response) => {
        return response.json();
    }

    useEffect(() => {
        /*
        * Для того что бы функция отработала при старте страницы 1 раз
        * нужно в конце функции указать [null]
        * */
            fetch(`${API.path}weather?q=Moscow,RU&units=metric&APPID=${API.key}`)
                .then(statusResponse)
                .then(json)
                .then(result => {
                    setWeather(result);
                    console.log(result);
                })
    }, [null]);


    const search = (evenT) => {
        if(evenT.key === "Enter"){
            fetch(`${API.path}weather?q=${query}&units=metric&APPID=${API.key}`)
                .then(statusResponse)
                .then(json)
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                })
        }
    }


    const dateFunction = (date) => {
        try{
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


            let day = date.getDay();
            let dateOne = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();

            return `${days[day]} ${dateOne} ${months[month]} ${year}`

        } catch  (e) {
            return "Some problem :)"
        }
    }

    // Фоновое изображение зависящее от температуры
    let classname = (weather.main.temp >= 16) ? "App warm" : "App";

  return (
    <div className={classname}>
        <main>
            <div className={"main-container"}>
                <div className={"search-box"}>
                    <input type="text" className={classNamee} placeholder={"Moscow, RU"}
                           onChange={event => setQuery(event.target.value)}
                           onKeyPress={search}
                           value={query}
                    />
                </div>
            </div>
            <div className={"location-box"}>
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateFunction(new Date())}</div>
            </div>
            <div className="weather-box">
                <div className="temp">
                    {Math.round(weather.main.temp)}&#8451;
                </div>
                {/*<div className="weather">*/}
                {/*    Sunny*/}
                {/*</div>*/}
            </div>
            <Grid container className={"addition-weather-box"} spacing={1} >
                <Grid sm={2} item className={"item feels-like"}>
                    <p>Temp feels like:</p>
                    <p>{weather.main.feels_like}</p>
                </Grid>
                <Grid sm={2} item  className={"item humidity"}>
                    <p>Humidity</p>
                    <p>{weather.main.humidity} %</p>
                </Grid>
                <Grid sm={2} item className={"item pressure"}>
                    <p>Pressure</p>
                    <p>{weather.main.pressure}</p>
                </Grid>
                <Grid sm={2} item  className={"item clouds"}>
                    <Icon path={mdiWeatherCloudy}
                          size={4}
                    />
                    <p>{weather.clouds.all} %</p>
                </Grid>
                <Grid sm={2} item className={"item weatherClo"}>
                    <p>Weather is:</p>
                    <p>{weather.weather["0"].main},</p>
                    <p>({weather.weather["0"].description})</p>
                </Grid>
                <Grid sm={2} item className={"item wind"}>
                    <Icon path={mdiWeatherWindy}
                          size={4}
                    />
                    <p>{weather.wind.speed} m/s</p>
                </Grid>
            </Grid>
        </main>
    </div>
  );
}

export default App;
