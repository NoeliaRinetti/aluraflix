import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isNuevoVideoPage = location.pathname === '/nuevo-video';

  return (
    <header className="header">
      <div className="header__logo">ALURAFLIX</div>
      <nav className="header__nav">
        <Link
          to="/"
          className={`header__link ${
            isHomePage ? 'header__link--home' : 'header__link--nuevo-video'
          }`}
        >
          Home
        </Link>
        <Link
          to="/nuevo-video"
          className={`header__link ${
            isNuevoVideoPage ? 'header__link--home' : 'header__link--nuevo-video'
          }`}
        >
          Nuevo Video
        </Link>
      </nav>
    </header>
  );
};

export default Header;
