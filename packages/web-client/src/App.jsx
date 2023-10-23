import React from 'react';
import { Link, Outlet } from "react-router-dom";
import Icon from './components/Icons/index.jsx';

const header = [
  { display: 'Home', to: '/' },
  { display: 'Play', to: '/play' },
  { display: 'Rules', to: '/rules' },
  { display: 'Join', to: '/join' }
];

const footer = [
  { display: 'Privacy', to: '/privacy' },
  { display: 'Terms', to: '/terms' },
  { display: 'Contact', to: '/contact' },
];

export default () => {
  return (
    <>
      <header>
        <div className='header-container'>
          { header.map((link, index) => (
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
      <footer>
        { footer.map((link, index) => (
            <Link to={ link.to } key={index}>{ link.display }</Link>
        ))}
        <span>Judd Hendrix</span>
      </footer>
    </>
  )
}
