import React from 'react';
import { Link, Outlet } from "react-router-dom";
import Icon from './components/Icons/index.jsx';

import './styles/common.css';

const links = [
  { display: 'Home', to: '/' },
  { display: 'Play', to: '/play' },
  { display: 'Rules', to: '/rules' },
  { display: 'Join', to: '/join' }
];

export default () => {
  return (
    <>
      <header>
        <div className='header-container'>
          { links.map((link, index) => (
              <Link to={ link.to } key={index}>{ link.display }</Link>
          ))}
          <div className='account'>
            <Link to='/account'>
              { Icon('account') }
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  )
}
