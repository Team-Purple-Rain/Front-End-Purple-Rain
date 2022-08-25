import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "../results/results";
import axios from "axios";
import Map from "../map/Map";
import LoadingScreen from "react-loading-screen";
import Spinner from "react-spinkit";
import AllHikes from "../profile/allHikes.js";
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";

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
            <div className="profile-title">
                <h3>Welcome back, {username}.</h3>
            </div>
            <br />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >

                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Your profile
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Click to see your info.</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                <div className="personal-info">
                <h4>Name: {firstName} {lastName} </h4>
                <h4>Email: {email}</h4>
                <h4>Phone: {phone}</h4>
                <h4>Experience: {experience}</h4>
                <h4> Preferred Pace:  {preferredPace}</h4>
                <h4> Emergency Contact: </h4>
            </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <br />
        <div className="profile-title">
            <h3>Your Hikes</h3>
        </div>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  All Hikes
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Click to see your hikes.</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                        <AllHikes />
                </Typography>
              </AccordionDetails>
            </Accordion>
            <br />
        <div className="profile-buttons">
            <Button
                startIcon={<EditIcon />}
                variant="contained"
                style={{
                    borderRadius: 10,
                    backgroundColor: "##de9835",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white",
                    }}
                onClick={handleEditProfile}>Edit Profile</Button>
            <Button
                startIcon={<HomeIcon />}
                variant="contained"
                style={{
                    borderRadius: 10,
                    backgroundColor: "#21b6ae",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white",
                    }}
                onClick={handleReturnHome}>Return Home</Button>
            </div>
            <br />
            <br />
        </>
    )
}

// export default Profile 