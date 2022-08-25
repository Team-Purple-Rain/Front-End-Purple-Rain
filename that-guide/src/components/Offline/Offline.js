import { useBooleanState, usePrevious } from "webrix/hooks";
import { useEffect } from "react";
import OffLinePage from "./OffLinePage";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import Timer from "../stopwatch/timer/Timer";
import L from "leaflet";

export default function Offline({ children }) {
  const {
    value: online,
    setFalse: setOffline,
    setTrue: setOnline,
  } = useBooleanState(navigator.onLine);
  const previousOnline = usePrevious(online);

  useEffect(() => {
    let map = L.map("offline_map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  });

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
            <div id="offline_map"></div>
            {/* {!online ? (
              <OffLinePage StopWatch={StopWatch} Timer={Timer} />
            ) : (
              <>{children}</>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}
