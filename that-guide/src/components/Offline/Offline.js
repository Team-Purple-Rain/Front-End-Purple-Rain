import { useBooleanState, usePrevious } from "webrix/hooks";
import { useEffect } from "react";

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
            <p>You're not online</p>
            <p>Check your internet connection.</p>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
