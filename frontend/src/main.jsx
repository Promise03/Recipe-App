// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import { store } from './redux/store.js'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//    <Provider store={store}>
//      <App />
//    </Provider>
//   </StrictMode>,
// )
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom'; // <--- THIS IS WHERE IT BELONGS

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Only ONE BrowserRouter here */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);