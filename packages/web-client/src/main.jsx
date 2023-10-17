import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import API from './interfaces/public-host.js';
import Loading from './views/Loading.jsx';
import Login from './views/Login.jsx';
import Routes from "./routes.jsx";
import {RouterProvider} from "react-router-dom";

(async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // root.render(
  //     <React.StrictMode>
  //       <App />
  //     </React.StrictMode>
  // )
  root.render(
      <React.StrictMode>
        <Loading />
      </React.StrictMode>,
  )
  const authed = await API.AuthCheck();
  console.log('authed', authed);

  setTimeout(() => {
    if (!authed.success) {
      root.render(
          <React.StrictMode>
            <Login />
          </React.StrictMode>
      )
    } else {
      root.render(
          <React.StrictMode>
            <RouterProvider router={Routes} />
          </React.StrictMode>
      )
    }
  }, 500);

  // ReactDOM.createRoot(document.getElementById('root')).render(
  //     <React.StrictMode>
  //       <App />
  //     </React.StrictMode>,
  // )
})()


