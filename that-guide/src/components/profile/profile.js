import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "../results/results";
import axios from "axios";
import Map from "../map/Map";
import LoadingScreen from "react-loading-screen";
import AllHikes from "../profile/allHikes.js";
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react'

export default function Profile() {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("auth_token");
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [preferredPace, setPreferredPace] = useState(null);
    const [experience, setExperience] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    axios
        .get(`https://thatguide.herokuapp.com/users/me/`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        .then((res) => {
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setPreferredPace(res.data.pace_list);
            setExperience(res.data.experience_list);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
        })
        ;
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }
    const handleEditProfile = (event) => {
        navigate("/editprofile");
    }
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    // const seeAllHikeResults = (event) => {
    //     console.log("button clicked");
    // }

    return (
        <>
            <h1>Welcome back {username}, check out your hiking stats below!</h1>
            <div className="personal-info">
                <h3>Name: {firstName} {lastName} </h3>
                <h3>Email: {email}</h3>
                <h3>Phone: {phone}</h3>
                <h3>Experience: {experience}</h3>
                <h3> Preferred Pace:  {preferredPace}</h3>
                <h3> Emergency Contact: </h3>
            </div>
            <div className="results-box">
                {/* <button onClick={seeAllHikeResults}>See Previous Hike Results</button> */}
                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Hike Results.
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Click to see all previous hike results.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <AllHikes />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <br />
            <br />
            <button onClick={handleEditProfile}>Edit Profile</button>
            <button onClick={handleReturnHome}>Return Home</button>
            <br />
            <br />
        </>
    )
}

// export default Profile 