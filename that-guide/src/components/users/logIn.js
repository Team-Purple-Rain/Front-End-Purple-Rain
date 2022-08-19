import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";

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
                // headers: { Authorization: `Token ${token}` }
            })
            .then((res) => {
                console.log(res)
                localStorage.setItem("auth_token", res.data.auth_token);
                setData(res);
                setToken(res.data.auth_token);
                navigate("/");
            })
            .catch((res) => {
                let error = res.response.data.non_field_errors;
                setError(error);
            })
    }

    useEffect(() => {
        if (username && token) {
            setAreYouLoggedIn(true)
            localStorage.setItem("log in", "true")
            localStorage.setItem("username", `${username}`)
        } else {
        }
    }, [areYouLoggedIn, token, username])


    return (
        <>
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
                        type="text"
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
        </>
    )
}

export default LogIn