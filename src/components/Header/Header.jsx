/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import noAvatar from '../../Assets/Images/noAvatar.svg';
import { actionLogOut } from '../../redux/actions/users';
import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.usersReducer.isAuth);
  const users = useSelector((state) => state.usersReducer.users);

  if (users === undefined) {
    return {};
  }

  const avatar =
    users.image === null || users.image === undefined
      ? noAvatar
      : users.user.image;

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/articles" className="header__title">
          Realdworld Blog
        </Link>
        {isAuth ? (
          <div className="header__user">
            <button className="header__btnArticle">Create article</button>
            <Link to="/profile" className="profile__name header__userName">
              {users.user.username}
            </Link>
            <Link to="/profile" className="profile__foto header__userFoto">
              {' '}
              <img src={avatar} alt="foto" />
            </Link>
            <Link
              to="/"
              className="header__logOut"
              onClick={() => dispatch(actionLogOut())}
            >
              Log Out
            </Link>
          </div>
        ) : (
          <div className="header__authentication">
            <Link to="/sign-in" className="header__button">
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="header__button header__button--active "
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
