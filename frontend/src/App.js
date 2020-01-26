import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Button } from 'rsuite';
import { AppContent } from './App.styles';

function App() {
  return (
    <AppContent>
      <Button appearance="primary"> Hello world </Button>
    </AppContent>
  );
}

export default App;
