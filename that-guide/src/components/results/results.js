import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";

function Results({ latitude, longitude }) {
    return (
        <>
            <h1>hello there resutls page</h1>
            <Map latitude={latitude} longitude={longitude} />
        </>
    )
}
export default Results