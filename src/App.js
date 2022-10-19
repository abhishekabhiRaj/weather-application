import React, { useState } from "react";
import dummyData from "./dummy";


const App = () => {
  var date = new Date();
  var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  let day = date.getDay();

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // 
  const [input, setInput] = useState('');
  // GeoLocation
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [fRes, setFRes] = useState(null);
  const [temp, setTemp] = useState(dummyData);


  const getGeoLocation = async () => {
    if (input !== '') {
      await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=9f5c25512e0546e96c01482b18bf921c`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setFRes(result);
            console.log(result);
            console.log(fRes);
            setLat(result[0].lat);
            setLon(result[0].lon);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    } else {
      window.alert("Enter city name first...");
      clearCheckBox();
    }
  }

  const getWeather = async () => {
    var check = document.getElementById('check_input').checked;
    if (check !== false) {
      setLat(fRes[0].lat);
      setLon(fRes[0].lon);
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9f5c25512e0546e96c01482b18bf921c`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result, "getWeather");
            setTemp(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
      clearCheckBox();


    }
    else {
      window.alert('Please confirm the location...')
    }


    // 
    var section = document.getElementById("tempCont");
    if (section.style.display = 'none') {
      section.style.display = 'block';
    }
  }

  var cel = Math.round(temp['list'][0]['main']['temp'] - 273.15);
  var weatherDescription = temp['list'][0]['weather'][0]['description'];

  var nextTemp = [
    {
      temp: Math.round(temp['list'][9]['main']['temp'] - 273.15),
      date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1),
    },
    {
      temp: Math.round(temp['list'][17]['main']['temp'] - 273.15),
      date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 2),
    },
    {
      temp: Math.round(temp['list'][25]['main']['temp'] - 273.15),
      date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 3),
    },
    {
      temp: Math.round(temp['list'][34]['main']['temp'] - 273.15),
      date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 4),
    },
    {
      temp: Math.round(temp['list'][38]['main']['temp'] - 273.15),
      date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 5),
    },
  ]
  // vars


  const clearCheckBox = () => {
    document.getElementById('check_input').checked = false;
  }



  if (temp !== {}) {
    return (
      <>
        <section className="" style={{ backgroundColor: '#0078AA' }}>
          <section className="">
            <div className="container py-5 h-100">

              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-lg-6 col-xl-4">

                  <h3 className="mb-4 pb-2 fw-normal text-white">Check the weather forecast</h3>

                  <div className="input-group rounded mb-3">
                    <input type="search" className="form-control rounded m-1" placeholder="City" aria-label="Search"
                      aria-describedby="search-addon" value={input} onChange={(e) => setInput(e.target.value)} />


                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>
                      <input id="check_input" type="radio" onClick={getGeoLocation} />
                      <label style={{ color: '#fff', marginLeft: '5px' }}>Confirm</label>
                    </span>
                    <a type="button" className="m-1 checkButton mt-3" style={{ width: 'max-content' }} onClick={() => setTimeout(getWeather, 300)}>
                      <span className="input-group-text border-0 fw-bold" id="search-addon">
                        Get Temperature
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="container py-5 h-100 tempCont" id="tempCont" >
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-12 col-xl-10">

                <div className="card shadow-0 border border-dark border-5 text-dark" style={{ borderRadius: '10px' }}>
                  <div className="card-body p-4">

                    <div className="row text-center">
                      <div className="col-md-11 py-4"
                        style={{ marginTop: '-1.5rem', marginBottom: '-1.5rem' }}>
                        <div className="d-flex justify-content-around mt-3">
                          <p className="small text-capital">{input}</p>
                          <p className="small">{current_date}</p>
                          <p className="small">Weather Report</p>
                        </div>
                        <div className="d-flex justify-content-around align-items-center py-5 my-4">
                          <p className="fw-bold mb-0" style={{ fontSize: '7rem' }}> {cel} °C</p>
                          <div className="text-start">
                            {/* <p className="small">{current_time}</p> */}
                            <p className="h3 mb-3">{days[day - 1]}</p>
                            <p className="small mb-0" style={{ textTransform: 'capitalize' }}>{weatherDescription}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-around align-items-center mb-3">
                          <div className="flex-column">
                            <i className="fas fa-minus"></i>
                          </div>
                          {
                            nextTemp.map((value, key) => {
                              return (
                                <div className="flex-column" key={key}>
                                  <p className="small mb-1">{value['date']}</p>
                                  <p className="small mb-0"><strong>{value['temp']}°C</strong></p>
                                </div>
                              );
                            })
                          }
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/*  */}
      </>
    );
  } else {
    <div>Error</div>
  }
}

export default App;