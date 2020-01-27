import React, { useState } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { AppContent } from './App.styles';
import Map from './components/Map';
import Upload from './components/Upload';
import JsonViewer from './components/JsonViewer';

function calculateMarkers(data) {
  let result = data.apparatus.map(car => {
    return Object.keys(car.unit_status).map(key => {
      return {
        car_id: car.car_id,
        unit_id: car.unit_id,
        lat: car.unit_status[key].latitude,
        long: car.unit_status[key].longitude,
        timestamp: car.unit_status[key].timestamp,
        status: key
      }
    })
  })

  return result.flat();
}

function App() {
  const [data, setData] = useState({});

  const markersList = data.apparatus ? calculateMarkers(data) : [];

  return (
    <AppContent>
      <Map address={data.address} markersList={markersList} />
      <Upload setData={setData} />
      <JsonViewer src={data} />
    </AppContent>
  );
}

export default App;
