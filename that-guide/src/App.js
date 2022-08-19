import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./components/homepage/Homepage";
import StartHike from "./components/StartHike/StartHike";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import Results from "./components/results/results";
import Profile from "./components/profile/profile";
import NewUser from "./components/users/newUser";
import LogIn from "./components/users/logIn";
import LogOut from "./components/users/logout";
import EditProfile from "./components/profile/editProfile";

function App() {
  // code from card ID
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const setAuth = (username, token) => {
    setToken(token);
    setUsername(username);
  };

  const isLoggedIn = username && token;
  // end code from card  ID

  const [baseURL, setBaseURL] = useState("https://thatguide.herokuapp.com");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const highestElevation = useState("");
  const [ID, setID] = useState(null);

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    // console.log(latitude);
    // console.log(longitude);
    // console.log(position)
  }

  // function error() {
  //   alert('Please enable location services!')
  // }

  // const options = {
  //   enableHighAccuracy: false,
  //   maximumAge: 10000,
  //   timeout: 15000
  // }

  const navigate = useNavigate();

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("This device doesn't support location services.");
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  const handleSeeProfile = (event) => {
    navigate("/profile");
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
      <div className="title-header">
        <h1>T.H.A.T. Guide</h1>
        <h3>Thru Hiker's Appalachian Trail Guide</h3>
        <h4>Your interactive guide to the Appalachian Trail.</h4>
      </div>
      <div className="nav-bar">
        <h3>(Here is where our navbar might go, scooter or beyond version) </h3>
        <button onClick={handleSeeProfile}>Go To Profile</button>
        <button onClick={handleNewUser}>Create Profile</button>
        <button onClick={handleLogIn}>Log In</button>
        <button onClick={handleLogOut}>Log Out</button>
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
          path="/profile"
          element={<Profile token={token} username={username} />}
        />
        <Route
          path="/createuser"
          element={<NewUser />} />
        <Route
          path="/login"
          element={<LogIn setAuth={setAuth} />} />
        <Route
          path="/logout"
          element={
            <LogOut
              setAuth={setAuth}
              token={token} />}
        />
        <Route
          path="/profile"
          element={<Profile />} />
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
    </>
  );
}

export default App;
