import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useLocalStorageState from "use-local-storage-state"
import StopWatch from "../stopwatch/watch_display/WatchDisplay"
import "./StartHike.css"
import Map from "../map/Map"
import axios from "axios"
import { speedOfLightDependencies } from "mathjs"

export default function StartHike({ selectedDistance, latitude, longitude }) {
    console.log(selectedDistance)
    const [endHike, setEndHike] = useState(null);
    const [distanceTraveled, setDistanceTraveled] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [timeTraveled, setTimeTraveled] = useState(null);
    const [elevationChange, setElevationChange] = useState(null);
    const [startLat, setStartLat] = useState(latitude);
    const [startLong, setStartLong] = useState(longitude);

    if (latitude === "") {
        return <div>Gathering location data...</div>;
    }

    const handleStartHike = (event) => {
        console.log("hello button");
        // // event.preventDefault();
        // setStartLat(latitude);
        // setStartLong(longitude);
        axios
            .post(`https://thatguide.herokuapp.com/map/`, {
                start_location: {
                    latitude: startLat,
                    longitude: startLong,
                },
                end_location: endHike,
                distance_traveled: distanceTraveled,
                avg_mph: speed,
                travel_time: timeTraveled,
                elevation_gain: elevationChange
            })
            .then((res) => {
                console.log("posted something")
            })
    }

    return (
        <>
            <div>
                <div className="location-header">
                    <h3>Your Current Hike</h3>
                </div>
                <Map latitude={latitude} longitude={longitude} />
            </div>
            <div className="current-hike-stats">
                <h3>Current Coordinates: {latitude}, {longitude}</h3>
                <h3>Current Elevation: (display elevation)</h3>
                <h2>Goal distance: {selectedDistance} miles</h2>
                <div className="whole-stats-container">
                    <div className="left-container">
                        <div className="distance-hiked">
                            <h4>Distance Hiked: (distance user has hiked)</h4>
                        </div>
                        <div className="distance-remaining">
                            <h4>Distance Remaining: ({selectedDistance} miles - distance user has hiked)</h4>
                        </div>
                        <div className="miles-per-hour">
                            <h4>MPH: ({selectedDistance} miles/time it takes for hiker to hike 1 mile) </h4>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleStartHike}
                    >
                        Start Hike
                    </button>
                    <div className="right-container">
                        <div className="time-remaining">
                            <StopWatch />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}
