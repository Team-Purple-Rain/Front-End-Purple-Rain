import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet.offline";
import "./Offline.css";
import { LocationCity } from "@mui/icons-material";
import * as AT_GEOJSON from "./jsons/AT.json";
import * as USA from "./jsons/usa.json";
import mapboxgl from "mapbox-gl";
// import Map from "react-offline-map";
import * as EAST_US from "./jsons/east_usa.json";

export const OfflineMap = ({ longitude, latitude }) => {
  const [map, setMap] = useState(null);
  const long = longitude;
  const lat = latitude;

  useEffect(() => {
    if (long && lat !== "loading...") {
      let map = L.map("offline_map").setView([lat, long], 13);
      if (map.current) return;
      if (map) {
        let line_layer = new L.GeoJSON(AT_GEOJSON).addTo(map);
        let east_usa = new L.GeoJSON(EAST_US).addTo(map);
        map.fitBounds(line_layer.getBounds());

        // var hikerIcon = L.icon({
        //   iconUrl: "../map/mapIcons/hiker.png",

        //   iconSize: [38, 95], // size of the icon
        //   // shadowSize: [50, 64], // size of the shadow
        //   // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        //   // shadowAnchor: [4, 62], // the same for the shadow
        //   // popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
        // });
        // L.marker([lat, long], { icon: hikerIcon }).addTo(map);

        // let style_layer = new L.GeoJSON(STYLE).addTo(map);
      }
    }
  }, [lat, long]);

  // useEffect(() => {
  //   let map = L.map("offline_map").setView([51.505, -0.09], 13);
  //   if (map) {
  //     L.tileLayer(
  //       "https://api.mapbox.com/styles/v1/rfrenia/cl73goh2i001x15mokh6g1wsc/tiles/6/18/23?access_token=pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA",
  //       {
  //         attribution:
  //           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //       }
  //     ).addTo(map);
  //     L.geoJSON(AT_GEOJSON).addTo(map);

  //     if (longitude && latitude) {
  //       const map = L.map("offline_map").setView(
  //         new L.LatLng(latitude, longitude),
  //         4
  //       );
  //       setMap(map);
  //     }
  //   }
  // }, [map]);

  return (
    <>
      {/* {longitude !== "loading..." ? (
        <Map width={800} height={600} />
      ) : (
        <div>Calculating Offline Data</div>
      )} */}

      <div id="offline_map"></div>
    </>
  );
};
