import { useState } from "react";

const LocalStorage = () => {
  const [localStorageData, setLocalStorageData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const hikeData = JSON.parse(localStorage.getItem("hike"));
  if (hikeData) {
    setLocalStorageData(hikeData);
    return (
      <div>
        {expanded ? (
          <div>
            {localStorageData.map((entry) => (
              <div>
                at {entry.time} seconds, you were at: {entry.latitude},
                {entry.longitude}
              </div>
            ))}
            <div onClick={setExpanded(false)}> hide local storage data</div>
          </div>
        ) : (
          <div onClick={setExpanded(true)}> see local storage data</div>
        )}
      </div>
    );
  }
};

export default LocalStorage;
