import React from "react";
import "./Timer.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { useBooleanState, usePrevious } from "webrix/hooks";

export default function Timer(props) {
  const {
    value: online,
    setFalse: setOffline,
    setTrue: setOnline,
  } = useBooleanState(navigator.onLine);
  const previousOnline = usePrevious(online);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  const [startDataLogged, setStartDataLogged] = useState(false);
  const [setTimeTraveled] = useState(null);
  let storageBank = [];
  let i = 0;

  const logTime = () => {
    let time = props.time;
    while (i <= 2000000000) {
      i += 1000 * 5;
      // triggers every second
      // i += 1000 * 30;
      // triggers event every 30 seconds
      if (i === time && online) {
        i = i.toString();
        i = i.slice(0, -3);
        console.log(i);
        addToLocalStorage(time);
        console.log(time);
        localStorage.setItem("time", i);
      }
      if (i === time && !online) {
        OffLineLocalStorage(time);
      }
    }
  };

  const OffLineLocalStorage = () => {
    // let time = props.time;
    if (!online) {
      // time = time.toString();
      // time = time.slice(0, -3);
      storageBank = JSON.parse(localStorage.getItem("hike")) || [];
      storageBank.push({
        hike_session: 2,
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
    if (online) {
      let elevation = document.getElementsByClassName("elevation_div");
      let timeTraveled = time;
      console.log(timeTraveled);
      elevation = elevation[0].id;
      time = time.toString();
      time = time.slice(0, -3);
      storageBank = JSON.parse(localStorage.getItem("hike")) || [];
      storageBank.push({
        hike_session: 2,
        time_logged: moment().format(),
        location: {
          latitude: props.latitude,
          longitude: props.longitude,
        },
        elevation: elevation,
      });
      localStorage.setItem("hike", JSON.stringify(storageBank));
    }
  };

  const MakeInitialLog = () => {
    let elevation = document.getElementsByClassName("elevation_div");
    elevation = elevation[0].id;
    storageBank = JSON.parse(localStorage.getItem("hike")) || [];
    storageBank.push({
      hike_session: 2,
      time_logged: moment().format(),
      location: {
        latitude: props.latitude,
        longitude: props.longitude,
      },
      elevation: elevation,
    });
    localStorage.setItem("hike", JSON.stringify(storageBank));
    console.log("intial log made");
  };

  logTime();

  useEffect(() => {
    if (online) {
      let elevation = document.getElementsByClassName("elevation_div");
      elevation = elevation[0].id;
      if (
        elevation !== "calculating..." &&
        props.time === 0 &&
        startDataLogged === false
      ) {
        MakeInitialLog();
        setStartDataLogged(true);
      }
    }
  });

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
