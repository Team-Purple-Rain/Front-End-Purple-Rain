import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import "./StartHike.css";
import Map from "../map/Map";
import DestinationMap from "../map/DestinationMap";
import axios from "axios";
import moment from "moment";
import Button from "@mui/material/Button";
import Spinner from "react-spinkit";
import { timeout } from "workbox-core/_private";

export default function StartHike({
  selectedDistance,
  latitude,
  longitude,
  time,
  goalCoords,
  hikeType,
  setHikeType,
  selectedHikeType,
  setSelectedHikeType,
  destination,
  elevation,
  destinationType,
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
  const [timeTraveled, setTimeTraveled] = useState(0);
  const [currentElevation, setCurrentElevation] = useState(elevation);
  const [elevationChange, setElevationChange] = useState(null);
  const [isStopped, setIsStopped] = useState(false);
  const [ID, setID] = useState(null);
  const hikeSession = ID;
  // const [currentElevation, setCurrentElevation] = useState(elevation);
  // let username = localStorage.getItem("username");
  let token = localStorage.getItem("auth_token");
  // console.log(selectedDistance);
  // console.log(goalCoords)

  // axios
  //   .get(`https://thatguide.herokuapp.com/users/me/`, {
  //     headers: {
  //       Authorization: `Token ${token}`,
  //     }
  //   })
  //   .then((res) => {
  //     setHikeUser(res.data.id);
  //     console.log(hikeUser);
  //   })

  const handleStartHike = (event) => {
    console.log("hello button");
    setIsActive(true);
    setIsPaused(false);
    setIsStarted(true);

    if (elevation != "calculating...") {
      axios
        .post(`https://thatguide.herokuapp.com/map/`, {
          start_location: {
            latitude: startLat,
            longitude: startLong,
          },
          end_location: endHike,
          current_elevation: parseInt(currentElevation),
          hike_user: hikeUser,
        })
        .then((res) => {
          console.log("posted something");
          setID(res.data.id);
          console.log(res);
        });
    }
  };

  const handlePauseResume = () => {
    console.log(`time at pause in milliseconds is ${time}`);
    setIsPaused(!isPaused);
    setTimeTraveled(finalTime);
  };

  const hitCheckpoint = () => {
    // let checkTime = props.time;
    // while (i <= 20000000) {
    //   i += 1000 * 10;
    axios.post(`https://thatguide.herokuapp.com/map/${ID}/checkpoint/`, {
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      elevation: parseInt(currentElevation),
      hike_session: hikeSession,
    });
  };

  const sendToBackEnd = () => {
    const data = localStorage.getItem("hike");
    if (data) {
      console.log(data);
      console.log(hikeSession);
      axios
        .post(`https://thatguide.herokuapp.com/map/${hikeSession}/bulk/`, data)
        .then((res) => console.log(res));
    }
  };

  let finalTime = localStorage.getItem("time");

  const handleStop = () => {
    // console.log(ID);
    console.log(
      "this will update the rest of the information that was unavailable at the start"
    );
    setIsPaused(true);
    setIsActive(false);
    setIsStopped(!isStopped);
    console.log(finalTime);
    //console logs "time" correctly
    setTimeTraveled(finalTime);
    console.log(timeTraveled);
    //console logs null
    setCurrentElevation(elevation);
    // setEndHikeLat(latitude);
    // setEndHikeLong(longitude);
    // setDistanceTraveled(500);
    // setSpeed(distanceTraveled / timeTraveled)
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
      });
    // .then(sendToBackEnd());
  };

  const navigate = useNavigate();

  const handleReturnHome = (event) => {
    navigate("/");
  };

  console.log({ latitude }, { longitude }, { currentElevation });

  if (latitude === "") {
    return (
      <div
        style={{
          display: "flex",
          marginTop: "200px",
          justifyContent: "space-between",
        }}
      >
        <Spinner
          name="circle"
          style={{ width: 100, height: 100, color: "#32a889", margin: "auto" }}
        />
      </div>
    );
  }

  console.log({ destination });

  console.log(goalCoords);

  return (
    <>
      <div>
        {hikeType === "Destination Hike" ? (
          <h3 className="options">
            Your hike to {destinationType}: {destination}
          </h3>
        ) : (
          <h3 className="options">Your Current {hikeType}</h3>
        )}
      </div>
      <DestinationMap
        latitude={latitude}
        longitude={longitude}
        goalCoords={goalCoords}
        handleStop={handleStop}
        destination={destination}
      />
      =
      <div className="second-location-header">
        <></>
        {hikeType === "Mile-based Hike" ? (
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
          </div>
        ) : hikeType === "Freeform Hike" ? (
          <div className="alert">
            <h4>Your final stats will be displayed at the end of your hike.</h4>
          </div>
        ) : (
          <div className="distance-hiked">
            <h4>Distance Hiked: (distance user has hiked)</h4>
          </div>
        )}

        <div className="whole-stats-container">
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
                hikeSession={hikeSession}
              />
            </div>
            <button onClick={hitCheckpoint}>Checkpoint Hit</button>
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
        <button onClick={sendToBackEnd}>Send To Back End</button>
      </div>
    </>
  );
}
