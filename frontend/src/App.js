import React, { useState } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { AppContent } from './App.styles';
import Map from './components/Map';
import Upload from './components/Upload';
import JsonViewer from './components/JsonViewer';
import { calculateMarkers } from './utility';

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
