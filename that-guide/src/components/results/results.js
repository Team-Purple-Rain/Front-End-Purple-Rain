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

  const navigate = useNavigate();
  const handleResetSave = (event) => {
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
      setTimeTraveled(res.data.travel_time);
    })

  return (
    <>
      <div className="location-header">Your Hike Results</div>
      <div className="results-stats">
        <h3>Starting Location: {startLat}, {startLong}
        </h3>
        <h3>
          Ending Location: {endHikeLat}, {endHikeLong}
        </h3>
        <h3>
          Elevation Change: {elevationChange}
        </h3>
        <h3>Time Hiking: {timeTraveled}
        </h3>
        <h3>
          Average Pace:
          {speed}
        </h3>
        <h3>
          Distance Hiked: {distanceTraveled}
        </h3>
      </div>
      {/* <Map latitude={latitude} longitude={longitude} /> */}
      <div className="results-buttons">
        <Button
          startIcon={<SaveIcon />}
          variant="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#62b378",
            padding: "10px",
            fontSize: "calc(.5vw + .5vh + .5vmin)",
            margin: "8px",
            border: "1px solid white",
            float: "right"
          }}
          onClick={handleResetSave}>Save Hike</Button>
        <Button
          startIcon={<DeleteOutlineIcon />}
          variant="contained"
          style={{
            borderRadius: 10,
            backgroundColor: "#d95252",
            padding: "10px",
            fontSize: "calc(.5vw + .5vh + .5vmin)",
            margin: "8px",
            border: "1px solid white",
            float: "right"
          }}
          onClick={handleClearData}>Delete Hike</Button>
      </div>
    </>
  );
}
export default Results;
