import React, { useEffect, useState } from 'react'
import axios from 'axios';
import logo from './weather-icon.png'
import './App.css'

function App() {
  const [weather, setweather] = useState({});
  const [value, setvalue] = useState('')
  const [coordinates, setcoordinates] = useState({
    latitude: '',
    longitude: ''
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      coordinates.latitude = position.coords.latitude
      coordinates.longitude = position.coords.longitude
      setcoordinates({ ...coordinates })

      axios(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=771d0d5e791ad933891fd0e6fe0838ef&units=metric`)
        .then(data => {
          setweather(data.data)
        })
    })

  })

  const getData = () => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=771d0d5e791ad933891fd0e6fe0838ef&units=metric`)
      .then(data => {
        setweather(data.data)
      })
    document.getElementById('input').value=null;
  }

  return (
    <div className='container-fluid bg-dark' style={{ height: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center pt-5" >
          <div className="col-md-5 col-11 border border-dark rounded d-flex flex-column text-center justify-content-center  py-3" style={{ boxShadow: '0px 0px 20px white', backgroundColor: '#e8dcff', height:'85vh' }}>
            <div><img src={logo} alt="" className='mb-4' style={{ width: '80px' }} /></div>
            <div className="input-group mb-3 px-2">
              <input type="text" className="form-control" placeholder="City Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setvalue(e.target.value)} id='input'/>
              <button className="btn btn-primary" type="button" id="button-addon2" onClick={getData}>Check</button>
            </div>

            {
              weather.base === undefined ? <div className="spinner-border text-primary ms-auto me-auto my-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> : <div><div><span className='name fs-3'>{weather.name},{weather.sys.country}</span></div>
                <div><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" /></div>
                <div><h3 className='name'>{weather.weather[0].main}</h3></div>
                <div><h3>{weather.main.temp} <sup>o</sup>C</h3></div>
                <div className='mt-3'><span className='fs-5'>Min - {weather.main.temp_max}</span> <span className='fs-5'>Max - {weather.main.temp_min}</span></div>
                <div><span className='fs-5'><i className="fa-solid fa-wind mt-3"></i> {weather.wind.speed} m/s</span></div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
