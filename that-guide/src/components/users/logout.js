import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./users.css";
import Button from "@mui/material/Button"
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

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
        <div className="user-stats">
            <h3>Log Out?</h3>
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
                onClick={handleReturnHome}>No, Return Home</Button>
                            <Button
                  startIcon={<LogoutIcon />}
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#d95252",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white"
                  }}
                  onClick={handleLogOut}>Yes, Log Out</Button>
            </div>
        </>
    )
}

export default LogOut