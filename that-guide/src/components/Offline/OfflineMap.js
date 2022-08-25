import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet.offline";
import { generateOfflineTilelayer } from "./LeafletOffline/TileLayerOffline";
import { generateControlSavetiles } from "./LeafletOffline/ControlSaveTiles";
import "./Offline.css";
import { LocationCity } from "@mui/icons-material";
import AT_GEOJSON from "./features.json";
import Map from "react-offline-map";

export const OfflineMap = ({ longitude, latitude }) => {
  const [map, setMap] = useState(null);

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
      {longitude !== "loading..." ? (
        <Map
          width={800}
          height={600}
          latitude={longitude}
          longitude={latitude}
          zoom={4}
        />
      ) : (
        <div>Calculating Offline Data</div>
      )}

      <div id="offline_map"></div>
    </>
  );
};
