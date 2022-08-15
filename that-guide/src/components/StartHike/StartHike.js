import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useLocalStorageState from "use-local-storage-state"
import StopWatch from "../stopwatch/watch_display/WatchDisplay"
import "./StartHike.css"

export default function StartHike({ distance }) {
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
                <div className="whole-stats-container">
                    <div className="left-container">
                        <div className="distance-hiked">
                            <h5>Distance Hiked: (goal distance - distance remaining)</h5>
                        </div>
                        <div className="distance-remaining">
                            <h5>Distance Remaining: (goal distance - distance hiked)</h5>
                        </div>
                        <div className="time-elapsed">
                            <h5>Time elapsed:</h5>
                        </div>
                    </div>
                    <div className="right-container">
                        <div className="miles-per-hour">
                            <h5>MPH:</h5>
                        </div>
                        <div className="time-remaining">
                            <h5>Estimated time remaining:</h5>
                        </div>
                    </div>
                </div>
            </div>

            <StopWatch />
        </>
    );

}
