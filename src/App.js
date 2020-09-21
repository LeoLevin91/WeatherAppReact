import React, {useEffect, useState} from 'react';
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
    const [weather, setWeather] = useState({});

    const statusResponse = (response) => {
        if(response.status >= 200 && response.status < 300 ){
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    const json = (response) => {
        return response.json();
    }


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
                // .then(res => res.json())
                // .then(result => {
                //     setWeather(result);
                //     setQuery('');
                //     console.log(result);
                // });
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


  return (
    <div className="App">
        <main>
            <div className={"main-container"}>
                <div className={"search-box"}>
                    <input type="text" className={"text-field search-bar"} placeholder={"Search..."}
                           onChange={event => setQuery(event.target.value)}
                           onKeyPress={search}
                           value={query}
                    />
                </div>
            </div>
            <div className={"location-box"}>
                <div className="location">Samara, RU</div>
                <div className="date">{dateFunction(new Date())}</div>
            </div>
            <div className="weather-box">
                <div className="temp">
                    15&#8451;
                </div>
                <div className="weather">
                    Sunny
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;
