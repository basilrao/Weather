import React, { useEffect, useState } from "react"
import { connect } from "react-redux";
import './App.css';
import humidity from "./img/humidity.png"
import wind from "./img/wind.png"
import weather from "./img/weather.png"

function App(props) {
  const[ccity,setCcity]=useState();
  const [tcity, setTcity] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${props.cname}&units=metric&appid=28a9de704dac4be633433fee29c5c4ed`;
      const res = await fetch(url);
      const data = await res.json();
      setTcity(data.main)
      let d = new Date(new Date().toLocaleString({ timeZone: data.timezone }));
      let ttime = d.toLocaleString(data.timeZone, { hour: 'numeric', minute: 'numeric', hour12: true })
      let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      let tday = days[d.getDay()];
      setCcity(data.name);
      (data.main ? props.changeParams({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        country: data.sys.country,
        wind: data.wind.speed,
        day: tday,
        time: ttime

      }) : console.log("no data found"))


    }
    fetchApi();

  }, [props])


  return (
    <>
      <div className="card">
        <input type="text" placeholder="Enter City" id="text" onChange={(e) => { props.changeCity(e.target.value) }} />
        {(!tcity ? (<p style={{textAlign:"center"}}>No Data Found</p>) : (<>
          <div className="cen">
            <h2 style={{color:"white"}}>{ccity},{props.country}</h2>
            <p style={{color:"white"}}>{props.day}, {props.time}, <strong>{props.description}</strong></p>
            <div className="p">
              <p style={{color:"white"}} className="big">{parseInt(props.temperature)}<sup style={{ fontSize: "50%",color:"white" }}>°C</sup></p>
              <img src={weather} alt="wt"></img>
            </div>
            <div className="o">
              <span><img className="img1" src={humidity} alt="humi"></img><p style={{marginTop:"8%",color:"white"}}>{props.humidity}% Humidity</p></span>
              <span style={{marginLeft:"50%"}}><img className="img2" src={wind} alt="win"></img><p style={{marginLeft:"-15%",marginTop:"8%",color:"white"}}>{props.wind} Km/h Wind </p></span>

            </div>
          </div>

        </>))}

      </div>
    </>
  );



}

const mapStateToProps = (state) => {
  return {
    cname: state.newcity.city,
    temperature: state.otherparam.temperature,
    country: state.otherparam.country,
    day: state.otherparam.day,
    time: state.otherparam.time,
    description: state.otherparam.description,
    humidity:state.otherparam.humidity,
    wind:state.otherparam.wind

  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    changeCity: (name) => {
      dispatch({ type: "CHANGE_NAME", payload: name });

    },
    changeParams: (params) => {

      dispatch({
        type: "CHANGE_PARAMS", payload: {
          country: params.country,
          time: params.time,
          day: params.day,
          temperature: params.temperature,
          description: params.description,
          wind: params.wind,
          humidity: params.humidity
        }
      });

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
