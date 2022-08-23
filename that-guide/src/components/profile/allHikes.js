import axios from "axios";
import { distance } from "mathjs";
import { useState } from "react"

function AllHikes({ latitude, longitude }) {

    let token = localStorage.getItem("auth_token");

    const [hikeID, setHikeID] = useState(null);
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

    axios
        .get(`https://thatguide.herokuapp.com/users/me/map/`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        .then((res) => {
            console.log(res);
        })

    return (
        <>
            <h1>All Hike Results</h1>
        </>
    )
}
export default AllHikes