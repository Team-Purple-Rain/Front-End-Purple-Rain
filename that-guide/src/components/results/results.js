import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../map/Map";
import axios from "axios";
import Button from "@mui/material/Button"
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Results({ latitude, longitude }) {
  let { ID } = useParams();
  console.log(ID);
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

  let secondsElapsed = localStorage.getItem("time");
  console.log(secondsElapsed);
  let time = secondsElapsed / 60;

  const navigate = useNavigate();
  const handleResetSave = (event) => {
    localStorage.clear();
    navigate("/profile");
  };
  const handleClearData = () => {
    localStorage.clear();
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
  };

  axios
    .get(`https://thatguide.herokuapp.com/map/${ID}/`)
    .then((res) => {
      console.log(res);
      setSpeed(res.data.avg_mph);
      setElevationChange(res.data.elevation_gain);
      setDistanceTraveled(res.data.distance_traveled);
      setEndHikeLat(res.data.end_location.latitude);
      setEndHikeLong(res.data.end_location.longitude);
      setStartLat(res.data.start_location.latitude);
      setStartLong(res.data.start_location.longitude);
      setTimeTraveled(time);
      setHikeUser(res.data.username)
    })

  return (
    <>
      <div className="results-box">
        <h4>Starting Location: {startLat}, {startLong}
        </h4>
        <h4>
          Ending Location: {endHikeLat}, {endHikeLong}
        </h4>
        <h4>
          Elevation Change: {elevationChange}
        </h4>
        <h4>Time Hiking: {timeTraveled}
        </h4>
        <h4>
          Average Pace:
          {speed}
        </h4>
        <h4>
          Distance Hiked: {distanceTraveled}
        </h4>
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
            onClick={handleResetSave}>Save Hike</Button>
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
            onClick={handleClearData}>Delete Hike</Button>
      </div>
    </div>
      {/* <Map latitude={latitude} longitude={longitude} /> */}

    </>
  );
}
export default Results;
