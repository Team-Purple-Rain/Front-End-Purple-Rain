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
            {/* <OffLinePage StopWatch={StopWatch} Timer={Timer} /> */}
            {!online ? (
              <OffLinePage StopWatch={StopWatch} Timer={Timer} />
            ) : (
              <>{children}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
