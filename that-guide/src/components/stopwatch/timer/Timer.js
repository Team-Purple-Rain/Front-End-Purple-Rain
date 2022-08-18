import React from "react";
import "./Timer.css";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Timer(props) {
  let storageBank = [];
  let i = 0;

  const logTime = () => {
    let time = props.time;
    while (i <= 20000000) {
      i += 1000;
      // triggers every second
      // i += 1000 * 30;
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
    let elevation = document.getElementsByClassName("elevation_div");
    elevation = elevation[0].id;
    time = time.toString();
    time = time.slice(0, -3);
    storageBank = JSON.parse(localStorage.getItem("hike")) || [];
    storageBank.push({
      seconds_elapsed: time,
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
      longitude: props.longitude,
      latitude: props.latitude,
      elevation: elevation,
    });
    localStorage.setItem("hike", JSON.stringify(storageBank));
  };

  const MakeInitialLog = () => {
    useEffect(() => {
      let elevation = document.getElementsByClassName("elevation_div");
      elevation = elevation[0].id;
      storageBank = JSON.parse(localStorage.getItem("hike")) || [];
      storageBank.push({
        seconds_elapsed: 0,
        timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
        longitude: props.longitude,
        latitude: props.latitude,
        elevation: elevation,
      });
      localStorage.setItem("hike", JSON.stringify(storageBank));
      console.log("time to make entry #1");
    });
  };

  logTime();
  MakeInitialLog();

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
