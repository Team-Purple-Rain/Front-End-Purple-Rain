import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import "./StartHike.css";
import Map from "../map/Map";
import axios from "axios";

export default function StartHike({ selectedDistance, latitude, longitude }) {
  console.log(selectedDistance);

  if (latitude === "") {
    return <div>Gathering location data...</div>;
  }

  return (
    <>
      <div>
        <div className="location-header">
          <h3>Your Current Hike</h3>
        </div>
        <Map latitude={latitude} longitude={longitude} />
      </div>
      <div className="current-hike-stats">
        <h3>
          Current Coordinates: {latitude}, {longitude}
        </h3>
        <h3>Current Elevation: (display elevation)</h3>
        <h2>Goal distance: {selectedDistance} miles</h2>
        <div className="whole-stats-container">
          <div className="left-container">
            <div className="distance-hiked">
              <h4>Distance Hiked: (distance user has hiked)</h4>
            </div>
            <div className="distance-remaining">
              <h4>
                Distance Remaining: ({selectedDistance} miles - distance user
                has hiked)
              </h4>
            </div>
            <div className="miles-per-hour">
              <h4>
                MPH: ({selectedDistance} miles/time it takes for hiker to hike 1
                mile){" "}
              </h4>
            </div>
          </div>
          <div className="right-container">
            <div className="time-remaining">
              <StopWatch latitude={latitude} longitude={longitude} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
