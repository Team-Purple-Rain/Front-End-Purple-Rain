import {useState} from "react"
import {useNavigate} from "react-router-dom"
import useLocalStorageState from "use-local-storage-state"
import StopWatch from "../stopwatch/watch_display/WatchDisplay"
import "./StartHike.css"

export default function StartHike({distance, longitude, latitude}) {

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
            <button className="pin-return">Return to current location</button>
        </div>
        <div className="current-hike-stats">
            <h3>Current Coordinates: (display coordinates)</h3>
            <h3>Current Elevation: (display elevation)</h3>
            <h2>Goal distance: {distance} miles</h2>
            <div className="whole-stats-container">
                <div className="left-container">
                    <div className="distance-hiked">
                        <h4>Distance Hiked: (distance user has hiked)</h4>
                    </div>
                    <div className="distance-remaining">
                        <h4>Distance Remaining: ({distance} miles - distance user has hiked)</h4>
                    </div>
                    <div className="time-elapsed">
                        <h4>Time elapsed: (data from Stopwatch component)</h4>
                    </div>
                </div>
                <div className="right-container">
                    <div className="miles-per-hour">
                        <h4>MPH: ({distance} miles/time it takes for hiker to hike 1 mile) </h4>
                    </div>
                    <div className="time-remaining">
                        <h4>Estimated time remaining: </h4>
                    </div>
                </div>
            </div>
        </div>

        <StopWatch />
    </>
);

}
