import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./users.css";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl'
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';


function NewUser() {
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState([])
    const handleNewUser = (event) => {
        console.log("clicked button")
        event.preventDefault();
        console.log(username);
        console.log(password);
        axios
            .post(`https://thatguide.herokuapp.com/auth/users/`, {
                username: username,
                password: password
            })
            .then((res) => {
                // localStorage.setItem("log in", "true");
                console.log(res);
                // localStorage.setItem("auth_token", res.data.auth_token);
                // alert("You created a new user! Please log in through the home screen to access all the card features!")
                navigate("/login");
            })
            .catch((res) => {
                let username_error = res.response.data.username;
                let password_error = res.response.data.password;
                if (username_error) {
                    for (let error of username_error) {
                        setError(error);
                    }
                } else if (password_error) {
                    for (let error of password_error) {
                        setError(error);
                        console.log(error);
                    }
                }
            });
    }


    return (
        <>
            <div className="user-stats">
                <h3 class="subtitle is-3 is-flex is-aligned-self-center is-spaced ">Create Your Account</h3>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        required
                        id="outlined-required"
                        type="text"
                        name="first"
                        aria-describedby="outlined-username-helper-text"
                        value={username}
                        // placeholder={firstName}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Username</FormHelperText>
                </FormControl>

                <br />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                        required
                        id="outlined-required"
                        type="password"
                        name="first"
                        aria-describedby="outlined-username-helper-text"
                        htmlFor="password"
                        value={password}
                        // placeholder={firstName}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Password</FormHelperText>
                </FormControl>

                <br />
                <Button
                    startIcon={<LoginIcon />}
                    variant="contained"
                    type="submit"
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#62b378",
                        padding: "10px",
                        fontSize: "calc(.7vw + .7vh + .5vmin)",
                        margin: "8px",
                        border: "1px solid white",

                    }}
                    onClick={handleNewUser}>
                    Create Account
                </Button>
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

export default NewUser