import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Assuming you have some global styles
import {Provider} from 'react-redux'
// import store from './Redux/store'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
       <App />
    {/* </Provider> */}
  </React.StrictMode>
);