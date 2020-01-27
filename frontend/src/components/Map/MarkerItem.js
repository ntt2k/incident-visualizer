import React, { useState } from 'react';
import { Marker } from 'react-map-gl';
import { Icon } from 'rsuite';
import PopupItem from './PopupItem';

const MarkerItem = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { marker } = props;

  return (
    <>
      <Marker longitude={marker.long} latitude={marker.lat}>
        <Icon
          icon="truck"
          size="2x"
          onMouseEnter={() => setOpenPopup(true)}
          onMouseLeave={() => setOpenPopup(false)}
        />
      </Marker>
      {openPopup && <PopupItem marker={marker} setOpenPopup={setOpenPopup} />}
    </>
  );
};

export default MarkerItem;
