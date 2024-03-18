import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function MapComponent({ profile }) {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: parseFloat(profile.latitude), // Replace with the latitude of the profile
    lng: parseFloat(profile.longitude), // Replace with the longitude of the profile
  };
  return (
    // put API key that time map work fine
    <LoadScript googleMapsApiKey="Your-API-Key">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
