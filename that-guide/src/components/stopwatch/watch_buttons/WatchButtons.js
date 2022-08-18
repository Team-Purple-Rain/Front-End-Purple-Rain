import React from "react";
import "./WatchButtons.css";

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
      {/* <div>{props.isStopped ? ("") : ActiveButtons}</div> */}
      <div className="btn btn-one" onClick={props.handleStop}>
        Stop Hike
      </div>
      <br />
    </div>
  );
}

// {((props.active) && (!props.isStopped)) ? ActiveButtons :  }
// {(currentFollowers.includes(ownerID) && (!owner)) ? (<button class="card-footer-item" onClick={() => handleUnfollowRequest()}>Unfollow User </button>)
//     : (!currentFollowers.includes(ownerID) && (!owner)) ? (<button class="card-footer-item" onClick={() => handleFollowRequest()}>Follow User </button>)
//         : ""
//   }