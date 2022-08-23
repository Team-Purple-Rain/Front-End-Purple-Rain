import { useBooleanState, usePrevious } from "webrix/hooks";
import { useEffect } from "react";
import OffLinePage from "./OffLinePage";
import StopWatch from "../stopwatch/watch_display/WatchDisplay";

export default function Offline({ children }) {
  console.log(children);
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
            {!online ? <OffLinePage StopWatch={StopWatch} /> : <>{children}</>}
          </div>
        </div>
      </div>
    </>
  );
}
