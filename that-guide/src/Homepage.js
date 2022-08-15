import { useState } from "react";
import Map from "./Map";

export default function Homepage() {
  const [distance, setDistance] = useState("");
  const [error, setError] = useState(null);

  const handleSetDistance = (event) => {
    setDistance(event.target.value);
    console.log(event.target.value);
  };

  const handleStartHike = (event) => {
    event.preventDefault();
    setError(null);
    console.log("You have started a hike.");
  };

  return (
    <>
      <div className="location-header">
        <h3>Current Location:</h3>
      </div>

      <div className="map-and-button">
          <Map />
        <button className="pin-return">Return to current location (?)</button>
      </div>

      <div className="hike-starter">
        <div className="current-stats">
          <h3>Current Coordinates: (list coordinates)</h3>
          <h3>Current Elevation: (list elevation)</h3>
        </div>
        <h2>How far do you want to hike?</h2>
        <form id="select-distance">Select Distance:</form>
        <select value={distance} onChange={handleSetDistance}>
          <option value="">Please Select a Distance</option>
          <option value="1">1 mile</option>
          <option value="2">2 miles</option>
          <option value="3">3 miles</option>
          <option value="4">4 miles</option>
          <option value="5">5 miles</option>
          <option value="6">6 miles</option>
          <option value="7">7 miles</option>
          <option value="8">8 miles</option>
          <option value="9">9 miles</option>
          <option value="10">10 miles</option>
        </select>
        <button type="submit" className="start-hike" onClick={handleStartHike}>
          Start your hike!
        </button>
      </div>
    </>
  );
}
