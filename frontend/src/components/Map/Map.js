import React, { useState, useEffect } from 'react';
import MapGL from 'react-map-gl';
import PopupItem from './PopupItem';
import { StyledNavigationControl } from './Map.styles';

const { REACT_APP_MAP_GL_TOKEN } = process.env;

const Map = (props) => {
  const [viewport, setViewport] = useState({
    zoom: 10,
    bearing: 0,
    pitch: 0,
    width: '100%',
    height: 500
  });

  const { address, markersList } = props;

  useEffect(() => {
    setViewport((viewport) => {
      return {
        ...viewport,
        latitude: address ? address.latitude : 37.5407,
        longitude: address ? address.longitude : -77.436
      };
    });
  }, [address]);

  return (
    <MapGL
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/mapbox/streets-v10"
      mapboxApiAccessToken={REACT_APP_MAP_GL_TOKEN}
    >
      <StyledNavigationControl
        onViewportChange={(viewport) => setViewport(viewport)}
      />

      {markersList.map((marker, index) => (
        <PopupItem key={index} marker={marker} />
      ))}
    </MapGL>
  );
};

export default Map;
