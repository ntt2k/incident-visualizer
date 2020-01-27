import React, { useState } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { AppContent } from './App.styles';
import Upload from './components/Upload';
import JsonViewer from './components/JsonViewer';

function App() {
  const [data, setData] = useState({});

  return (
    <AppContent>
      <Upload setData={setData} />
      <JsonViewer theme="flat" src={data} />
    </AppContent>
  );
}

export default App;
