import React from 'react';
import { Link, Outlet } from "react-router-dom";

const links = [
  { display: 'Home', to: '/' },
  { display: 'Play', to: '/play' },
  { display: 'Rules', to: '/rules' }
];

export default () => {
  return (
    <>
      <header>
        { links.map((link, index) => (
            <Link to={ link.to } key={index}>{ link.display }</Link>
        ))}

      </header>
      <Outlet />
    </>
  )
}
