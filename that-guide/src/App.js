import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./components/homepage/Homepage";
import StartHike from "./components/StartHike/StartHike";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import Results from "./components/results/results";

function App() {
  const [baseURL, setBaseURL] = useState("https://thatguide.herokuapp.com");
  const [description, setDescription] = useState("");
  const [memeImage, setMemeImage] = useState("");
  const [team, setTeam] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const highestElevation = useState("");

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

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("This device doesn't support location services.");
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
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
          path="/hikeresults"
          element={
            <Results
              latitude={latitude}
              longitude={longitude}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
