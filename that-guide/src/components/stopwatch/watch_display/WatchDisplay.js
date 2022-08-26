import React, { useState } from "react";
import "./WatchDisplay.css";
import Timer from "../timer/Timer";
import WatchButtons from "../watch_buttons/WatchButtons";

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
}) {
  const [time, setTime] = useState(0);

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
        />
      </div>
    </>
  );
}

export default StopWatch;
