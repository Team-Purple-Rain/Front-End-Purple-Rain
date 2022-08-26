import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterval } from "use-interval";
import "./destinationMap.css";
import { water } from "./sources/water";
import { shelter } from "./sources/shelter";
import myImage from "./mapIcons/smol.png";
import waterImage from "./mapIcons/smolwater.png";
import Button from "@mui/material/Button";
import useLocalStorageState from "use-local-storage-state";
import * as turf from "@turf/turf";
import { AlignVerticalBottomTwoTone } from "@mui/icons-material";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA";

// Creating a geojson file to populate line
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [[0,0]],
      },
    },
  ],
  tolerance: 3.5,
};

export default function DestinationMap({
  destination,
  latitude,
  longitude,
  goalCoords,
  handleStop,
}) {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);
  const [mapObject, setMapObject] = useState();
  const [userMarker, setUserMarker] = useState();
  const [elevation, setElevation] = useState("calculating...");

  const bounds = [
    [-87.828608, 30.528864],
    [-62.377714, 50.682435],
  ];


  useEffect(() => {
    // creating new map with style and center location
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rfrenia/cl6zh412n000614qw9xqdrr6n",
      center: [longitude, latitude],
      zoom: zoom,
      maxBounds: bounds,
    });

    // adding scale and nav controls to map
    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: "imperial",
    });
    map.addControl(scale);
    scale.setUnit("imperial");
    map.addControl(new mapboxgl.NavigationControl());

    // adding user location marker/tracking
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // adding a line layer that tracks movement
    map.on("load", () => {
      map.addSource("line", {
        type: "geojson",
        lineMetrics: true,
        data: geojson,
      });

      map.addLayer({
        id: "line-animation",
        type: "line",
        source: "line",
        minzoom: 2,
        layout: {
          "line-cap": "round",
          "line-join": "round",
          visibility: "visible",
        },
        paint: {
          "line-color": "blue",
          "line-width": 12,
          "line-opacity": 0.8, 
        },
      });

      animateLine();

      //function to update map and animate line
      function animateLine() {
        // update the map
        map.getSource("line").setData(geojson);
        // Request the next frame of the animation.
        requestAnimationFrame(animateLine);
      }

      function toggleButton() {
        var button = document.getElementsByClassName("mapboxgl-ctrl-geolocate");
        button[0].click();
      }

      toggleButton()
    });

    // creates a User Location Marker at device location
    // const el = document.createElement("div");
    // el.className = "user-marker";

    // const userMark = new mapboxgl.Marker()
    //   .setLngLat([longitude, latitude])
    //   .addTo(map); }*

    // creates a goal marker at goal location
    const element = document.createElement("div");
    element.className = "goal-marker";

    element.addEventListener("click", () => {
      map.flyTo({
        center: goalCoords,
      });
    });

    const goalMark = new mapboxgl.Marker(element)
      .setLngLat(goalCoords)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h4>${destination}</h4>
            <p>Coordinates: ${goalCoords}</p>`
        )
      )
      .addTo(map);

    // setUserMarker(userMark);
    setMapObject(map);
  }, []);

  // functions to populate geoJSON points for line
  function addLinePoints() {
    // append new coordinates to the lineString
    const x = longitude;
    const y = latitude;
    const p = geojson.features[0].geometry.coordinates
    p.push([x, y],[x, y], [x, y], [x, y], [x, y], [x, y], [x, y]);
    return p
    }

  useEffect(() => {
  addLinePoints()
  console.log(geojson) 
  },[longitude,latitude])

  addLinePoints()

  function shift() {
    const p = geojson.features[0].geometry.coordinates
    p.shift()
    console.log("hello")
    return p
  }

  setTimeout(() => {
    shift()},500)

  // function to re-center map around User
  function setMapCenter(coords) {
    if (mapObject) {
      mapObject.flyTo(coords);
    }
  }

  // function to get Elevation
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

      setElevation(`${roundedElevation} feet`);
    }
    getElevation();
  }, 7000);

  // functions to check if User is near goal
  function checkCoords() {
    const goalLat = goalCoords[1];
    const goalLong = goalCoords[0];
    if (
      goalLat > latitude - 0.00020 &&
      goalLat < latitude + 0.00020 &&
      goalLong > longitude - 0.00020 &&
      goalLong < longitude + 0.00020
    ) {
      alert("Congrats! You've reached the destination!");
      handleStop();
    }
  }

    // function that updates the User marker's long lat
  // function updateUserMarker() {
  //   if (mapObject) {
  //     userMarker.setLngLat([longitude, latitude]);
  //   }
  // }

  // updateUserMarker();

  // function addLinePoints() {
  //   // append new coordinates to the lineString
  //   const x = longitude;
  //   const y = latitude;
  //   geojson.features[0].geometry.coordinates.push([x, y]);
  //   console.log(geojson);
  // }


  // let roundedLatitude = parseFloat(Number(latitude.toFixed(5)));
  // let roundedLongitude = parseFloat(Number(longitude.toFixed(5)));

  

  setInterval(checkCoords, 20000);

  return (
    <>
      <div className="big-map-container">
        <div ref={mapContainer} className="map-container"></div>
        <div className="location-button">
          <Button
            variant="contained"
            style={{
              borderRadius: 35,
              backgroundColor: "#21b6ae",
              padding: "10px",
              fontSize: "12px",
              margin: "10px",
            }}
            onClick={() =>
              setMapCenter({ center: [longitude, latitude], zoom: 15 })
            }
          >
            Return to Current Location
          </Button>
        </div>
      </div>
    </>
  );
}






