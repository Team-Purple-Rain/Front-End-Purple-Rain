import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import "./users.css";
import * as React from 'react';
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

function LogIn({ setAuth, auth }) {
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const [error, setError] = useState([])
    const [areYouLoggedIn, setAreYouLoggedIn] = useState(false)
    const [data, setData] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        axios
            .post(`https://thatguide.herokuapp.com/auth/token/login`, {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res)
                localStorage.setItem("auth_token", res.data.auth_token);
                setData(res);
                setToken(res.data.auth_token);
                localStorage.setItem("username", `${username}`);
                localStorage.setItem("log in", "true")
                console.log(username);
                navigate("/");
            })
            .catch((res) => {
                let error = res.response.data.non_field_errors;
                setError(error);
            })
    }

    useEffect(() => {
        if (username && token) {
            localStorage.setItem("log in", "true");
            localStorage.setItem("username", `${username}`)
        } else {
        }
    }, [areYouLoggedIn, token, username])


    return (
        <>
        <div className="user-stats">
            <h3>Log In</h3>
            <TextField
            required
            id="outlined-required"
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={{
                margin: "5px",
            }}
        />
        <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            style={{
                margin: "5px",
            }}
        />
            <br />
            <br />
            <form>
            <Button
                  startIcon={<LoginIcon />}
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#62b378",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white",

                  }}
                  onClick={(event) => handleSubmit(event)}>
                
                  Log In
                </Button>
            </form>
            <br />
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
            </div>
        </>
    )
}

export default LogIn