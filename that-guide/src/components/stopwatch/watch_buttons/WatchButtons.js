import React from "react";
import "./WatchButtons.css";

export default function ControlButtons(props) {
  const StartButton = (
    <>
      <div className="btn btn-one btn-start" onClick={props.handleStartHike}>
        Start Hike
      </div>
    </>
  );
  const PauseResumeButton = (
    <div className="btn btn-one" onClick={props.handlePauseResume}>
      {props.isPaused ? "Resume Hike" : "Pause Hike"}
    </div>
  );

  const StopButton = (
    <>
      <div className="btn btn-one" onClick={props.handleStop}>
        Stop Hike
      </div>
    </>
  );

  return (
    <div className="Control-Buttons">
      {!props.isStarted === true ? <div>{StartButton}</div> : ""}
      {/* if timer has not yet started, display startbutton, if it has display nothing. setStarted===true, setActive===true */}
      {props.active ? PauseResumeButton : ""}
      {/* if active, display pause/resume button */}

      {props.isPaused && props.isStarted ? StopButton : <></>}
      {/* if watch has been started and is paused, display stopbutton */}
      <br />
    </div>
  );
}
