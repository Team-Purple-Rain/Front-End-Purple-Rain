import OffLinePage from "./OffLinePage";
import { useBooleanState, usePrevious } from "webrix/hooks";
import { useEffect } from "react";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";
import Timer from "../stopwatch/timer/Timer";
import L from "leaflet";
import { OfflineMap } from "./OfflineMap";

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
              <OffLinePage StopWatch={StopWatch} Timer={Timer} />
            ) : (
              <>
                <a href="https://fieldmaps.arcgis.app/?itemID=e5f6d52b22ea4ee5966693b0f0c73e02&referenceContext=open&portalURL=https%3A%2F%2FliBuQQceys2oY8Bm.maps.arcgis.com">
                  click here for map
                </a>
                <a href="https://api.mapbox.com/styles/v1/rfrenia/cl73goh2i001x15mokh6g1wsc/tiles/6/18/24?access_token=pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA">
                  click here mapbox api
                </a>
                {children}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
