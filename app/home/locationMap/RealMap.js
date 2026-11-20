"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const markerIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div
      style="
        width: 42px;
        height: 42px;
        background: #2D2417;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        border: 3px solid white;
      "
    >
      <div
        style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
        "
      ></div>
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});

function LocationSelector({ location, setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return location ? (
    <Marker
      position={[location.latitude, location.longitude]}
      icon={markerIcon}
    />
  ) : null;
}

function FlyToLocation({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(
        [location.latitude, location.longitude],
        16,
        {
          duration: 1.5,
        }
      );
    }
  }, [location, map]);

  return null;
}

export default function RealMap({
  location,
  setLocation,
}) {
  const defaultCenter = [9.5624, 44.077];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationSelector
        location={location}
        setLocation={setLocation}
      />

      <FlyToLocation location={location} />
    </MapContainer>
  );
}