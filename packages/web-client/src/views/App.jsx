import React from 'react';
import { Link, Outlet } from "react-router-dom";
import Header, { footerLinks } from '../components/Header';

export default () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        { footerLinks.map((link, index) => (
            <Link to={ link.to } key={index}>{ link.display }</Link>
        ))}
        <span>Judd Hendrix</span>
      </footer>
    </>
  )
}
