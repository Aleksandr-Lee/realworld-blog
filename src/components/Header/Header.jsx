import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import noAvatar from '../../Assets/Images/noAvatar.svg';
import { actionLogOut } from '../../redux/actions/users';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.usersReducer.isAuth);
  const users = useSelector((state) => state.usersReducer.users);

  return (
    <header className={classes.header}>
      <div className={classes.header__wrapper}>
        <Link to="/articles" className={classes.header__title}>
          Realdworld Blog
        </Link>
        {isAuth ? (
          <div className={classes.header__user}>
            <Link to="/new-article" className={classes.header__btnArticle}>
              Create article
            </Link>

            <Link to="/profile" className={classes.header__userName}>
              {users.user.username}
            </Link>
            <Link to="/profile">
              {' '}
              <img
                className={classes.header__userFoto}
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
              className={classes.header__logOut}
              onClick={() => dispatch(actionLogOut())}
            >
              Log Out
            </Link>
          </div>
        ) : (
          <div className={classes.header__authentication}>
            <Link
              to="/sign-in"
              className={`${classes.header__button} ${classes.button__signin}`}
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className={`${classes.header__button} ${classes.button__signup}`}
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
