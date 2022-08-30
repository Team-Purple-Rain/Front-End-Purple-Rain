import { useEffect, useState, useRef } from "react";
import { useInterval } from "use-interval";
import { OfflineMap } from "./OfflineMap";
import "leaflet.offline";
import "./Offline.css";

export default function OffLinePage(props) {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [ID, setID] = useState(null);

  function success(position) {
    setLatitude(position.coords.latitude);
    console.log(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(position.coords.longitude);
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("This device doesn't support location services.");
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  useInterval(() => {
    getLocation();
    if (latitude & (longitude !== 0)) {
      console.log(latitude);
      console.log(longitude);
      console.log("hello");
    }
  }, 10000);

  const handleStartHike = (event) => {
    console.log("hello button");
    setIsActive(true);
    setIsPaused(false);
    setIsStarted(true);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    // console.log(ID);

    setIsPaused(true);
  };

  return (
    <div>
      <div className="offline-stats">
        <div><h3>You're offline but we're still logging your hike!</h3></div>
        <div>
          Your current coordinates are:
          <div>Latitude: {latitude}</div>
          <div>Longitude: {longitude}</div>
        </div>
        </div>
          <OfflineMap
            longitude={longitude}
            latitude={latitude}
            setLatitude={setLatitude}
            setLongitude={longitude}
          />
          <props.StopWatch
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
          ></props.StopWatch>
       
      
    </div>
  );
}
