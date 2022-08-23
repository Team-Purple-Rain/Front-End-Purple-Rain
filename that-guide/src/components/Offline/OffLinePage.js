import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import { useEffect, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useInterval } from "use-interval";
import axios from "axios";

export default function OffLinePage(props) {
  console.log(props);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [elevation, setElevation] = useState("calculating...");
  const [mapSrc, setMapSrc] = useState("./basic_staticAT.png");

  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  // Token to get elevation on navbar.
  mapboxgl.accessToken =
    "pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA";

  //   useInterval(() => {
  //     async function getElevation() {
  //       // Construct the API request.
  //       const query = await fetch(
  //         `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${longitude},${latitude}.json?layers=contour&radius=3&limit=10&access_token=${mapboxgl.accessToken}`,
  //         { method: "GET" }
  //       );
  //       if (query.status !== 200) return;
  //       const data = await query.json();
  //       // Get all the returned features.
  //       const allFeatures = data.features;
  //       // console.log(allFeatures);
  //       // For each returned feature, add elevation data to the elevations array.
  //       const elevations = allFeatures.map((feature) => feature.properties.ele);
  //       // console.log(elevations);
  //       // In the elevations array, find the largest value.
  //       const highestElevation = Math.max(...elevations);

  //       const elevationConversion = highestElevation * 3.28;
  //       // console.log(elevationConversion);
  //       let roundedElevation = elevationConversion.toFixed(1);

  //       setElevation(`${roundedElevation} feet`);
  //     }
  //     getElevation();
  //   }, 7000);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("This device doesn't support location services.");
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  setInterval(getLocation, 10000);

  return (
    <div>
      <div>
        <p>You're offline but we're still logging your hike!</p>
        <p>
          Your current coordinates are:
          <p>Latitude:{latitude}</p>
          <p>Longitude:{longitude}</p>
          <props.StopWatch />
        </p>
      </div>
    </div>
  );
}
