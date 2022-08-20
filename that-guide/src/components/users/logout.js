import { useNavigate } from "react-router-dom";
import axios from "axios";


function LogOut() {
    let token = localStorage.getItem("auth_token");

    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }

    console.log(token);

    const returnHome = useNavigate();
    const handleLogOut = (event) => {
        axios
            .post(`https://thatguide.herokuapp.com/auth/token/logout/`, {},
                {
                    headers: {
                        Authorization: `token ${token}`
                    }
                })
            .then((res) => {
                localStorage.clear();
                setTimeout(() => {
                    returnHome("/");
                }, 1000);
            })
    }
    return (
        <>
            <h1>Wanna Log out?!</h1>
            <button class="button is-danger is-outlined has-text-link is-light is-large"
                type="submit"
                onClick={handleLogOut}> Log Out</button>
            <button onClick={handleReturnHome}>Return Home</button>
        </>
    )
}

export default LogOut