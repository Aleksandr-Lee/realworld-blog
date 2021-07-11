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

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/articles" className="header__title">
          Realdworld Blog
        </Link>
        {isAuth ? (
          <div className="header__user">
            <Link to="/new-article" className="header__btnArticle">
              Create article
            </Link>
            <Link to="/profile" className="profile__name header__userName">
              {users.user.username}
            </Link>
            <Link to="/profile">
              {' '}
              <img
                className="profile__foto header__userFoto"
                src={
                  users.user.image === null || users.user.image === ''
                    ? noAvatar
                    : users.user.image
                }
                alt="foto"
              />
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
            <Link to="/sign-in" className="header__button button__signin">
              Sign In
            </Link>
            <Link to="/sign-up" className="header__button button__signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
