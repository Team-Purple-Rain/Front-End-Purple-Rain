import { useEffect } from "react";

export default function ElevationData(elevation) {
  useEffect(() => {
    console.log(elevation);
    return elevation;
  });
}
