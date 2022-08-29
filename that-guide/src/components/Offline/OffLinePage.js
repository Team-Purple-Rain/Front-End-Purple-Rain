import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import { useEffect, useState, useRef } from "react";
import { useInterval } from "use-interval";
import axios from "axios";
import { OfflineMap } from "./OfflineMap";
import "leaflet.offline";

export default function OffLinePage(props) {
  const [longitude, setLongitude] = useState("loading...");
  const [latitude, setLatitude] = useState("loading...");
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [ID, setID] = useState(null);

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("This device doesn't support location services.");
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  setInterval(getLocation, 10000);
  useEffect(() => {
    if (latitude !== "loading...") {
      console.log(latitude);
    }
  });

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
      <div>
        <div>You're offline but we're still logging your hike!</div>
        <div>
          Your current coordinates are:
          <div>Latitude:{latitude}</div>
          <div>Longitude:{longitude}</div>
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
      </div>
    </div>
  );
}
