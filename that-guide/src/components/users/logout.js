import { useNavigate } from "react-router-dom";


function LogOut() {
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }
    return (
        <>
            <h1>Wanna Log out?!</h1>
            <button onClick={handleReturnHome}>Return Home</button>
        </>
    )
}

export default LogOut