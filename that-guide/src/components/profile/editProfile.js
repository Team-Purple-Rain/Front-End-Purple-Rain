import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function EditProfile() {
    let token = localStorage.getItem("auth_token");
    const navigate = useNavigate();
    const handleDiscardChanges = (event) => {
        navigate("/profile");
    }
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [preferredPace, setPreferredPace] = useState(null);
    const [experience, setExperience] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    console.log(token)
    const handleSaveChanges = (event) => {
        axios
            .patch(`https://thatguide.herokuapp.com/users/me`, {
                email: email,
                phone: phone,
                pace_list: preferredPace,
                experience_list: experience,
                first_name: firstName,
                last_name: lastName
            })
    }

    return (
        <>
            <h1>Edit Profile</h1>
            <label>First Name </label>
            <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />
            <br />
            <br />
            <label>Last Name </label>
            <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />
            <br />
            <br />
            <label>Email</label>
            <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <br />
            <label>Phone </label>
            <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
            />
            <br />
            <br />
            <label>Experience Level</label>
            <br />
            <br />
            <label>Preferred Hiking Pace</label>
            <br />
            <br />
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={handleDiscardChanges}>Discard Changes</button>
        </>
    )
}

export default EditProfile