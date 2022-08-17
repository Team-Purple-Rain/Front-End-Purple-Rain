import React from "react";
import "./Timer.css";
import { useEffect, useState } from "react";

export default function Timer(props) {
  let storageBank = [];
  let i = 0;

  const logTime = () => {
    let time = props.time;
    while (i <= 20000000) {
      // i += 1000;
      // triggers every second
      i += 1000 * 30;
      // triggers event every 30 seconds
      if (i === time) {
        i = i.toString();
        i = i.slice(0, -3);
        console.log(i);
        addToLocalStorage(time);
      }
    }
  };

  const addToLocalStorage = (time) => {
    time = time.toString();
    time = time.slice(0, -3);
    storageBank = JSON.parse(localStorage.getItem("hike")) || [];
    storageBank.push({
      time: time,
      longitude: props.longitude,
      latitude: props.latitude,
    });
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
