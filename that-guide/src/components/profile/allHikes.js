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
                            mileMarker={individualHike.avg_mph}
                            times={individualHike.travel_time}
                            startingLat={individualHike.start_location.latitude}
                            startingLong={individualHike.start_location.longitude}
                            endingLat={individualHike.end_location.latitude}
                            endingLong={individualHike.end_location.longitude}
                            startingElevation={individualHike.elevation_gain}
                            endingElevation={individualHike.elevation_loss}
                            date={individualHike.updated_at}

                        />
                    )))}
        </>
    )
}
export default AllHikes