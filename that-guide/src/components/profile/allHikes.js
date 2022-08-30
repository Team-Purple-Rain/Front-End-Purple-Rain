import axios from "axios";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react'
import moment from "moment";
import individualHike from "./individualHike";



function AllHikes({ latitude, longitude, hikeType }) {

    let token = localStorage.getItem("auth_token");
    // const [hikeID, setHikeID] = useState(null);
    // const [startLat, setStartLat] = useState(latitude);
    // const [startLong, setStartLong] = useState(longitude);
    // const [hikeUser, setHikeUser] = useState(null);
    // const endHike = useState(null);
    // const [endHikeLat, setEndHikeLat] = useState(latitude);
    // const [endHikeLong, setEndHikeLong] = useState(longitude);
    // const [distanceTraveled, setDistanceTraveled] = useState(null);
    // const [timeTraveled, setTimeTraveled] = useState(null);
    // const [elevationChange, setElevationChange] = useState(null);

    const [time, setTime] = useState(null);

    const [hikeResults, setHikeResults] = useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        axios
            .get(`https://thatguide.herokuapp.com/users/me/map/`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            })
            .then((res) => {
                // setDistanceTraveled(res.data.distance_traveled);
                setHikeResults(res.data);
                console.log(hikeResults);
                setTime(res.data.travel_time);
                let averagePace = (res.data.distance_traveled) / (((res.data.travel_time) / 60) / 60)
                if (averagePace === NaN) {
                    return "Not enough information to determine pace."
                }
            })
    }, [])

    return (
        <>
            <individualHike />
            {hikeResults.map((individualHike) => (
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '43%', flexShrink: 0 }}>
                            Date of Hike:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {moment(individualHike.updated_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                            Distance Hiked: {individualHike.distance_traveled} miles
                            <br />
                            Time Hiking: {(individualHike.travel_time) / 60} minutes
                            <br />
                            {/* {properTime} */}
                            Average Pace: {(individualHike.distance_traveled) / (((individualHike.travel_time) / 60) / 60)} mph
                            <br />
                            <br />
                            Elevation Gain: {individualHike.elevation_gain} ft
                            <br />
                            Elevation Loss: {individualHike.elevation_loss} ft
                            <br />
                            <br />
                            Start Location:
                            <br />
                            Latitude: {individualHike.start_location.latitude}
                            <br />
                            Longitude: {individualHike.start_location.longitude}
                            <br />
                            <br />
                            End Location:
                            <br />
                            Latitude: {individualHike.end_location.latitude}
                            <br />
                            Longitude: {individualHike.end_location.longitude}
                            <br />
                            <br />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}
export default AllHikes