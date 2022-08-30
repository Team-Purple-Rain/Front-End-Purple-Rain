import { useBooleanState, usePrevious } from "webrix/hooks";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import Timer from "../stopwatch/timer/Timer";
import "./Offline.css";
import { useEffect, useState, useRef } from "react";
import { useInterval } from "use-interval";
import "leaflet.offline";
import "./Offline.css";
import * as AT_GEOJSON from "./jsons/AT.json";
import * as EAST_US from "./jsons/east_usa.json";
import * as SHELTERS from "./jsons/shelters.json";
import * as WATER from "./jsons/water.json";
import tentMarker from "./icons/smol.png";
import waterDrop from "./icons/smolwater.png";
import hiker from "./icons/hiker.png";
import L, { marker } from "leaflet";
import "leaflet";
import "./Offline.css";
import { LocationCity } from "@mui/icons-material";
import maplibregl from "maplibre-gl";

export default function Offline({ children }) {
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
  return (
    <>
      <div className="offline">
        <div className="offline__content">
          <div className="offline__text">
            {!online ? (
              <OffLinePage
                StopWatch={StopWatch}
                Timer={Timer}
                online={online}
              />
            ) : (
              <>{children}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function OffLinePage(props) {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [ID, setID] = useState(null);

  const long = longitude;
  const lat = latitude;

  function success(position) {
    setLatitude(position.coords.latitude);
    console.log(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(position.coords.longitude);
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("This device doesn't support location services.");
    } else {
      navigator.geolocation.getCurrentPosition(success);
    }
  };

  useEffect(() => {
    const map = L.map("offline_map", {
      center: [30, -80],
      zoom: 40,
    });
    const container = L.DomUtil.get("offline_map");
    console.log(container._leaflet_id);
    if (container != null) {
      container._leaflet_id = null;
    }

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
    let hiker_layer = new L.GeoJSON(WATER, {
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, { icon: waterIcon });
      },
      onEachFeature: (feature = {}, layer) => {
        layer.bindPopup(`Water Source: ${feature.properties.title}`);
      },
    }).addTo(map);

    const hikerIcon = new L.icon({
      iconUrl: hiker,
      iconSize: [10, 10],
    });
    // var latlng = L.latlng(latitude, longitude);
    L.marker([36.147437, -82.009564], { icon: hikerIcon }).addTo(map);

    // let user = L.marker([36.147437, -82.009564], { icon: hikerIcon }).addTo(
    //   map
    // );
    // user.setLatLng(latlng);

    // let user = marker.setLatLng(latitude, longitude).addTo(map);
  }, []);

  useInterval(() => {
    getLocation();
    if (latitude && longitude !== 0) {
      console.log("new coordinates");
    }
  }, 10000);

  const handleStartHike = (event) => {
    console.log("hello button");
    setIsActive(true);
    setIsPaused(false);
    setIsStarted(true);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsPaused(true);
  };

  return (
    <div>
      <div className="offline-stats">
        <div>
          <h3>You're offline but we're still logging your hike!</h3>
        </div>
        <div>
          Your current coordinates are:
          <div>Latitude: {latitude}</div>
          <div>Longitude: {longitude}</div>
        </div>
      </div>
      <div id="div"></div>
      <div id="offline_map"></div>
      <props.StopWatch
        latitude={latitude}
        longitude={longitude}
        handleStartHike={handleStartHike}
        isActive={isActive}
        isPaused={isPaused}
        setIsActive={setIsActive}
        setIsPaused={setIsPaused}
        handlePauseResume={handlePauseResume}
        isStarted={isStarted}
        handleStop={handleStop}
        ID={ID}
        setID={setID}
      ></props.StopWatch>
    </div>
  );
}
