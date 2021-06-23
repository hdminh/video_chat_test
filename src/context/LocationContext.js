import React from 'react';

const LocationContext = React.createContext({
    location:{
        latitude: 0,
        longitude: 0
    }
}) 

export default LocationContext;