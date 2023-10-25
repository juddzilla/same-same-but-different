import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Icons/index.jsx';

import './styles.css';

const header = [
  { display: 'Home', to: '/' },
  { display: 'Play', to: '/play' },
  { display: 'Rules', to: '/rules' },
  { display: 'Join', to: '/join' }
];

export const footerLinks = [
  { display: 'Privacy', to: '/privacy' },
  { display: 'Terms', to: '/terms' },
  { display: 'Contact', to: '/contact' },
];

export default () => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // execute on location change
    setMenu(false);
  }, [location]);

  return (
    <header className={menu ? 'show-menu' : ''}>
      <div className='mobile-icon' onClick={() => setMenu(!menu)}>
        {Icon('menu')}
      </div>
      <div className='header-container'>
        {header.map((link, index) => (
            <Link to={link.to} key={index}>{link.display}</Link>
        ))}
        <div className='account'>
          <Link to='/account'>
            {Icon('account')}
          </Link>
        </div>
        <div className='footer-links'>
          {footerLinks.map((link, index) => (
              <Link to={link.to} key={index}>{link.display}</Link>
          ))}
        </div>
      </div>
    </header>
  );
};