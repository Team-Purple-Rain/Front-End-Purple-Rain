import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./results.css";
import Map from "../map/Map";
import axios from "axios";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import moment from "moment";

function Results({ latitude, longitude, goalCoords, hikeType }) {
  let { ID } = useParams();
  console.log(ID);

  const [hikeUser, setHikeUser] = useState(null);
  const endHike = useState(null);
  const [elevationGain, setElevationGain] = useState(0);
  const [elevationLoss, setElevationLoss] = useState(0);

  const [timeTraveled, setTimeTraveled] = useState("");

  const areYouLoggedIn = localStorage.getItem("log in");
  let time = localStorage.getItem("time");

  const clearLocalStorage = () => {
    window.localStorage.removeItem("hike");
    window.localStorage.removeItem("time");
  };

  const navigate = useNavigate();

  const handleResetSave = (event) => {
    axios
      .patch(`https://thatguide.herokuapp.com/map/${ID}/`, {
        starting_location: {
          latitude: startingLat,
          longitude: startingLong
        },
        end_location: {
          latitude: endingLat,
          longitude: endingLong,
        },
        avg_mph: mileMarker
      })
      .then((res) => {
        console.log("patched something");
        clearLocalStorage();
        areYouLoggedIn ? navigate("/profile") : navigate("/createuser");
      })
  };

  const handleClearData = () => {
    axios
      .delete(`https://thatguide.herokuapp.com/map/${ID}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("deleted something");
        navigate("/");
      });
    clearLocalStorage();
  };

  const newTime = new Date(null);
  newTime.setSeconds(time);
  const properTime = newTime.toISOString().substr(11, 8);

  axios.get(`https://thatguide.herokuapp.com/map/${ID}/`).then((res) => {
    console.log(res);
    setElevationGain(res.data.elevation_gain);

    setTimeTraveled(time / 60);
    setHikeUser(res.data.username);
    setElevationLoss(res.data.elevation_loss);

    console.log(timeTraveled);
  });

  let endCoords = localStorage.getItem("goalCoords");
  // console.log(endCoords[1])

  let destinationType = localStorage.getItem("destinationType");
  let destination = localStorage.getItem("destination");
  let startCoords = localStorage.getItem("startCoords");
  let mileMarker = localStorage.getItem("milemarker");
  console.log(mileMarker)
  const endingLat = (endCoords.slice(20, 38))
  const endingLong = (endCoords.slice(1, 19))
  const startingLat = (startCoords.slice(1, 10))
  const startingLong = (startCoords.slice(12, 22))



  return (
    <>
      <div className="options">Hike Results</div>
      <div className="results-stats">
        {hikeType === "Destination Hike" ? (
          <>
            <h2>Your hike to {destination}</h2>
            <div className="small-container">
              <h4>Time Hiking: {properTime}</h4>
            </div>
            <div className="small-container">
              <h4>Destination Mile Marker: {mileMarker}</h4>
            </div>
            <div className="small-container">
              <h4>Start Coordinates: {startCoords.slice(1, 10)}, {startCoords.slice(12, 22)}</h4>
              <h4>End Coordinates: {endCoords.slice(20, 38)}, {endCoords.slice(1, 19)} </h4>
            </div>
            <div className="small-container">
              <h4>Elevation Gain: {elevationGain} feet</h4>
              <h4>Elevation Loss: {elevationLoss} feet</h4>
            </div>
          </>
        ) : (
          <>
            <h2>Your Freeform Hike</h2>
            <div className="small-container">
              <h4>Time Hiking: {properTime}</h4>
            </div>
            <div className="small-container">
              <h4>Start Coordinates: {startCoords}</h4>
              <h4>End Coordinates: [{latitude},{longitude}] </h4>
            </div>
            <div className="small-container">
              <h4>Elevation Gain: {elevationGain} feet</h4>
              <h4>Elevation Loss: {elevationLoss} feet</h4>
            </div>
          </>
        )}

        <div className="results-buttons">
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            style={{
              borderRadius: 10,
              backgroundColor: "#62b378",
              padding: "10px",
              fontSize: "calc(.7vw + .7vh + .5vmin)",
              marginTop: "20px",
              border: "1px solid white",
            }}
            onClick={handleResetSave}
          >
            Save Hike
          </Button>
          <Button
            startIcon={<DeleteOutlineIcon />}
            variant="contained"
            style={{
              borderRadius: 10,
              backgroundColor: "#d95252",
              padding: "10px",
              fontSize: "calc(.7vw + .7vh + .5vmin)",
              marginTop: "20px",
              border: "1px solid white",
            }}
            onClick={handleClearData}
          >
            Delete Hike
          </Button>
        </div>
      </div>
    </>
  );
}
export default Results;
