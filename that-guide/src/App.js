import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./components/homepage/Homepage";
import StartHike from "./components/StartHike/StartHike";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [baseURL, setBaseURL] = useState("https://thatguide.herokuapp.com");
  const [description, setDescription] = useState("");
  const [memeImage, setMemeImage] = useState("");
  const [team, setTeam] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  navigator.geolocation.watchPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(latitude);
    console.log(longitude);
  });

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
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
