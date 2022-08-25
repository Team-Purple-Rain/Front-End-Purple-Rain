import { getStorageInfo, downloadTile } from "leaflet.offline";
import { useState, useEffect } from "react";
import L from "leaflet.offline";
import "leaflet.offline";
import { AddToDrive } from "@mui/icons-material";

export const OfflineMap = () => {
  const [map, setMap] = useState(<div id="offline_map"></div>);

  useEffect(() => {
    const map = L.map("offline_map").setView([0, 0]);

    const tileLayerOffline = L.tileLayer
      .offline("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        useCache: true,
      })
      .addTo(map);

    // tileLayerOffline.addTo(map);
    const controlSaveTiles = L.control
      .savetiles(tileLayerOffline, {
        zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
      })
      .addTo(map);

    // controlSaveTiles.addTo(map);
  }, [map]);
  return (
    <>
      <div id="offline_map">{map}</div>
    </>
  );
};
