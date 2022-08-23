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


function NewUser() {
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }
    const returnHome = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState('')
    const [error, setError] = useState([])
    const handleNewUser = (event) => {
        event.preventDefault();
        axios
            .post(`https://thatguide.herokuapp.com/auth/users/`, {
                username: username,
                password: password,
                headers: { Authorization: `Token ${token}` }
            })
            .then((res) => {
                // localStorage.setItem("log in", "true");
                console.log(res);
                localStorage.setItem("auth_token", res.data.auth_token);
                alert("You created a new user! Please log in through the home screen to access all the card features!")
                returnHome("/")
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
        <h1 class="subtitle is-3 is-flex is-aligned-self-center is-spaced ">Create Your Account</h1>
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
            <button class="button is-primary is-large is-hover" type="submit" onClick={(event) => handleNewUser(event)}>
                {" "}
                Create Account
            </button>
            <button onClick={handleReturnHome}>Return Home</button>
        </div>
        </>

    )
}

export default NewUser