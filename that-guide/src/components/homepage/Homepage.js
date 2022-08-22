import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";
import "./homepage.css";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import Button from "@mui/material/Button";
import LoadingScreen from "react-loading-screen"
import TextField from '@mui/material/TextField';

export default function Homepage({
  selectedDistance,
  setSelectedDistance,
  latitude,
  longitude,
}) {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSetDistance = (event) => {
    setSelectedDistance(event.target.value);
    console.log(event.target.value);
  };

  const handleStartHike = (event) => {
    navigate("/starthike");
    event.preventDefault();
    setError(null);
    console.log("You have started a hike.");
    console.log(selectedDistance);
  };

  if (latitude === "") {
    return (
      <LoadingScreen 
      loading={true}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Gathering location data for the Thru Hiker's Appalachian Trail Guide..."
        />

    )
  }

  return (

    <>
    <div className = "load-screen">
      <h4 className="options">Option 1: Select a Goal Destination</h4>
      <div className="map-and-button">
        <div id="map">
          <Map latitude={latitude} longitude={longitude} />
        </div>
      </div>
      <h4 className="options">Option 2: Select a Travel Distance</h4> 
      <div className="hike-starter">

        <h2>How far do you want to hike?</h2>
        <form id="select-distance" onSubmit={setSelectedDistance}>
          Select Distance (in miles):
        </form>
        <div className="hike-starter-container">
        <TextField 
            label="Type distance" 
            style={{
              borderRadius: 10,
              backgroundColor: "white",
              fontSize: "12px",
              margin: "15px"}}
              id="filled-basic" 
              variant="filled"
            onChange={(e) => setSelectedDistance(e.target.value)}/>
        <Button
        style={{
          borderRadius: 35,
          backgroundColor: "#21b6ae",
          padding: "10px",
          fontSize: "12px",
          margin: "10px"
      }}
          variant="contained"
          type="submit"
          className="start-hike"
          onClick={handleStartHike}
          onSubmit={handleSetDistance}
        >

          Set distance
        </Button>
        </div>
        </div>
      </div>
    </>
  );
}
