import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from "react";
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
  // const bounds = [
  //   [-85.617648, 33.257538],
  //   [-73.043655, 37.702501]
  // ];

  // const geoJson = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       geometry: {
  //         type: "Point",
  //         coordinates: [longitude, latitude],
  //       },
  //       properties: {
  //         title: "Mapbox",
  //         description: "UserLocation",
  //       },
  //     },
  //   ],
  // };

  useEffect(() => {
    // creating new map with style and center location
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rfrenia/cl6xss090001714pg664smgvh",
      center: [longitude, latitude],
      zoom: zoom,
      // maxBounds: bounds
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

  // function that updates the marker's long lat
  function updateUserMarker() {
    if (mapObject) {
      userMarker.setLngLat([longitude, latitude]);
    }
  }

  // setInterval(updateUserMarker, 8000)

  updateUserMarker()

  // function to re-center map around User
  function setMapCenter(coords) {
    if (mapObject) {
      mapObject.flyTo(coords);
    }
  }

  return (
    <>
      <div ref={mapContainer} className="map-container"></div>
      <button onClick={() => setMapCenter({ center: [longitude, latitude] })}>
        Return to Current Location
      </button>
    </>
  );
}
