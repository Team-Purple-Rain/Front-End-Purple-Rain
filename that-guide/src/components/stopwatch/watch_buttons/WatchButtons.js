import React from "react";
import "./watchButtons.css";

export default function ControlButtons(props) {
  const StartButton = (
    <>
      <div className="btn btn-one btn-start" onClick={props.handleStart}>
        Start Hike
      </div>{" "}
    </>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-two" onClick={props.handleReset}>
        Reset Hike
      </div>
      <div className="btn btn-one" onClick={props.handlePauseResume}>
        {props.isPaused ? "Resume Hike" : "Pause Hike"}
      </div>
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
      <div className="btn btn-one" onClick={props.handleStop}>
        Stop Hike
      </div>
    </div>
  );
}
