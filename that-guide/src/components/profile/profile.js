import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "../results/results";
import axios from "axios";

function Profile() {
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
                <h2>Results Go Here</h2>
            </div>
            <button onClick={handleEditProfile}>Edit Profile</button>
            <button onClick={handleReturnHome}>Return Home</button>
        </>
    )
}

export default Profile 