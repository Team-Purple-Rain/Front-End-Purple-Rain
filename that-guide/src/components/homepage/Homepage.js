import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";
import "./homepage.css";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import Button from "@mui/material/Button";
import LoadingScreen from "react-loading-screen";
import TextField from "@mui/material/TextField";

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
    if (selectedDistance) {
      console.log(selectedDistance);
    } else {
      console.log("user chose not to track distance");
      console.log(selectedDistance);
    }
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
    );
  }

  return (
    <>
      <div className="load-screen">
        <h4 className="options">Current Location</h4>
        <div className="map-and-button">
          <div id="map">
            <Map latitude={latitude} longitude={longitude} />
          </div>
        </div>
        <h4 className="options">What is your goal for this hike?</h4>
        <div className="hike-starter">
          <div>
            <h2>I just want to hike!</h2>
            <p>
              {" "}
              selecting this option will start tracking a hike without a goal
              distance. hiking results will only be shown after pressing "Stop
              Hike"
            </p>
          </div>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#21b6ae",
              padding: "10px",
              fontSize: "12px",
              margin: "10px",
            }}
            variant="contained"
            type="submit"
            className="start-hike"
            onClick={handleStartHike}
          >
            {" "}
            Start Hike
          </Button>
          <h3>OR</h3>
          <div>
            <h2>I want to hike</h2>
            <form id="select-distance" onSubmit={setSelectedDistance}>
              {/* Select Distance (in miles): */}
            </form>
            <div className="hike-starter-container">
              <TextField
                label="Type desired distance"
                style={{
                  borderRadius: 10,
                  backgroundColor: "white",
                  fontSize: "12px",
                  margin: "15px",
                }}
                id="filled-basic"
                variant="filled"
                onChange={(e) => setSelectedDistance(e.target.value)}
              />
              <h2>miles</h2>
              <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "#21b6ae",
                  padding: "10px",
                  fontSize: "12px",
                  margin: "10px",
                }}
                variant="contained"
                type="submit"
                className="start-hike"
                onClick={handleStartHike}
                onSubmit={handleSetDistance}
              >
                Start Hike
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
