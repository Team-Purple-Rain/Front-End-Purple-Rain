import { useNavigate } from "react-router-dom"

function LogIn() {
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }
    return (
        <>
            <h1>Log In</h1>
            <button onClick={handleReturnHome}>Return Home</button>
        </>
    )
}

export default LogIn