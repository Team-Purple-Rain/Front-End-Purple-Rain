import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";

function Results({ latitude, longitude }) {
    const navigate = useNavigate();
    const handleResetSave = (event) => {
        navigate("/profile");
    }
    const handleClearData = (event) => {
        navigate("/");
    }

    return (
        <>
            <h1>hello there resutls page</h1>
            <Map latitude={latitude} longitude={longitude} />
            <button onClick={handleResetSave}>Save Hike</button>
            <button onClick={handleClearData}>Delete Hike</button>
        </>
    )
}
export default Results