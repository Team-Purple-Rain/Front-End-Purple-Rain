import { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useInterval } from "use-interval";
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
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import ".//App.css";
import Spinner from "react-spinkit";
import { useBooleanState, usePrevious } from "webrix/hooks";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const setAuth = (username, token) => {
    setToken(token);
    setUsername(username);
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const isLoggedIn = username && token;
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const highestElevation = useState("");
  const [ID, setID] = useState(null);
  const [elevation, setElevation] = useState("calculating...");
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);
  const [mapObject, setMapObject] = useState();
  const [goalCoords, setGoalCoords] = useLocalStorageState(
    "goalCoords",
    [0, 0]
  );
  const [hikeType, setHikeType] = useLocalStorageState("hikeType", "");
  const [selectedHikeType, setSelectedHikeType] = useState(null);
  const [destination, setDestination] = useLocalStorageState("destination", "");
  const [destinationType, setDestinationType] = useLocalStorageState(
    "destinationType",
    ""
  );
  const [mileMarker, setMileMarker] = useLocalStorageState("milemarker", "")
  const [state, setState] = useLocalStorageState("state", "")
  const [startCoords, setStartCoords] = useLocalStorageState("startCoords", [0, 0])
  const [newStartElevation, setNewStartElevation] = useLocalStorageState("newStartElevation", 0)

  const {
    value: online,
    setFalse: setOffline,
    setTrue: setOnline,
  } = useBooleanState(navigator.onLine);
  const previousOnline = usePrevious(online);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  // Token to get elevation on navbar.
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA";

  const areYouLoggedIn = localStorage.getItem("log in");

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

  setInterval(getLocation, 7000);

  useInterval(() => {
    if (online) {
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
        // For each returned feature, add elevation data to the elevations array.
        const elevations = allFeatures.map((feature) => feature.properties.ele);
        // In the elevations array, find the largest value.
        const highestElevation = Math.max(...elevations);

        const elevationConversion = highestElevation * 3.28;

        let roundedElevation = elevationConversion.toFixed(0);

        setElevation(roundedElevation);
      }
      getElevation();

    }
  }, 7000);



  return (
    <>
      <div className="background">
        <div className="load-screen">
          <div className="title-header">
            <div className="mountains">
              <div className="header-text">
                <h3>Thru Hiker's Appalachian Trail Guide</h3>
              </div>
              <div>
                <h4 className="header-style">
                  Take on the trail, one hike at a time.
                </h4>
                <h4 className="header-style">
                  {latitude === ""
                    ? "Your Location: Calculating..."
                    : `Your Location: ${latitude}, ${longitude}`}
                </h4>
                <h4 className="elevation_div" id={elevation}>
                  {elevation === "calculating..."
                    ? "Current Elevation: Calculating..."
                    : `Current Elevation: ${elevation} feet`}
                </h4>
              </div>
            </div>
            {areYouLoggedIn ? (
              <div className="nav-bar" id="overlay">
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "##de9835",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white",
                  }}
                  onClick={handleSeeProfile}
                >
                  Go To Profile
                </Button>
                <Button
                  startIcon={<LogoutIcon />}
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#d95252",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white",
                  }}
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="nav-bar" id="overlay">
                <Button
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "##de9835",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white",
                  }}
                  onClick={handleNewUser}
                >
                  Create Profile
                </Button>
                <Button
                  startIcon={<LoginIcon />}
                  variant="contained"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#62b378",
                    padding: "10px",
                    fontSize: "calc(.7vw + .7vh + .5vmin)",
                    margin: "8px",
                    border: "1px solid white",
                  }}
                  onClick={handleLogIn}
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              hikeType={hikeType}
              setHikeType={setHikeType}
              selectedHikeType={selectedHikeType}
              setSelectedHikeType={setSelectedHikeType}
              latitude={latitude}
              longitude={longitude}
              goalCoords={goalCoords}
              setGoalCoords={setGoalCoords}
              setDestination={setDestination}
              destination={destination}
              setDestinationType={setDestinationType}
              online={online}
              setMileMarker={setMileMarker}
              setState={setState}
              setStartCoords={setStartCoords}
              setNewStartElevation={setNewStartElevation}
            />
          }
        />
        <Route
          path="/starthike"
          element={
            <StartHike
              longitude={longitude}
              latitude={latitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              highestElevation={highestElevation}
              goalCoords={goalCoords}
              hikeType={hikeType}
              setHikeType={setHikeType}
              selectedHikeType={selectedHikeType}
              setSelectedHikeType={setSelectedHikeType}
              destination={destination}
              elevation={elevation}
              destinationType={destinationType}
              online={online}
              mileMarker={mileMarker}
              state={state}
              startCoords={startCoords}
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
              hikeType={hikeType}
              elevation={elevation}
            />
          }
        />
        <Route path="/createuser" element={<NewUser />} />
        <Route
          path="/login"
          element={<LogIn setAuth={setAuth} setUsername={setUsername} />}
        />
        <Route
          path="/starthike"
          element={
            <StartHike
              longitude={longitude}
              latitude={latitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              highestElevation={highestElevation}
              goalCoords={goalCoords}
              hikeType={hikeType}
              setHikeType={setHikeType}
              selectedHikeType={selectedHikeType}
              setSelectedHikeType={setSelectedHikeType}
              destination={destination}
              elevation={elevation}
              setElevation={setElevation}
              online={online}
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
        <Route path="/createuser" element={<NewUser />} />
        <Route
          path="/login"
          element={<LogIn setAuth={setAuth} setUsername={setUsername} />}
        />
        <Route
          path="/logout"
          element={<LogOut setAuth={setAuth} token={token} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              username={username}
              latitude={latitude}
              longitude={longitude}
              token={token}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          }
        />
        <Route
          path="/editprofile"
          element={<EditProfile username={username} token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;
