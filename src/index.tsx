import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// TODO: Add sales options from admin panel with banner and indicators to match
// FIXME: Add entrance animation for cart modal
// FIXME: Sort bar
// FIXME: Add quantity bar to product cards
