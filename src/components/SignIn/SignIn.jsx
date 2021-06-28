/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SignIn.scss';
import { useDispatch } from 'react-redux';
import { actionUserRegistration } from '../../redux/actions/users';

const SignIn = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    //  watch,
  } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch(
      'https://conduit.productionready.io/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          user: {
            email: data.emailAddress,
            password: data.password,
          },
        }),
      }
    );
    const result = await res.json();
    //  result.then((data) => console.log(data))
    dispatch(actionUserRegistration(result));
    //  localStorage.setItem('token', result.user.token);
    console.log(result);
  };

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
            {...register('emailAddress', {
              required: true,
              pattern:
                /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
            })}
          />
          {errors.emailAddress?.type === 'pattern' && (
            <span className="form__errorMessage">Invalid email address</span>
          )}
          {errors.emailAddress?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
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
            <span className="form__errorMessage">
              Your password needs to be at least 6 characters.
            </span>
          )}
          {errors.password?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
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
