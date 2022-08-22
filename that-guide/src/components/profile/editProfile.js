import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function EditProfile() {

    let token = localStorage.getItem("auth_token");
    let username = localStorage.getItem("username")
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
    axios
        .get(`https://thatguide.herokuapp.com/users/me/`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        })
        .then((res) => {
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
        })
        ;
    const handleSaveChanges = (event) => {
        axios
            .patch(`https://thatguide.herokuapp.com/users/me/`, {
                email: email,
                phone: phone,
                pace_list: preferredPace,
                experience_list: experience,
                first_name: firstName,
                last_name: lastName
            },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                }
            )
            .then((res) => {
                console.log("changes made");
                navigate("/profile")
            })
    }


    return (
        <>
            <h1>Edit Profile</h1>
            <h2> Username:  {username} </h2>
            <br />
            <label>First Name  </label>
            <input
                type="text"
                placeholder={firstName}
                value={firstName}
                required
                onChange={(event) => setFirstName(event.target.value)}
            />
            <br />
            <br />
            <label>Last Name  </label>
            <input
                type="text"
                value={lastName}
                required
                onChange={(event) => setLastName(event.target.value)}
            />
            <br />
            <br />
            <label>Email  </label>
            <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <br />
            <label>Phone  </label>
            <input
                type="number"
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
                <option value="medium"> Moderate </option>
                <option value="advanced"> Advanced </option>
            </select>
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
            <br />
            <br />
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={handleDiscardChanges}>Discard Changes</button>
        </>
    )
}

export default EditProfile