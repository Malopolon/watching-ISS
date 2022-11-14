import React, { useEffect, useCallback, useRef, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

import { useFetch } from "../customHooks/useFetch";

import "./MapComponent.css";
import { IData } from "../../types";

const containerStyle = {
  width: "auto",
  height: "600px",
};

export const Map = () => {
  const { data, isLoading } = useFetch(
    "http://api.open-notify.org/iss-now.json"
  );
  const [center, setCenter] = useState<
    | google.maps.LatLng
    | google.maps.LatLngLiteral
    | {
        lat: number;
        lng: number;
      }
  >({ lat: 0, lng: 0 });

  const [coordinates, setCoords] = useState<{
    lat: number;
    lng: number;
  }>();
  const mapRef = useRef<google.maps.Map>();

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = undefined;
  }, []);

  const tranformedData = (data: IData) => {
    if (!isLoading) {
      const positionIss = {
        lat: Number(data.iss_position.latitude),
        lng: Number(data.iss_position.longitude),
      };
      setCenter(positionIss);
      setCoords(positionIss);
    }
  };

  useEffect(() => tranformedData(data!), [data]);
  return (
    <div>
      <div className="map-header">
        <h5>ISS is now located at:</h5>
        <span>
          <span>longitude: {coordinates?.lat || "Not loaded yet"} </span>
          <span>latitude: {coordinates?.lng || "Not loaded yet"} </span>
        </span>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={5}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerF
          position={center}
          icon={"http://open-notify.org/Open-Notify-API/map/ISSIcon.png"}
        />
      </GoogleMap>
    </div>
  );
};
