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
  selectedDistance,
  setSelectedDistance,
  setGoalCoords,
  setHikeType,
  setSelectedHikeType,
  setDestination,
  setDestinationType,
}) {
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

  // console.log(latitude);
  // console.log(longitude);
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
            ], zoom: 15,
          });

          const coordinates = e.features[0].geometry.coordinates.slice();
          const title = e.features[0].properties.title;

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

    // creates a User Location Marker at device location
    // const el = document.createElement("div");
    // el.className = "user-marker";

    // const userMark = new mapboxgl.Marker(el)
    //   .setLngLat([longitude, latitude])
    //   .addTo(map);

    // setUserMarker(userMark);
    setMapObject(map);
  }, []);

  // function that updates the User marker's long lat
  // function updateUserMarker() {
  //   if (mapObject) {
  //     userMarker.setLngLat([longitude, latitude]);
  //   }
  // }

  // updateUserMarker();

  // function to re-center map around User
  // function setMapCenter(coords) {
  //   if (mapObject) {
  //     mapObject.flyTo(coords);
  //   }
  // }

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
        // console.log(allFeatures);
        // For each returned feature, add elevation data to the elevations array.
        const elevations = allFeatures.map((feature) => feature.properties.ele);
        // console.log(elevations);
        // In the elevations array, find the largest value.
        const highestElevation = Math.max(...elevations);

        const elevationConversion = highestElevation * 3.28;
        // console.log(elevationConversion);
        let roundedElevation = elevationConversion.toFixed(0);

        setElevation(roundedElevation);
      }
      getElevation();
    }
  }, 7000);
  console.log(elevation);

  // let roundedLatitude = parseFloat(Number(latitude.toFixed(5)));
  // let roundedLongitude = parseFloat(Number(longitude.toFixed(5)));

  return (
    <>
      <div className="big-map-container">
        <div ref={mapContainer} className="map-container"></div>
        <div className="location-button">
          {/* <Button
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
          </Button> */}
        </div>
      </div>
    </>
  );
}

// for (const feature of water.features) {
//   // create a HTML element for each feature
//   const el = document.createElement("div");
//   el.className = "water-marker";
//   // el.addEventListener('click', function() {
//   //   window.alert("hi!")
//   // })

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el)
//     .setLngLat([feature.longitude,feature.latitude])
//     .addTo(map)
//     .on('click', (e)=>{
//       map.flyTo({center: [feature.longitude,feature.latitude]})
//     })
//     .setPopup(
//       new mapboxgl.Popup({ offset: 25 }) // add popups
//         .setHTML(
//           `<h4>${feature.title}</h4>
//           <p>Mile Marker: ${feature.mile}</p>
//           <p>Coordinates: ${e.features[0].latitude},${e.features[0].longitude}</p>
//           <button type="button" id="test">Test</button>`
//         )
//     )
//     .addTo(map);
// }

// for (const feature of shelterSources.features) {
//   // create a HTML element for each feature
//   const el = document.createElement("div");
//   el.className = "shelter-marker";
//   el.addEventListener('click', function() {
//     map.flyTo({center: [feature.longitude,feature.latitude]})
//   })

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el)
//     .setLngLat([feature.longitude,feature.latitude])
//     .addTo(map)
//     .setPopup(
//       new mapboxgl.Popup({ offset: 25 }) // add popups
//       .setHTML(
//           `<h4>${feature.title}</h4>
//           <p>County: ${feature.county}</p>
//           <p>State: ${feature.state}</p>
//           <p>Coordinates: ${feature.latitude},${feature.longitude}</p>
//           <button type="button" id="button">Test</button>`
//         )
//     )
//     .addTo(map);
//     }
