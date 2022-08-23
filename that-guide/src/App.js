import { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useInterval } from "use-interval";
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
  const [elevation, setElevation] = useState("calculating...");
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);
  const [mapObject, setMapObject] = useState();
  const [goalCoords, setGoalCoords] = useState([])

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  // Token to get elevation on navbar.
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA";

  const areYouLoggedIn = localStorage.getItem("log in");
  // console.log(areYouLoggedIn);

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

  useInterval(() => {
    async function getElevation() {
      // Construct the API request.
      const query = await fetch(
        `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${longitude},${latitude}.json?layers=contour&radius=3&limit=10&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      if (query.status !== 200) return;
      const data = await query.json();
      // Get all the returned features.
      const allFeatures = data.features;
      // console.log(allFeatures);
      // For each returned feature, add elevation data to the elevations array.
      const elevations = allFeatures.map((feature) => feature.properties.ele);
      // console.log(elevations);
      // In the elevations array, find the largest value.
      const highestElevation = Math.max(...elevations);

      const elevationConversion = highestElevation * 3.28;
      // console.log(elevationConversion);
      let roundedElevation = elevationConversion.toFixed(1);

      setElevation(roundedElevation);
    }
    getElevation();
  }, 7000);

  return (
    <>
      <div className="background">
        <div className="load-screen">
          <div className="title-header">
            <div className="mountains">
              <h3>Thru Hiker's Appalachian Trail Guide</h3>
              <h4>Take on the trail, one hike at a time.</h4>
            </div>
            <h4>
              Your Location: {latitude}, {longitude}
            </h4>
            <h4 className="elevation_div" id={elevation}>
              Current Elevation: {elevation} feet
            </h4>
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
                  goalCoords={goalCoords}
                  setGoalCoords={setGoalCoords}
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
                  elevation={elevation}
                  goalCoords={goalCoords}
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
                latitude={latitude}
                longitude={longitude}
                token={token}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
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
