import React, { useState } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";
// import { Navigate,  } from 'react-router-dom';

import { RouterProvider } from "react-router-dom";
import Routes from './routes.jsx';
const links = [
  { display: 'Home', to: '/' },
  { display: 'Play', to: '/games' },
  { display: 'Rules', to: '/games' }
];

export default () => {
  return (
    <>
      <header>
        { links.map(link => (
            <Link to={ link.to }>{ link.display }</Link>
        ))}

      </header>
      <Outlet />
    </>
  )
}
