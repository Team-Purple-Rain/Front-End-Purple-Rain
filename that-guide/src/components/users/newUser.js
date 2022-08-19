import { useNavigate } from "react-router-dom"


function NewUser() {
    const navigate = useNavigate();
    const handleReturnHome = (event) => {
        navigate("/");
    }
    return (
        <>
            <h1>New User</h1>
            <button onClick={handleReturnHome}>Return Home</button>
        </>

    )
}

export default NewUser