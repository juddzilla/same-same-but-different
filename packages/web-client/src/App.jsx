import React, { useState } from 'react';
import './App.css';

import { RouterProvider } from "react-router-dom";
import Routes from './routes.jsx';

export default async function() {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  )
}
