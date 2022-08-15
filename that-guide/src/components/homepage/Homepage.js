import { useState } from "react";
import {useNavigate } from "react-router-dom";
import Map from "../Map";
import './homepage.css'
import StopWatch from "../stopwatch/watch_display/WatchDisplay";

export default function Homepage() {
  const [distance, setDistance] = useState("");
  const [error, setError] = useState(null);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const navigate = useNavigate()

  const handleSetDistance = (event) => {
    setDistance(event.target.value);
    console.log(event.target.value);

    let chosenDistance = event.target.value
    console.log(chosenDistance)
  };

  const handleStartHike = (event) => {
    navigate("/starthike")
    event.preventDefault();
    
    setError(null);
    console.log("You have started a hike.")
    console.log(distance);
  };

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(latitude);
    console.log(longitude);
  })

  if (latitude==="") {
    return(
      <div>Gathering location data...</div>
    )
  }

  return (
    <>
      {/* <div className="location-header">
        <h3>Current Location: {latitude}, {longitude}
        </h3>
      </div> */}

      <div className="map-and-button"> 
        <div className="homepage-map">
          <Map latitude={latitude} longitude={longitude} />
        </div>
        <button className="pin-return">Return to current location (?)</button>
      </div>

      <div className="hike-starter">
        <div className="current-stats">
          <h3>Current Coordinates: {latitude}, {longitude}</h3>
          <h3>Current Elevation: (list elevation)</h3>
        </div>
        <h2>How far do you want to hike?</h2>
        <form id="select-distance" onSubmit={setDistance}>Select Distance (in miles):</form>
          <input 
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)} />
        <button type="submit" className="start-hike" onClick={handleStartHike} onSubmit={setDistance}>
          Start your hike!
        </button>

      </div>
    </>
  );
}
