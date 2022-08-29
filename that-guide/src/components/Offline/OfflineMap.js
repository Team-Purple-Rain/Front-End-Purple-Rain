import { useState, useEffect } from "react";
import L, { marker } from "leaflet";
import "leaflet.offline";
import "./Offline.css";
import { LocationCity } from "@mui/icons-material";
import * as AT_GEOJSON from "./jsons/AT.json";
import * as EAST_US from "./jsons/east_usa.json";
import * as SHELTERS from "./jsons/shelters.json";
import * as WATER from "./jsons/water.json";
import tentMarker from "./icons/smol.png";
import waterDrop from "./icons/smolwater.png";

export const OfflineMap = ({ longitude, latitude }) => {
  const [map, setMap] = useState(null);
  const long = longitude;
  const lat = latitude;

  useEffect(() => {
    if (long && lat !== "loading...") {
      let map = L.map("offline_map").setView([lat, long], 30);
      if (map.current) return;
      if (map) {
        let line_layer = new L.GeoJSON(AT_GEOJSON, {
          style: { color: "#000080", weight: 1 },
        }).addTo(map);
        let east_usa = new L.GeoJSON(EAST_US, {
          style: { color: "#000000", weight: 1, opacity: 0.5 },
        }).addTo(map);
        map.fitBounds(line_layer.getBounds());

        const shelterIcon = new L.Icon({
          iconUrl: tentMarker,
          iconSize: [10, 10],
        });

        const waterIcon = new L.Icon({
          iconUrl: waterDrop,
          iconSize: [10, 10],
        });
        let shelter_layer = new L.GeoJSON(SHELTERS, {
          pointToLayer: (feature, latlng) => {
            return L.marker(latlng, { icon: shelterIcon });
          },
          onEachFeature: (feature = {}, layer) => {
            layer.bindPopup(`Shelter: ${feature.properties.title}`);
          },
        }).addTo(map);
        let water_layer = new L.GeoJSON(WATER, {
          pointToLayer: (feature, latlng) => {
            return L.marker(latlng, { icon: waterIcon });
          },
          onEachFeature: (feature = {}, layer) => {
            layer.bindPopup(`Water Source: ${feature.properties.title}`);
          },
        }).addTo(map);

        let hikerIcon = L.icon({
          iconUrl: "/icons/hiker.png",
          iconSize: [10, 10],
        });
        L.marker([lat, long], { icon: hikerIcon }).addTo(map);
      }
    }
  }, [lat, long]);

  return (
    <>
      <div id="offline_map"></div>
    </>
  );
};
