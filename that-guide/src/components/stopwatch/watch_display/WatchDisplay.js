import React, { useState } from "react";
import "./WatchDisplay.css";
import Timer from "../timer/Timer";
import WatchButtons from "../watch_buttons/WatchButtons";
import axios from "axios";

function StopWatch({
  latitude,
  longitude,
  handleStartHike,
  isActive,
  isPaused,
  isStarted,
  handlePauseResume,
  handleStop,
  ID,
  setID,
  finalTime,
  hikeSession,
  timeTraveled,
  setTimeTraveled,
  storageBank,
}) {
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return (
    <>
      <div className="stop-watch">
        <Timer
          time={time}
          finalTime={finalTime}
          latitude={latitude}
          longitude={longitude}
          ID={ID}
          hikeSession={hikeSession}
          storageBank={storageBank}
        />
        <WatchButtons
          active={isActive}
          finalTime={finalTime}
          isPaused={isPaused}
          handleStartHike={handleStartHike}
          handlePauseResume={handlePauseResume}
          isStarted={isStarted}
          handleStop={handleStop}
          ID={ID}
          time={time}
          setID={setID}
          hikeSession={hikeSession}
          timeTraveled={timeTraveled}
          setTimeTraveled={setTimeTraveled}
        />
      </div>
    </>
  );
}

export default StopWatch;
