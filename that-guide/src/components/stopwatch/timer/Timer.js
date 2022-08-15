import React from "react";
import "./Timer.css";

export default function Timer(props) {
  let i = 0;
  const logTime = () => {
    const time = props.time;
    while (i <= 20000000) {
      // console.log(i);
      i += 1000;
      if (i === time) {
        console.log(time);
      }
    }
  };

  logTime();

  return (
    <div className="timer">
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
  );
}
