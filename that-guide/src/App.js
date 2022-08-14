import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [baseURL, setBaseURL] = useState("https://thatguide.herokuapp.com");
  const [description, setDescription] = useState("");
  const [memeImage, setMemeImage] = useState("");
  const [team, setTeam] = useState("");

  useEffect(() => {
    axios.get(`${baseURL}`).then((res) => {
      setDescription(res.data.description);
      setMemeImage(res.data.meme_image);
      setTeam(res.data.team);
    });
  });
  return (
    <>
      <h2>
        {" "}
        Hey {team}! {description}{" "}
      </h2>
      <img src={memeImage} width="250px" />
    </>
  );
}

export default App;