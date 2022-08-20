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
            <label>Experience Level  </label>
            <select name="selectList" id="selectList"
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
            >
                <option value="beginner"> Beginner </option>
                <option value="moderate"> Moderate </option>
                <option value="advanced"> Advanced </option>
            </select>
            {/* <input
                type="text"
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
            /> */}
            <br />
            <br />
            <label>Preferred Hiking Pace  </label>
            <select name="selectList" id="selectList"
                value={preferredPace}
                onChange={(event) => setPreferredPace(event.target.value)}
            >
                <option value="leisure"> Leisure ( 20-30 minute mile / 2-3mph )</option>
                <option value="powerwalk"> Powerwalk ( 12-15 minute mile / 4-5mph )</option>
                <option value="chased by bear"> Chased By Bear ( 10 minute mile and faster / 6mph )</option>
            </select>
            {/* <input
                type="text"
                value={preferredPace}
                onChange={(event) => setPreferredPace(event.target.value)}
            /> */}
            <br />
            <br />
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={handleDiscardChanges}>Discard Changes</button>
        </>
    )
}

export default EditProfile