import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet.offline";
import { generateOfflineTilelayer } from "./LeafletOffline/TileLayerOffline";
import { generateControlSavetiles } from "./LeafletOffline/ControlSaveTiles";
import { MapContainer } from "react-leaflet";
import "./Offline.css";
import { LocationCity } from "@mui/icons-material";
import AT_GEOJSON from "./features.json";

export const OfflineMap = ({ longitude, latitude }) => {
  const [map, setMap] = useState("");

  useEffect(() => {
    let map = L.map("offline_map").setView(new L.LatLng(0, 0), 0);
    L.geoJSON(AT_GEOJSON).addTo(map);
  });

  // useEffect(() => {
  //   if (map) {
  //     const tileLayerOffline = generateOfflineTilelayer(
  //       "https://api.mapbox.com/styles/v1/rfrenia/cl73goh2i001x15mokh6g1wsc/tiles/0/0/0?access_token=pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA",
  //       {
  //         attribution:
  //           '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //         minZoom: 0,
  //       }
  //     );

  //     tileLayerOffline.addTo(map);

  //     const controlSaveTiles = generateControlSavetiles(tileLayerOffline, {
  //       zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
  //     });

  //     controlSaveTiles.addTo(map);
  //   }
  // }, [map]);

  return (
    <>
      <div id="offline_map"></div>
      {/* <MapContainer
        style={{ width: "100vw", height: "20vh" }}
        center={[63.446827, 10.421906]}
        zoom={0}
        scrollWheelZoom={false}
        whenCreated={setMap}
      ></MapContainer> */}
    </>
  );
};
