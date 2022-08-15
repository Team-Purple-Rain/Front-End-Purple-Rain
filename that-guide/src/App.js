import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./components/Homepage";

function App() {
  const [baseURL, setBaseURL] = useState("https://thatguide.herokuapp.com");
  const [description, setDescription] = useState("");
  const [memeImage, setMemeImage] = useState("");
  const [team, setTeam] = useState("");

  return (
    <>
      <div className="title-header">
        <h1>T.H.A.T. Guide</h1>
        <h3>Your interactive guide to the Appalachian Trail.</h3>
      </div>
      <div className="nav-bar">
        <h3>(Here is where our navbar might go, scooter or beyond version) </h3>
      </div>

      <Homepage />
    </>
  );

  // Lisa's test of our endpoints below:
  //   useEffect(() => {
  //     axios.get(`${baseURL}`).then((res) => {
  //       setDescription(res.data.description);
  //       setMemeImage(res.data.meme_image);
  //       setTeam(res.data.team);
  //     });
  //   });
  //   return (
  //     <>
  //       <h2>
  //         {" "}
  //         Hey {team}! {description}{" "}
  //       </h2>
  //       <img src={memeImage} width="250px" />
  //     </>
  //   );
}

export default App;
