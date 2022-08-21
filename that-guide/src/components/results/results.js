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


  

  return (
    <>
      <div className="location-header">Your Hike Results</div>
      <Map latitude={latitude} longitude={longitude} />
      <div className="results-buttons">
      <Button 
              startIcon={<SaveIcon/>}
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
              startIcon={<DeleteOutlineIcon/>}
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
