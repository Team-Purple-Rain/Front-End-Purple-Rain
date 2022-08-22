import axios from "axios";
import { useState } from "react"

function GetProfile() {
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [preferredPace, setPreferredPace] = useState(null);
    const [experience, setExperience] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    axios
        .get(`https://thatguide.herokuapp.com/users/me/`, {
            email: email,
            phone: phone,
            pace_list: preferredPace,
            experience_list: experience,
            first_name: firstName,
            last_name: lastName
        })
        .then((res) => {
            console.log(res)
        })

    return (
        <>
            <h1>
                {firstName}
                {lastName}
                {experience}
                {preferredPace}
                {email}
                {phone}
            </h1>
        </>
    )
}
export default GetProfile

