import React, { useState } from "react";
import "./WatchDisplay.css";
import Timer from "../timer/Timer";
import WatchButtons from "../watch_buttons/WatchButtons";
import axios from "axios";

function StopWatch({ latitude, longitude }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  // console.log(latitude);
  // console.log(longitude);
  //   here I would put in current location etc

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

  const [endHike, setEndHike] = useState(null);
  const [distanceTraveled, setDistanceTraveled] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [timeTraveled, setTimeTraveled] = useState(null);
  const [elevationChange, setElevationChange] = useState(null);
  const [startLat, setStartLat] = useState(latitude);
  const [startLong, setStartLong] = useState(longitude);
  const [hikeUser, setHikeUser] = useState(null);
  const [isStopped, setIsStopped] = useState(false);

  // console.log(startLat);
  // console.log(startLong);

  const handleStartHike = (event) => {
    console.log("hello button");
    // event.preventDefault();
    setIsActive(true);
    setIsPaused(false);
    axios
      .post(`https://thatguide.herokuapp.com/map/`,
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }, 
        {
          start_location: {
            latitude: startLat,
            longitude: startLong,
          },
          end_location: endHike,
          distance_traveled: distanceTraveled,
          avg_mph: speed,
          travel_time: timeTraveled,
          elevation_gain: elevationChange,
          hike_user: hikeUser
        })
      .then((res) => {
        console.log("posted something");
      })
  };


  const handlePauseResume = () => {
    console.log(`time at pause in milliseconds is ${time}`);
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    console.log("clear session data");
  };

  const handleStop = () => {
    console.log(
      "this will update the rest of the information that was unavailable at the start"
    );
    setIsPaused(true);
    setIsStopped(!isStopped);
  };

  return (
    <>
      <div className="stop-watch">
        <Timer time={time} latitude={latitude} longitude={longitude} />
        <WatchButtons
          active={isActive}
          isPaused={isPaused}
          handleStart={handleStartHike}
          handlePauseResume={handlePauseResume}
          handleReset={handleReset}
          handleStop={handleStop}
          isStopped={isStopped}
        />
      </div>
      {/* {isStopped ? <Results /> : ""} */}
    </>
  );
}

// const Results = () => {
//   let hikeData = JSON.parse(localStorage.getItem("hike"));
//   console.log(hikeData);
//   return (
//     <div>
//       Hello
//       <div>
//         {hikeData.map((entry) => (
//           <div>
//             at {entry.time} seconds, you were at: {entry.latitude},
//             {entry.longitude}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default StopWatch;
