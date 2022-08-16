import React from "react";
import "./Timer.css";
import { useEffect } from "react";

export default function Timer(props) {
  let storageBank = [];
  let i = 0;

  const logTime = () => {
    const time = props.time;
    while (i <= 20000000) {
      // console.log(i);
      i += 1000;
      if (i === time) {
        storageBank.push(time);
        addToLocalStorage(time);
      }
    }
  };

  const addToLocalStorage = (time) => {
    storageBank = JSON.parse(localStorage.getItem("hike")) || [];
    storageBank.push(time);
    storageBank.push(props.longitude);
    storageBank.push(props.latitude);
    // storageBank.push(JSON.parse(localStorage.getItem("hike")));
    localStorage.setItem("hike", JSON.stringify(storageBank));
  };

  logTime();

  return (
    <div className="timer">
      <div className="all-digits">
        <h3 className="time-elapsed">Time Elapsed:</h3>
        <span className="digits" onChange={logTime}>
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {("0" + ((props.time / 10) % 100)).slice(-2)}
        </span>
      </div>
    </div>
  );
}
