import {useState} from "react"
import {useNavigate} from "react-router-dom"
import useLocalStorageState from "use-local-storage-state"
import StopWatch from "./stopwatch/watch_display/WatchDisplay"

export default function StartHike({distance}) {

console.log(distance)


return (
    <>
        <div className="location-header">
            <h3>Your Current Hike</h3>
        </div>
        <div className="map-and-button"> 
            <div className="map-container">
                <p>Map with the hiker's trail and their selected distance goes here.</p>
            </div>
            <button className="pin-return">Return to current location (?)</button>
        </div>
        <div className="current-hike-stats">
            <h3>Current Coordinates: (list coordinates)</h3>
            <h3>Current Elevation: (list elevation)</h3>
            <h2>Goal distance: {distance} miles</h2>
        </div>
        <StopWatch />
    </>
);

}
