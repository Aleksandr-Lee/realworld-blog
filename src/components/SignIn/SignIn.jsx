/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SignIn.scss';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    //  formState: { errors },
    //  watch,
  } = useForm();
  const onSubmit = (data) => console.log('отправлено', data);

  return (
    <div className="loginForm">
      <div className="loginForm__container">
        <h1 className="loginForm__title">Sign In</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form__label" htmlFor="emailAddress">
            Email address
          </label>
          <input
            className="form__input"
            type="text"
            placeholder="Email address"
            id="emailAddress"
            {...register('emailAddress', { required: true })}
          />
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="text"
            placeholder="Password"
            id="password"
            {...register('password', { required: true })}
          />
          <button className="form__submit" type="submit">
            Login
          </button>
        </form>
        <div className="footer">
          <span className="footer__text">Don’t have an account?</span>
          <Link to="/sign-up" className="footer__text footer__link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
