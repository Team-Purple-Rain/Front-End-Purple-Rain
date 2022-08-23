import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import "./StartHike.css";
import Map from "../map/Map";
import axios from "axios";
import moment from "moment";
import LoadingScreen from "react-loading-screen";
import Button from "@mui/material/Button";

export default function StartHike({
  selectedDistance,
  latitude,
  longitude,
  time,
}) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  // console.log(selectedDistance);
  const [startLat, setStartLat] = useState(latitude);
  const [startLong, setStartLong] = useState(longitude);
  const [hikeUser, setHikeUser] = useState(null);
  const endHike = useState(null);
  const [endHikeLat, setEndHikeLat] = useState(latitude);
  const [endHikeLong, setEndHikeLong] = useState(longitude);
  const [distanceTraveled, setDistanceTraveled] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [timeTraveled, setTimeTraveled] = useState(null);
  const [elevationChange, setElevationChange] = useState(null);
  const [isStopped, setIsStopped] = useState(false);
  const [ID, setID] = useState(null);
  // let username = localStorage.getItem("username");
  let token = localStorage.getItem("auth_token");
  console.log(selectedDistance);

  axios
    .get(`https://thatguide.herokuapp.com/users/me/`, {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
    .then((res) => {
      setHikeUser(res.data.id);
      console.log(hikeUser);
    })

  const handleStartHike = (event) => {
    console.log("hello button");
    setIsActive(true);
    setIsPaused(false);
    setIsStarted(true);
    axios
      .post(`https://thatguide.herokuapp.com/map/`, {
        start_location: {
          latitude: startLat,
          longitude: startLong,
        },
        end_location: endHike,
        hike_user: hikeUser,
      })
      .then((res) => {
        console.log("posted something");
        console.log(res);
        console.log(res.data.id);
        setID(res.data.id);
      });
  };

  const handlePauseResume = () => {
    console.log(`time at pause in milliseconds is ${time}`);
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    // console.log(ID);
    console.log(
      "this will update the rest of the information that was unavailable at the start"
    );
    setIsPaused(true);
    setIsActive(false);
    setIsStopped(!isStopped);
    axios
      .patch(`https://thatguide.herokuapp.com/map/${ID}/`, {
        end_location: {
          latitude: endHikeLat,
          longitude: endHikeLong,
        },
        distance_traveled: distanceTraveled,
        avg_mph: speed,
        travel_time: timeTraveled,
        elevation_gain: elevationChange,
        hike_user: hikeUser,
      })
      .then((res) => {
        console.log("patched something");
        navigate(`/hikeresults/${ID}`);
        console.log("results page");
      });
  };

  const navigate = useNavigate();

  const handleReturnHome = (event) => {
    navigate("/");
  };

  console.log({ latitude }, { longitude });

  if (latitude === "") {
    return (
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        text="Gathering location data for the Thru Hiker's Appalachian Trail Guide..."
      />
    );
  }

  return (
    <>
      <div>
        <div className="location-header">
          <h3>Your Current Hike</h3>
        </div>
        <Map latitude={latitude} longitude={longitude} />
      </div>
      <div className="second-location-header">
        <></>
        {selectedDistance === "" ? (
          ""
        ) : (
          <div>
            <h2>Goal distance: {selectedDistance} miles</h2>
            <div className="distance-hiked">
              <h4>Distance Hiked: (distance user has hiked)</h4>
            </div>
            <div className="distance-remaining">
              <h4>
                Distance Remaining: ({selectedDistance} miles - distance user
                has hiked)
              </h4>
            </div>
            {/* <div className="miles-per-hour">
              <h4>
                MPH: ({selectedDistance} miles/time it takes for hiker to hike 1
                mile){" "}
              </h4>
            </div> */}
          </div>
        )}

        <div className="whole-stats-container">
          <div className="left-container"></div>
          <div className="right-container">
            <div className="time-remaining">
              <StopWatch
                latitude={latitude}
                longitude={longitude}
                handleStartHike={handleStartHike}
                isActive={isActive}
                isPaused={isPaused}
                setIsActive={setIsActive}
                setIsPaused={setIsPaused}
                handlePauseResume={handlePauseResume}
                isStarted={isStarted}
                handleStop={handleStop}
                ID={ID}
                setID={setID}
              />
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          style={{
            borderRadius: 50,
            backgroundColor: "#21b6ae",
            padding: "10px",
            fontSize: "calc(.5vw + .5vh + .5vmin)",
            margin: "8px",
            border: "1px solid white",
          }}
          onClick={handleReturnHome}
        >
          Return Home
        </Button>
      </div>
    </>
  );
}
