import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet.offline";
import { AddToDrive } from "@mui/icons-material";
import { LeafletOffline } from "leaflet.offline";
import { generateOfflineTilelayer } from "./LeafletOffline/TileLayerOffline";
import { generateControlSavetiles } from "./LeafletOffline/ControlSaveTiles";
import { MapContainer } from "react-leaflet";

export const OfflineMap = () => {
  const [map, setMap] = useState("");
  useEffect(() => {
    if (map) {
      const tileLayerOffline = generateOfflineTilelayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
        }
      );

      tileLayerOffline.addTo(map);

      const controlSaveTiles = generateControlSavetiles(tileLayerOffline, {
        zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
      });

      controlSaveTiles.addTo(map);
    }
  }, [map]);

  return (
    <MapContainer
      style={{ width: "100vw", height: "20vh" }}
      center={[63.446827, 10.421906]}
      zoom={0}
      scrollWheelZoom={false}
      whenCreated={setMap}
    ></MapContainer>
  );
};
