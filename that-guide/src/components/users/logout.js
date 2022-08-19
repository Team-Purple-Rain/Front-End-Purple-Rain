import { useNavigate } from "react-router-dom";
import axios from "axios";


function LogOut({ token }) {
    const navigate = useNavigate();

    const handleReturnHome = (event) => {
        navigate("/");
    }
    console.log(token);

    const returnHome = useNavigate();
    const handleLogOut = () => {
        axios
            .post(`https://thatguide.herokuapp.com/auth/token/logout/`, {
                headers:
                    { Authorization: `Token ${token}` }
            })
            .then(() => {
                localStorage.clear();
                setTimeout(() => {
                    returnHome("/");
                }, 1000);
            })
    }
    return (
        <>
            <h1>Wanna Log out?!</h1>
            <button class="button is-danger is-outlined has-text-link is-light is-large" type="submit" onClick={(event) => handleLogOut(event)}> Log Out</button>
            <button onClick={handleReturnHome}>Return Home</button>
        </>
    )
}

export default LogOut