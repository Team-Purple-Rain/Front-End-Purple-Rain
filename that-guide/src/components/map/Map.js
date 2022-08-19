import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useState, useRef } from "react";
import { useInterval } from "use-interval";
import "./map.css";
import {water, superwater} from './sources/water'
import {shelterSources} from './sources/shelterSources'

mapboxgl.accessToken =
  "pk.eyJ1IjoicmZyZW5pYSIsImEiOiJjbDZvM2k5bXQwM2lzM2NvYWVvNmVjb3B6In0.ygD9Y7GQ6_FFQlLRCgcKbA";

export default function Map({ latitude, longitude }) {
  // console.log(latitude);
  // console.log(longitude);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(15);
  const [mapObject, setMapObject] = useState();
  const [userMarker, setUserMarker] = useState();
  const [elevation, setElevation] = useState("calculating...");
  
  // const bounds = [
  //   [-85.617648, 33.257538],
  //   [-73.043655, 37.702501],
  // ];

  useEffect(() => {
    // creating new map with style and center location
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rfrenia/cl6zh412n000614qw9xqdrr6n",
      center: [longitude, latitude],
      zoom: zoom,
      // maxBounds: bounds,
    });
    // adding zoom controls to map
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // adding water source markers to map
    map.on('load', () => {
      map.addSource('water-data',{
        type: 'geojson',
        data: superwater
      });

      map.addLayer({
        'id': 'superwater',
        'type': 'circle',
        'source': 'water-data',
        'layout': {
        // Make the layer visible by default.
        'visibility': 'visible'
        },
        'paint': {
        'circle-radius': 8,
        'circle-color': 'rgba(55,148,179,1)'
        },
        });
    })
    

    // for (const feature of water.features) {
    //   // create a HTML element for each feature
    //   const el = document.createElement("div");
    //   el.className = "water-marker";
    //   // el.addEventListener('click', function() {
    //   //   window.alert("hi!")
    //   // })

    //   // make a marker for each feature and add to the map
    //   new mapboxgl.Marker(el)
    //     .setLngLat([feature.longitude,feature.latitude])
    //     .addTo(map)
    //     .on('click', (e)=>{
    //       map.flyTo({center: [feature.longitude,feature.latitude]})
    //     })
    //     .setPopup(
    //       new mapboxgl.Popup({ offset: 25 }) // add popups
    //         .setHTML(
    //           `<h4>${feature.title}</h4>
    //           <p>Mile Marker: ${feature.mile}</p>
    //           <p>Coordinates: ${feature.latitude},${feature.longitude}</p>
    //           <button type="button" id="test">Test</button>`
    //         )
    //     )
    //     .addTo(map);
    // }

    // adding shelter source markers to map
    for (const feature of shelterSources.features) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.className = "shelter-marker";
      el.addEventListener('click', function() {
        map.flyTo({center: [feature.longitude,feature.latitude]})
      })

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat([feature.longitude,feature.latitude])
        .addTo(map)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
              `<h4>${feature.title}</h4>
              <p>County: ${feature.county}</p>
              <p>State: ${feature.state}</p>
              <p>Coordinates: ${feature.latitude},${feature.longitude}</p>
              <button type="button" id="button">Test</button>`
            )
        )
        .addTo(map);
        }

    // adding markers to geoJson features
    // waterGeoJson.features.map((feature) =>
    //   new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
    // );

    // creates a User Location Marker at device location
    const el = document.createElement('div')
    el.className = 'user-marker'

    const userMark = new mapboxgl.Marker(el)
      .setLngLat([longitude, latitude])
      .addTo(map);

    setUserMarker(userMark);
    setMapObject(map);
  }, []);

  // const button = document.getElementById('button')
  // button.addEventListener("click", function(e){alert('test')})

  // function that updates the marker's long lat
  function updateUserMarker() {
    if (mapObject) {
      userMarker.setLngLat([longitude, latitude]);
    }
  }

  updateUserMarker();

  // function to re-center map around User
  function setMapCenter(coords) {
    if (mapObject) {
      mapObject.flyTo(coords);
    }
  }

  useInterval(() => {
    async function getElevation() {
      // Construct the API request.
      const query = await fetch(
        `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${longitude},${latitude}.json?layers=contour&radius=3&limit=10&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      if (query.status !== 200) return;
      const data = await query.json();
      // Get all the returned features.
      const allFeatures = data.features;
      // console.log(allFeatures);
      // For each returned feature, add elevation data to the elevations array.
      const elevations = allFeatures.map((feature) => feature.properties.ele);
      // console.log(elevations);
      // In the elevations array, find the largest value.
      const highestElevation = Math.max(...elevations);

      const elevationConversion = highestElevation * 3.28;
      // console.log(elevationConversion);
      let roundedElevation = elevationConversion.toFixed(1);

      setElevation(`${roundedElevation} feet`);
    }
    getElevation();
  }, 7000);

  let roundedLatitude = parseFloat(latitude.toFixed(5));
  let roundedLongitude = parseFloat(longitude.toFixed(5));

  return (
    <>
      <div ref={mapContainer} className="map-container"></div>
      <button onClick={() => setMapCenter({ center: [longitude, latitude] })}>
        Return to Current Location
      </button>
      <div className="current-stats">
        <h3>
          Current Coordinates: {roundedLatitude}, {roundedLongitude}
        </h3>
        <h3 className="elevation_div" id={elevation}>
          Current Elevation: {elevation}
        </h3>
      </div>
    </>
  );
}
