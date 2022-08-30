import React from "react";
import "./Timer.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { useBooleanState, usePrevious } from "webrix/hooks";

export default function Timer(props) {
  // console.log(props.ID);
  // console.log(props.hikeSession);
  const [startDataLogged, setStartDataLogged] = useState(false);
  let storageBank = [];
  let i = 0;

  const logTime = () => {
    let time = props.time;
    while (i <= 2000000000) {
      i += 1000;
      // triggers every second
      // i += 1000 * 30;
      // triggers event every 30 seconds
      if (i === time && props.online) {
        i = i.toString();
        i = i.slice(0, -3);
        console.log(i);
        addToLocalStorage(time);
        console.log(time);
        localStorage.setItem("time", i);
      }
      if (i === time && !props.online) {
        OffLineLocalStorage(time);
      }
    }
  };

  const OffLineLocalStorage = () => {
    // let time = props.time;
    if (props.online) {
      // time = time.toString();
      // time = time.slice(0, -3);
      storageBank = JSON.parse(localStorage.getItem("hike")) || [];
      storageBank.push({
        hike_session: props.id,
        time_logged: moment().format(),
        location: {
          latitude: props.latitude,
          longitude: props.longitude,
        },
      });
      localStorage.setItem("hike", JSON.stringify(storageBank));
    }
  };

  const addToLocalStorage = (time) => {
    if (props.online) {
      let elevation = document.getElementsByClassName("elevation_div");
      let timeTraveled = time;
      console.log(timeTraveled);
      elevation = elevation[0].id;
      time = time.toString();
      time = time.slice(0, -3);
      storageBank = JSON.parse(localStorage.getItem("hike")) || [];
      storageBank.push({
        hike_session: props.hikeSession,
        time_logged: moment().format(),
        location: {
          latitude: props.latitude,
          longitude: props.longitude,
        },
        elevation: parseInt(elevation),
      });
      localStorage.setItem("hike", JSON.stringify(storageBank));
    }
  };

  logTime();


  return (
    <div className="timer">
      <div className="all-digits">
        <div className="right-aligned-digits">
          <span className="digits" onChange={logTime}>
            {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
          </span>
          <span className="digits">
            {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
          </span>
          {/* <span className="digits mili-sec">
            {("0" + ((props.time / 10) % 100)).slice(-2)}
          </span> */}
        </div>
      </div>
    </div>
  );
}
