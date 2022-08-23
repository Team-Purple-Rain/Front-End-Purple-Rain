import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import "./users.css";

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
            <h1>Log In</h1>
            <label class="label is-large" htmlFor='username'>Username</label>
            <input type="text"
                id='username'
                class="input is-primary is-rounded is-focused is-large"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <br />
            <form>
                <>
                    <label class="label is-large" htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        class="input is-primary is-rounded is-focused is-large"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </>
                <br />
                <br />
                <button class="button is-primary is-large is-hover" type="submit" onClick={(event) => handleSubmit(event)}> Log In</button>
            </form>
            <br />
            <button onClick={handleReturnHome}>Return Home</button>
            </div>
        </>
    )
}

export default LogIn