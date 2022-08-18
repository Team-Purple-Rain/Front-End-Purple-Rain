import React from "react";
import "./WatchButtons.css";
import { useState } from "react";

export default function ControlButtons(props) {
  console.log(props);

  const StartButton = (
    <>
      {!props.active && (
        <div className="btn btn-one btn-start" onClick={props.handleStartHike}>
          Start Hike
        </div>
      )}
    </>
  );
  const PauseResumeButton = (
    <div className="btn btn-one" onClick={props.handlePauseResume}>
      {props.isPaused ? "Resume Hike" : "Pause Hike"}
    </div>
  );
  const ResetButtons = (
    <div className="btn-grp">
      <div className="btn btn-two" onClick={props.handleReset}>
        Reset and Save Hike
      </div>
      <div className="btn btn-two" onClick={props.handleReset}>
        Reset and Discard Hike
      </div>
      {/* are (stop & reset and reset & save) these redundant?  */}
    </div>
  );

  const StopButton = (
    <div className="btn btn-one" onClick={props.handleStop}>
      Stop Hike
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{StartButton}</div>
      {props.active ? PauseResumeButton : <></>}

      {/* {!props.isPaused && props.start === true ? "" : <>{ResetButtons}</>} */}
      {/* {props.isPaused ? { ResetButtons } : ""} */}
      {/* <div>{PauseResumeButton}</div>; */}
      <br />
    </div>
  );
}
