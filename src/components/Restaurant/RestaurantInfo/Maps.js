import React, { useContext } from "react";
import GoogleMapReact from 'google-map-react';
import { RestaurantContext } from "../../../context/RestaurantContext";

export default function Maps() {
    const { restaurantContext } = useContext(RestaurantContext);
    const [restaurant, setRestaurant] = restaurantContext;
    const center = restaurant.location;
    const zoom = 16;
    const renderMarkers = (map, maps) => {
      let marker = new maps.Marker({
        position: restaurant.location,
        map,
        title: 'Hello World!'
      });
    }
  return (
    <div style={{ height: '80vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY}}
      defaultCenter={center}
      defaultZoom={zoom}
      onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
    >
    </GoogleMapReact>
  </div>
  );
}
