import axios from "axios";
import { useState, useEffect } from "react";
import * as React from 'react'
import IndividualHike from "./individualHike";



function AllHikes({ latitude, longitude, hikeType }) {

    let token = localStorage.getItem("auth_token");
    const [hikeResults, setHikeResults] = useState([]);

    useEffect(() => {
        axios
            .get(`https://thatguide.herokuapp.com/users/me/map/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            .then((res) => {
                setHikeResults(res.data);
                console.log(hikeResults);
            })
    }, [setHikeResults])

    return (
        <>
            {hikeResults &&
                hikeResults.map((individualHike) => (
                    (
                        <IndividualHike
                            distance={individualHike.distance_traveled}
                            times={individualHike.travel_time}
                            speed={(individualHike.distance_traveled) / (((individualHike.travel_time) / 60) / 60)}
                            elevationGain={individualHike.elevation_gain}
                            elevationLoss={individualHike.elevation_loss}
                            startingLat={individualHike.start_location.latitude}
                            startingLong={individualHike.start_location.longitude}
                            endingLat={individualHike.end_location.latitude}
                            endingLong={individualHike.end_location.longitude}
                            date={individualHike.updated_at}
                        />
                    )))}
        </>
    )
}
export default AllHikes