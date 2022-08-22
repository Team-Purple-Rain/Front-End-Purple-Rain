import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./components/homepage/Homepage";
import StartHike from "./components/StartHike/StartHike";
import {
  Routes, Route, BrowserRouter as Router, useNavigate,
} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import Results from "./components/results/results";
import Profile from "./components/profile/profile";
import NewUser from "./components/users/newUser";
import LogIn from "./components/users/logIn";
import LogOut from "./components/users/logout";
import EditProfile from "./components/profile/editProfile";
import Button from "@mui/material/Button"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const setAuth = (username, token) => {
    setToken(token);
    setUsername(username);
  };
  const [selectedDistance, setSelectedDistance] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const highestElevation = useState("");
  const [ID, setID] = useState(null);

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  // function error() {
  //   alert('Please enable location services!')
  // }

  // const options = {
  //   enableHighAccuracy: false,
  //   maximumAge: 10000,
  //   timeout: 15000
  // }

  const areYouLoggedIn = localStorage.getItem("log in");
  console.log(areYouLoggedIn);

  const navigate = useNavigate();

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("This device doesn't support location services.");
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  const handleSeeProfile = (event) => {
    navigate("/profile")
  };
  const handleNewUser = (event) => {
    navigate("/createuser");
  };
  const handleLogIn = (event) => {
    navigate("/login");
  };
  const handleLogOut = (event) => {
    navigate("/logout");
  };

  setInterval(getLocation, 10000);



  return (
    <>
      <div className="background">
        <div className="load-screen">
          <div className="title-header">
            <div className="mountains">
              <h1>T.H.A.T. Guide</h1>
              <h3>Thru Hiker's Appalachian Trail Guide</h3>
              <h4>Your interactive guide to the Appalachian Trail.</h4>
            </div>
            {areYouLoggedIn ? (
              <div className="nav-bar" id="overlay">
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#21b6ae",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white"
                  }}
                  onClick={handleSeeProfile}>Go To Profile</Button>
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
                  onClick={handleLogOut}>Log Out</Button>
              </div>
            ) : (
              <div className="nav-bar" id="overlay">
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#21b6ae",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white"
                  }}
                  onClick={handleNewUser}>Create Profile</Button>
                <Button
                  startIcon={<LoginIcon />}
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#62b378",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white"
                  }}
                  onClick={handleLogIn}>Log In</Button>
              </div>
            )}


          </div>

          <Routes>
            <Route
              path="/"
              element={
                <Homepage
                  setSelectedDistance={setSelectedDistance}
                  selectedDistance={selectedDistance}
                  latitude={latitude}
                  longitude={longitude}
                />
              }
            />
            <Route
              path="/starthike"
              element={
                <StartHike
                  selectedDistance={selectedDistance}
                  longitude={longitude}
                  latitude={latitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  highestElevation={highestElevation}
                />
              }
            />
            <Route
              path="/hikeresults/:ID"
              element={
                <Results
                  latitude={latitude}
                  longitude={longitude}
                  setID={setID}
                  ID={ID}
                />
              }
            />
            <Route
              path="/createuser"
              element={<NewUser />} />
            <Route
              path="/login"
              element={<LogIn
                setAuth={setAuth}
                setUsername={setUsername}
              />} />
            <Route
              path="/logout"
              element={
                <LogOut
                  setAuth={setAuth}
                  token={token} />}
            />
            <Route
              path="/profile"
              element={<Profile
                username={username}
                token={token}
              />}
            />
            <Route
              path="/editprofile"
              element={
                <EditProfile
                  username={username}
                  token={token}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
