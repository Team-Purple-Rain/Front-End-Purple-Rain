import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "../results/results";
import axios from "axios";
import Map from "../map/Map";
import LoadingScreen from "react-loading-screen"
import Button from "@mui/material/Button"
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import "./profile.css";

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


    return (
        <>
        <div className="personal-info">
            <h3>Welcome back, {username}.</h3>
                <h4>Name: {firstName} {lastName} </h4>
                <h4>Email: {email}</h4>
                <h4>Phone: {phone}</h4>
                <h4>Experience: {experience}</h4>
                <h4> Preferred Pace:  {preferredPace}</h4>
                <h4> Emergency Contact: </h4>
                <Button
                startIcon={<EditIcon />}
                variant="contained"
                style={{
                    borderRadius: 10,
                    backgroundColor: "##de9835",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white"
                    }}
                onClick={handleEditProfile}>Edit Profile</Button>
        </div>
            <div className="results-box">
                <h3>All Hike Results</h3>
                <Results />
            </div>

            <Button
                startIcon={<HomeIcon />}
                variant="contained"
                style={{
                    borderRadius: 10,
                    backgroundColor: "#21b6ae",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white"
                    }}
                onClick={handleReturnHome}>Return Home</Button>
        </>
    )
}

// export default Profile 