import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { Icon } from 'rsuite';

function renderPopup(marker, openPopup, setOpenPopup) {
  return (
    openPopup && (
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
        </p>
      </Popup>
    )
  );
}

const PopupItem = (props) => {
  const [ openPopup, setOpenPopup ] = useState(false);
  const { marker } = props;

  return (
    <div>
      <Marker longitude={marker.long} latitude={marker.lat}>
        <Icon
          icon="truck"
          size="2x"
          onMouseEnter={() => setOpenPopup(true)}
          onMouseLeave={() => setOpenPopup(false)}
        />
      </Marker>
      {renderPopup(marker, openPopup, setOpenPopup)}
    </div>
  );
};

export default PopupItem;
