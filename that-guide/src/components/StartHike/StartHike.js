import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import "./StartHike.css";
import Map from "../map/Map";
import axios from "axios";
import moment from "moment";

export default function StartHike({
  selectedDistance,
  latitude,
  longitude,
  time,
}) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  // console.log(selectedDistance);
  const [startLat, setStartLat] = useState(latitude);
  const [startLong, setStartLong] = useState(longitude);
  const [hikeUser, setHikeUser] = useState(null);
  const endHike = useState(null);
  const [endHikeLat, setEndHikeLat] = useState(latitude);
  const [endHikeLong, setEndHikeLong] = useState(longitude);
  const [distanceTraveled, setDistanceTraveled] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [timeTraveled, setTimeTraveled] = useState(null);
  const [elevationChange, setElevationChange] = useState(null);
  const [isStopped, setIsStopped] = useState(false);
  const [ID, setID] = useState(null);

  const handleStartHike = (event) => {
    console.log("hello button");

    // event.preventDefault();
    setIsActive(true);
    setIsPaused(false);
    setIsStarted(true);
    axios
      .post(`https://thatguide.herokuapp.com/map/`, {
        start_location: {
          latitude: startLat,
          longitude: startLong,
        },
        end_location: endHike,
        hike_user: hikeUser,
      })
      .then((res) => {
        console.log("posted something");
        console.log(res);
        console.log(res.data.id);
        setID(res.data.id);
      })
      .catch((res) => console.log(res));
  };

  const handlePauseResume = () => {
    console.log(`time at pause in milliseconds is ${time}`);
    setIsPaused(!isPaused);
  };

  const handleStop = (event) => {
    console.log(
      "this will update the rest of the information that was unavailable at the start"
    );
    setIsPaused(true);
    setIsActive(false);
    setIsStopped(!isStopped);
    axios
      .patch(`https://thatguide.herokuapp.com/map/${ID}/`, {
        end_location: {
          latitude: endHikeLat,
          longitude: endHikeLong,
        },
        distance_traveled: distanceTraveled,
        avg_mph: speed,
        travel_time: timeTraveled,
        elevation_gain: elevationChange,
        hike_user: hikeUser,
      })
      .then((res) => {
        console.log("patched something");
        navigate("/hikeresults");
        console.log("results page");
      });
  };

  const navigate = useNavigate();

  const handleReturnHome = (event) => {
    navigate("/");
  };

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
              <StopWatch
                latitude={latitude}
                longitude={longitude}
                handleStartHike={handleStartHike}
                isActive={isActive}
                isPaused={isPaused}
                setIsActive={setIsActive}
                setIsPaused={setIsPaused}
                handlePauseResume={handlePauseResume}
                isStarted={isStarted}
                handleStop={handleStop}
                ID={ID}
                setID={setID}
              />
            </div>
          </div>
          {/* <button onClick={handleResults}>See Results Page</button> */}
          <button onClick={handleReturnHome}>Return Home</button>
        </div>
      </div>
    </>
  );
}
