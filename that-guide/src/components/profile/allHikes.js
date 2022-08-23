import axios from "axios";
import { distance } from "mathjs";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react'
import moment from "moment";



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
                // setSpeed(res.data.avg_mph);
                // setElevationChange(res.data.elevation_gain);
                // setDistanceTraveled(res.data.distance_traveled);
                // setEndHikeLat(res.data.end_location.latitude);
                // setEndHikeLong(res.data.end_location.longitude);
                // setStartLat(res.data.start_location.latitude);
                // setStartLong(res.data.start_location.longitude);
                // // setTimeTraveled(moment(time).format("h:mm:ss"));
                // setHikeUser(res.data.username);
                setHikeResults(res.data);
                console.log(hikeResults);
                // setHikeID(hikeResults.map);
                // console.log(hikeResults);
            })
    }, [])

    // length, map through length 
    //: moment().format("MMMM Do YYYY, h:mm:ss a")


    return (
        <>
            <h1>All Hike Results</h1>
            {hikeResults.map((individualHike) => (
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Date of Hike
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {individualHike.updated_at}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Starting Location
                            <br />
                            Latitude:{individualHike.start_location.latitude}
                            <br />
                            Longitude:{individualHike.start_location.longitude}
                            <br />
                            <br />
                            Ending Location
                            <br />
                            Latitude: {individualHike.end_location.latitude}
                            <br />
                            Longitude:{individualHike.end_location.longitude}
                            <br />
                            Elevation Gain: {individualHike.elevation_gain}
                            <br />
                            Distance Hiked: {individualHike.distance_traveled}
                            <br />
                            Time Hiking: {individualHike.travel_time}
                            <br />
                            Average Pace: {individualHike.avg_mph}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}
export default AllHikes