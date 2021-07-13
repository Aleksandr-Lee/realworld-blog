import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import BlogService from '../../services/BlogService';
import route from '../../route';
import ErrorIndicator from '../ErrorIndicator';
import {
  actionGetUser,
  actionSuccessfulLogin,
} from '../../redux/actions/users';
import classes from './SignIn.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const successfulLogin = useSelector(
    (state) => state.usersReducer.successfulLogin
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ emailAddress, password }) => {
    new BlogService()
      .getUsers(emailAddress, password)
      .then((users) => {
        if (users.errors) {
          dispatch(actionSuccessfulLogin(users));
        } else {
          dispatch(actionSuccessfulLogin(true));
          dispatch(actionGetUser(users));
          localStorage.setItem('token', JSON.stringify(users.user.token));
        }
      })
      .catch((error) => {
        dispatch(actionSuccessfulLogin(error.message));
      });
  };

  const loginFailed =
    typeof successfulLogin === 'object' ? (
      <p className={classes.loginFailed}>
        User with such data is not registered
      </p>
    ) : null;

  if (successfulLogin) {
    setTimeout(() => {
      dispatch(actionSuccessfulLogin(false));
    }, 5000);
  }

  if (typeof successfulLogin === 'string') {
    return <ErrorIndicator />;
  }

  if (!successfulLogin || typeof successfulLogin === 'object') {
    return (
      <div className={classes.loginForm}>
        {loginFailed}
        <div className={classes.loginForm__container}>
          <h1 className={classes.loginForm__title}>Sign In</h1>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={classes.form__label} htmlFor="emailAddress">
              Email address
            </label>
            <input
              className={
                errors.emailAddress?.type
                  ? `${classes.form__input} ${classes.error}`
                  : `${classes.form__input}`
              }
              type="text"
              placeholder="Email address"
              id="emailAddress"
              {...register('emailAddress', {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
              })}
            />
            {errors.emailAddress?.type === 'pattern' && (
              <span className={classes.form__errorMessage}>
                Invalid email address
              </span>
            )}
            {errors.emailAddress?.type === 'required' && (
              <span className={classes.form__errorMessage}>
                This is a required field
              </span>
            )}
            <label className={classes.form__label} htmlFor="password">
              Password
            </label>
            <input
              className={
                errors.password?.type
                  ? `${classes.form__input} ${classes.error}`
                  : `${classes.form__input}`
              }
              type="password"
              placeholder="Password"
              id="password"
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 40,
              })}
            />
            {(errors.password?.type === 'minLength' ||
              errors.password?.type === 'maxLength') && (
              <span className={classes.form__errorMessage}>
                Your password needs to be at least 6 characters.
              </span>
            )}
            {errors.password?.type === 'required' && (
              <span className={classes.form__errorMessage}>
                This is a required field
              </span>
            )}
            <button className={classes.form__submit} type="submit">
              Login
            </button>
          </form>
          <div className={classes.footer}>
            <span className={classes.footer__text}>Don’t have an account?</span>
            <Link
              to={route.signUp}
              className={`${classes.footer__text} ${classes.footer__link}`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <Redirect to={route.home} />;
};

export default SignIn;
