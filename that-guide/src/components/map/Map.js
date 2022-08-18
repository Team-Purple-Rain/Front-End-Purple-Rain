import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from "react";
import { useInterval } from "use-interval";
import "./map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA";

export default function Map({ latitude, longitude }) {
  // console.log(latitude);
  // console.log(longitude);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);
  const [mapObject, setMapObject] = useState();
  const [userMarker, setUserMarker] = useState();
  const [elevation, setElevation] = useState("calculating...");

  // useInterval(getElevation(), 10000);

  const bounds = [
    [-85.617648, 33.257538],
    [-73.043655, 37.702501],
  ];

  const geoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        properties: {
          title: "Mapbox",
          description: "UserLocation",
        },
      },
    ],
  };

  useEffect(() => {
    // creating new map with style and center location
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rfrenia/cl6xss090001714pg664smgvh",
      center: [longitude, latitude],
      zoom: zoom,
      maxBounds: bounds,
    });
    // adding zoom controls to map
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // adding markers to geoJson features
    // geoJson.features.map((feature) =>
    //   new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map)
    // );

    //creates a new marker at set long lat
    const userMark = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);
    setUserMarker(userMark);
    setMapObject(map);
  }, []);

  // getElevation();

  // function that updates the marker's long lat
  function updateUserMarker() {
    if (mapObject) {
      userMarker.setLngLat([longitude, latitude]);
    }
  }

  updateUserMarker();

  // function to re-center map around User
  function setMapCenter(coords) {
    if (mapObject) {
      mapObject.flyTo(coords);
    }
  }

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
      console.log(allFeatures);
      // For each returned feature, add elevation data to the elevations array.
      const elevations = allFeatures.map((feature) => feature.properties.ele);
      console.log(elevations);
      // In the elevations array, find the largest value.
      const highestElevation = Math.max(...elevations);

      const elevationConversion = highestElevation * 3.28;
      console.log(elevationConversion);
      setElevation(`${elevationConversion} feet`);
    }
    getElevation();
  }, 7000);

  return (
    <>
      <div ref={mapContainer} className="map-container"></div>
      <button onClick={() => setMapCenter({ center: [longitude, latitude] })}>
        Return to Current Location
      </button>
      <div className="current-stats">
        <h3>
          Current Coordinates: {latitude}, {longitude}
        </h3>
        <h3 className="elevation_div" id={elevation}>
          Current Elevation: {elevation}
        </h3>
      </div>
    </>
  );
}
