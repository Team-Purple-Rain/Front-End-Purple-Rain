import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useInterval } from "use-interval";
import axios from "axios";
import { OfflineMap } from "./OfflineMap";
import "leaflet.offline";

export default function OffLinePage(props) {
  console.log(props);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [elevation, setElevation] = useState("calculating...");
  const [mapSrc, setMapSrc] = useState("./basic_staticAT.png");
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
          <OfflineMap longitude={longitude} latitude={latitude} />
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
