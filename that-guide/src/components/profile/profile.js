import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "../results/results";

function Profile() {
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }

    return (
        <>
            <h1>hello profile page</h1>
            <button onClick={handleReturnHome}>Return Home</button>
        </>
    )
}

export default Profile 