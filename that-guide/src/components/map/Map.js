import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterval } from "use-interval";
import "./map.css";
import { water } from "./sources/water";
import { shelter } from "./sources/shelter";
import myImage from "./mapIcons/smol.png";
import waterImage from "./mapIcons/smolwater.png";
import Button from "@mui/material/Button";
import { useBooleanState, usePrevious } from "webrix/hooks";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA";

export default function Map({
  latitude,
  longitude,
  setGoalCoords,
  setHikeType,
  setSelectedHikeType,
  setDestination,
  setDestinationType,
  online,
  setMileMarker,
  setState,
  setStartCoords
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

    // adding a scale to the map
    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: "imperial",
    });
    map.addControl(scale);
    scale.setUnit("imperial");
    // adding navigation control box to map
    map.addControl(new mapboxgl.NavigationControl());

    // adding user marker to map
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          maximumAge: 10000,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // adding shelter source markers to map
    map.on("load", () => {
      map.loadImage(myImage, (error, image) => {
        if (error) throw error;
        map.addImage("shelter-marker", image);
        map.addSource("shelter-data", {
          type: "geojson",
          data: shelter,
        });

        map.addLayer({
          id: "shelters",
          type: "symbol",
          source: "shelter-data",
          minzoom: 8,
          layout: {
            "icon-image": "shelter-marker",
            "icon-allow-overlap": true,
            // Make the layer visible by default.
            visibility: "visible",
          },
        });

        // adding popups to icons
        map.on("click", "shelters", (e) => {
          map.flyTo({
            center: [
              e.features[0].properties.longitude,
              e.features[0].properties.latitude - 0.002,
            ],
            zoom: 15,
          });

          const title = e.features[0].properties.title;
          const coordinates = e.features[0].geometry.coordinates.slice();
          const stringMile = e.features[0].properties.mile
          const mile = parseInt(stringMile)
          const goalstate = e.features[0].properties.state

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `<h4>${e.features[0].properties.title}</h4>
              <p>Destination Type: Shelter</p>
          <p>Mile Marker: ${e.features[0].properties.mile}</p>
          <p>Coordinates: ${e.features[0].properties.latitude},${e.features[0].properties.longitude}</p>           
              <button type="button" id="btn">Start Hike</button>`
            )
            .addTo(map);
          const btn = document.getElementById("btn");
          btn.addEventListener("click", () => {
            setGoalCoords(coordinates);
            navigate("/starthike");
            setHikeType("Destination Hike");
            setSelectedHikeType("Destination Hike");
            setDestination(title);
            setDestinationType("Shelter");
            setMileMarker(mile);
            setState(goalstate);
            setStartCoords([latitude, longitude]);
          });
        });
      });

      // change cursor when hovering over the icon
      map.on("mouseenter", "shelters", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves
      map.on("mouseleave", "shelters", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    // adding water source markers to map
    map.on("load", () => {
      map.loadImage(waterImage, (error, image) => {
        if (error) throw error;
        map.addImage("water-marker", image);
        map.addSource("water-data", {
          type: "geojson",
          data: water,
        });

        map.addLayer({
          id: "water-sources",
          type: "symbol",
          source: "water-data",
          minzoom: 8,
          layout: {
            "icon-image": "water-marker",
            "icon-allow-overlap": true,
            // Make the layer visible by default.
            visibility: "visible",
          },
        });

        // adding popups to icons
        map.on("click", "water-sources", (e) => {
          map.flyTo({
            center: [
              e.features[0].properties.longitude,
              e.features[0].properties.latitude - 0.002,
            ],
            zoom: 15,
          });

          const coordinates = e.features[0].geometry.coordinates.slice();
          const title = e.features[0].properties.title;
          const mile = e.features[0].properties.mile
          const goalstate = e.features[0].properties.state

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `<h4>${e.features[0].properties.title}</h4>
              <p>Destination Type: Water Source</p>
        <p>Mile Marker: ${e.features[0].properties.mile}</p>
        <p>Coordinates: ${e.features[0].properties.latitude},${e.features[0].properties.longitude}</p>           
        <button type="button" id="btn">Start Hike</button>`
            )
            .addTo(map);
          const btn = document.getElementById("btn");
          btn.addEventListener("click", () => {
            setGoalCoords(coordinates);
            navigate("/starthike");
            setHikeType("Destination Hike");
            setSelectedHikeType("Destination Hike");
            setDestination(title);
            setDestinationType("Water Source");
            setMileMarker(mile);
            setState(goalstate);
            setStartCoords([latitude, longitude]);
          });
        });
      });

      // change cursor when hovering over the icon
      map.on("mouseenter", "water-sources", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "water-sources", () => {
        map.getCanvas().style.cursor = "";
      });

      function toggleButton() {
        var button = document.getElementsByClassName("mapboxgl-ctrl-geolocate");
        button[0].click();
      }

      toggleButton();
    });

    setMapObject(map);
  }, []);


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
      <div className="big-map-container">
        <div ref={mapContainer} className="map-container">
        </div>
      </div>
    </>
  );
}