import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";
import "./homepage.css";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";

export default function Homepage({ selectedDistance, setSelectedDistance, latitude, longitude }) {
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const miles = selectedDistance

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
    return <div>Gathering location data...</div>;
  }

  return (
    <>
      <div className="map-and-button">
        <div id="map">
          <Map latitude={latitude} longitude={longitude} />
        </div>
      </div>
      <div className="hike-starter">
        <div className="current-stats">
          <h3>Current Coordinates: {latitude}, {longitude}</h3>
          <h3>Current Elevation: (display elevation)</h3>
        </div>
        <h2>How far do you want to hike?</h2>
        <form id="select-distance" onSubmit={setSelectedDistance}>Select Distance (in miles):</form>
        <input
          className="distance-input"
          type="number"
          placeholder="Please select a distance."
          min="1"
          onChange={(e) => setSelectedDistance(e.target.value)} />
        <button type="submit"
          className="start-hike"
          onClick={handleStartHike}
          onSubmit={handleSetDistance}
        >
          Set distance
        </button>
      </div>
    </>
  );
}
