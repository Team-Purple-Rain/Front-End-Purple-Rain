import React, { useState } from "react";
import "./WatchDisplay.css";
import Timer from "../timer/Timer";
import WatchButtons from "../watch_buttons/WatchButtons";
import axios from "axios";

function StopWatch({ latitude, longitude, handleResults }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  React.useEffect(() => {
    let interval = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);


  // const [isStopped, setIsStopped] = useState(false);

  // const endHike = useState(null);
  // const [distanceTraveled, setDistanceTraveled] = useState(null);
  // const [speed, setSpeed] = useState(null);
  // const [timeTraveled, setTimeTraveled] = useState(null);
  // const [elevationChange, setElevationChange] = useState(null);
  // const [startLat, setStartLat] = useState(latitude);
  // const [startLong, setStartLong] = useState(longitude);
  // const [hikeUser, setHikeUser] = useState(null);
  // const [endHikeLat, setEndHikeLat] = useState(latitude);
  // const [endHikeLong, setEndHikeLong] = useState(longitude);
  // const [ID, setID] = useState(null);
  // axios
  //   .post(`https://thatguide.herokuapp.com/map/`, {
  //     start_location: {
  //       latitude: startLat,
  //       longitude: startLong,
  //     },
  //     end_location: endHike,
  //     hike_user: hikeUser,
  //   })
  //   .then((res) => {
  //     console.log("posted something");
  //     console.log(res);
  //     console.log(res.data.id);
  //     setID(res.data.id);
  //   });



  // alert("are you sure you want to finish tracking this hike?");
  // setIsStopped(!isStopped);
  // axios
  //   .patch(`https://thatguide.herokuapp.com/map/${ID}/`, {
  //     end_location: {
  //       latitude: endHikeLat,
  //       longitude: endHikeLong,
  //     },
  //     distance_traveled: distanceTraveled,
  //     avg_mph: speed,
  //     travel_time: timeTraveled,
  //     elevation_gain: elevationChange,
  //     hike_user: hikeUser,
  //   })
  //   .then((res) => {
  //     console.log("patched something");
  //   });

  const handleStartHike = (event) => {
    console.log("hello button");

    // event.preventDefault();
    setIsActive(true);
    setIsPaused(false);
    setIsStarted(true);
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
  };

  return (
    <>
      <div className="stop-watch">
        <Timer time={time} latitude={latitude} longitude={longitude} />
        <WatchButtons
          active={isActive}
          isPaused={isPaused}
          handleStartHike={handleStartHike}
          handlePauseResume={handlePauseResume}
          handleStop={handleStop}
          isStarted={isStarted}
          handleResults={handleResults}
        // handleReset={handleReset}
        // isStopped={isStopped}
        />
      </div>
    </>
  );
}

export default StopWatch;
