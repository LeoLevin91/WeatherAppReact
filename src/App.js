import React from 'react';
import './App.css';


const API = {
    key: "764a3609f4d2854eddfc57cb22197806",
    path: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  return (
    <div className="App">
        <main>
            <div className={"main-container"}>
                <div className={"search-box"}>
                    <input type="text" className={"text-field search-bar"} placeholder={"Search..."}/>
                </div>
            </div>
        </main>
    </div>
  );
}

export default App;
