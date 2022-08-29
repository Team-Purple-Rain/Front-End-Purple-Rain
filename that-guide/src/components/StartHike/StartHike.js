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
  const [endHikeLat, setEndHikeLat] = useState(latitude);
  const [endHikeLong, setEndHikeLong] = useState(longitude);
  const [distanceTraveled, setDistanceTraveled] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [currentElevation, setCurrentElevation] = useState(elevation);
  const [distanceCheckpoint, setDistanceCheckpoint] = useState(null);
  const [elevationChange, setElevationChange] = useState(null);
  const [isStopped, setIsStopped] = useState(false);
  const [ID, setID] = useState(null);
  const hikeSession = ID;
  // const [currentElevation, setCurrentElevation] = useState(elevation);
  // let username = localStorage.getItem("username");
  let token = localStorage.getItem("auth_token");
  let areYouLoggedIn = localStorage.getItem("login");
  // console.log(selectedDistance);
  // console.log(goalCoords)

  const handleStartHike = (event) => {
    console.log("hello button");
    setIsActive(true);
    setIsPaused(false);
    setIsStarted(true);

    if (elevation != "calculating..." && areYouLoggedIn != "true") {
      axios
        .post(`https://thatguide.herokuapp.com/map/`, {
          start_location: {
            latitude: startLat,
            longitude: startLong,
          },
          current_elevation: parseInt(currentElevation),
        })
        .then((res) => {
          console.log("posted something");
          setID(res.data.id);
          console.log(res);
        });
    } else if (elevation != "calculating..." && areYouLoggedIn === "true") {
      axios
        .post(`https://thatguide.herokuapp.com/map/`, {
          start_location: {
            latitude: startLat,
            longitude: startLong,
          },
          current_elevation: parseInt(currentElevation),
          header: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          console.log("posted something");
          setID(res.data.id);
          console.log(res);
        });
    }
  };
  // button that tells the user how far they have traveled so far
  const handleDistanceCheckpoint = () => {
    axios.get(`https://thatguide.herokuapp.com/map/${ID}/`, {}).then((res) => {
      console.log(res.data.distance_traveled);
      setDistanceCheckpoint(res.data.distance_traveled);
      return distanceCheckpoint;
    });
  };
  const distanceRemaining = selectedDistance - distanceCheckpoint;

  const handlePauseResume = (time) => {
    console.log(`time at pause in milliseconds is ${time}`);
    setIsPaused(!isPaused);
  };

  const hitCheckpoint = () => {
    // let checkTime = props.time;
    // while (i <= 20000000) {
    //   i += 1000 * 10;
    if (ID !== null && window.location.href.indexOf("start") != -1) {
      axios.post(`https://thatguide.herokuapp.com/map/${ID}/checkpoint/`, {
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        elevation: parseInt(currentElevation),
        hike_session: hikeSession,
      });
    }
  };

  setInterval(hitCheckpoint, 5000);

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

  const handleStop = () => {
    // console.log(ID);
    console.log(
      "this will update the rest of the information that was unavailable at the start"
    );
    setIsPaused(true);
    setIsActive(false);
    setIsStopped(!isStopped);
    let finalTime = localStorage.getItem("time");
    setCurrentElevation(elevation);
    setEndHikeLat(latitude);
    setEndHikeLong(longitude);

    axios
      .patch(`https://thatguide.herokuapp.com/map/${ID}/`, {
        end_location: {
          latitude: endHikeLat,
          longitude: endHikeLong,
        },
        travel_time: finalTime,
      })
      .then((res) => {
        console.log("patched something");
        navigate(`/hikeresults/${ID}`);
      });
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
          <>
            <h3 className="options">Your Current {hikeType}</h3>
          </>
        )}
      </div>

      <div className="map-and-timer">
        <DestinationMap
          latitude={latitude}
          longitude={longitude}
          goalCoords={goalCoords}
          handleStop={handleStop}
        />
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
          </div>
        </div>
      </div>

      <div className="second-location-header">
        <></>
        {hikeType === "Mile-based Hike" ? (
          <div>
            <h3>Goal distance: {selectedDistance} miles</h3>
            <div className="alert">
              <h5>*Walk at least one mile to return current hike stats.*</h5>
            </div>
            <div className="distance-hiked">
              <h4>
                Distance Hiked: {distanceCheckpoint} miles <br />
                <button
                  className="checkpoint-button"
                  onClick={handleDistanceCheckpoint}
                >
                  Distance Hiked
                </button>
              </h4>
            </div>
            <div className="distance-remaining">
              <h4>Distance Remaining: {distanceRemaining} miles</h4>
            </div>
          </div>
        ) : hikeType === "Freeform Hike" ? (
          <>
            <div className="alert">
              <h4>
                *Your final stats will be displayed at the end of your hike.*{" "}
                <br />
                {/* *Walk at least one mile to return current hike stats!* */}
              </h4>
            </div>
            <div className="distance-hiked">
              <h4>
                Distance Hiked: {distanceCheckpoint} miles <br />
                <button
                  className="checkpoint-button"
                  onClick={handleDistanceCheckpoint}
                >
                  Distance Hiked
                </button>
              </h4>
            </div>
          </>
        ) : (
          <div className="distance-hiked">
            <h4>
              Distance Hiked: {distanceCheckpoint} miles <br />
              <button
                className="checkpoint-button"
                onClick={handleDistanceCheckpoint}
              >
                Distance Hiked
              </button>
            </h4>
          </div>
        )}
      </div>
      <Button
        variant="contained"
        style={{
          borderRadius: 50,
          backgroundColor: "#21b6ae",
          padding: "10px",
          // fontSize: "calc(.5vw + .5vh + .5vmin)",
          margin: "8px",
          float: "center",
          border: "1px solid white",
        }}
        onClick={handleReturnHome}
      >
        Return Home
      </Button>
      <button onClick={sendToBackEnd}>Send To Back End</button>
    </>
  );
}
