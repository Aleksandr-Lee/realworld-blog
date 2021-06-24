/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/articles" className="header__title">
          Realdworld Blog
        </Link>
        <div className="header__authentication">
          <Link to="/sign-in" className="header__button">
            Sign In
          </Link>
          <Link to="/sign-up" className="header__button ">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
