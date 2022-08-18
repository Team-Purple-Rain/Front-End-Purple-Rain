import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";
import axios from "axios";

function Results({ latitude, longitude, ID }) {
  console.log(ID);
  const navigate = useNavigate();
  const handleResetSave = (event) => {
    navigate("/profile");
  };
  const handleClearData = (event) => {
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
      <h1>hello there resutls page</h1>
      <Map latitude={latitude} longitude={longitude} />
      <button onClick={handleResetSave}>Save Hike</button>
      <button onClick={handleClearData}>Delete Hike</button>
    </>
  );
}
export default Results;
