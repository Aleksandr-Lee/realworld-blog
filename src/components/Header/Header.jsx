/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Realdworld Blog</h1>
        <div className="header__authentication">
          <button className="header__button">Sign In</button>
          <button className="header__button header__button--active ">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
