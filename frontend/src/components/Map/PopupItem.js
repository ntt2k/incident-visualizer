import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Popup } from 'react-map-gl';

const { REACT_APP_DARKSKY_API_KEY } = process.env;

const PopupItem = (props) => {
  const { marker, setOpenPopup } = props;
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const convertedTime = Date.parse(marker.timestamp);
    const time = convertedTime / 1000;

    axios
      .get(
        `/forecast/${REACT_APP_DARKSKY_API_KEY}/${marker.lat},${marker.long},${time}?exclude=hourly,daily,flags`
      )
      .then((res) => setWeather(res.data.currently.summary));
  });

  return (
    <Popup
      tipSize={10}
      anchor="bottom-right"
      longitude={marker.long}
      latitude={marker.lat}
      onMouseLeave={() => setOpenPopup(false)}
      closeOnClick={true}
    >
      <p>
        <strong>car_id:</strong> {marker.car_id}
        <br />
        <strong>unit_id:</strong> {marker.unit_id}
        <br />
        <strong>Timestamp:</strong> {marker.timestamp}
        <br />
        <strong>Status:</strong> {marker.status}
        <br />
        <strong>Weather:</strong> {weather}
      </p>
    </Popup>
  );
};

export default PopupItem;
