import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";
import "./homepage.css";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import Button from "@mui/material/Button";
import LoadingScreen from "react-loading-screen";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Homepage({
  selectedDistance,
  setSelectedDistance,
  latitude,
  longitude,
  setGoalCoords
}) {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSetDistance = (event) => {
    setSelectedDistance(event.target.value);
    console.log(event.target.value);
  };

  const handleStartHike = (event) => {
    navigate("/starthike");
    event.preventDefault();
    setError(null);
    console.log("You have started a hike.");
    if (selectedDistance) {
      console.log(selectedDistance);
    } else {
      console.log("user chose not to track distance");
      console.log(selectedDistance);
    }
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (latitude === "") {
    return (
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        text="Gathering location data for the Thru Hiker's Appalachian Trail Guide..."
      />
    );
  }

  return (
    <>
      <div className="load-screen">
        <div className="map-and-button">
          <div id="map">
            <Map latitude={latitude} longitude={longitude} setGoalCoords = {setGoalCoords}
/>
          </div>
        </div>
        <div>
          <h4 className="options">How do you want to hike today?</h4>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Select a destination.
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Choose your goal stop in the map above.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Click your desired water or shelter stop in the map above to
                start your hike.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Set a distance.
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Choose a distance you want to hike in miles.
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="dropdown-options">
                  <h4>I want to hike</h4>
                  <form
                    id="select-distance"
                    onSubmit={setSelectedDistance}
                  ></form>
                  <div className="hike-starter-container">
                    <TextField
                      label="Type desired distance"
                      style={{
                        borderRadius: 10,
                        backgroundColor: "white",
                        fontSize: "12px",
                        margin: "15px",
                      }}
                      id="filled-basic"
                      variant="filled"
                      onChange={(e) => setSelectedDistance(e.target.value)}
                    />
                    <h4>miles</h4>
                    <Button
                      style={{
                        borderRadius: 35,
                        backgroundColor: "#21b6ae",
                        padding: "10px",
                        fontSize: "12px",
                        margin: "10px",
                      }}
                      variant="contained"
                      type="submit"
                      className="start-hike"
                      onClick={handleStartHike}
                      onSubmit={handleSetDistance}
                    >
                      Start Hike
                    </Button>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Freeform hike.
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Choose this option to track a hike without a goal distance.
                Hiking results will be shown after pressing "Stop Hike."
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div>
                  <div className="dropdown-options">
                    <h4>I just want to hike!</h4>

                    <Button
                      style={{
                        borderRadius: 35,
                        backgroundColor: "#21b6ae",
                        padding: "10px",
                        fontSize: "12px",
                        margin: "10px",
                      }}
                      variant="contained"
                      type="submit"
                      className="start-hike"
                      onClick={handleStartHike}
                    >
                      {" "}
                      Start Hike
                    </Button>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}
