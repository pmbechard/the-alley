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

// TODO: Add sales options from admin panel
// TODO: Add cart panel
// TODO: Add checkout page
// FIXME: Sort is reverted after switching categories
