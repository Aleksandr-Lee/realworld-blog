/* eslint-disable object-shorthand */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BlogService from '../../services/BlogService';
import './SignUp.scss';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async ({ userName, emailAddress, password }) => {
    new BlogService()
      .setUserRegistration(userName, emailAddress, password)
      .then((users) => {
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
    //  const res = await fetch('https://conduit.productionready.io/api/users', {
    //    method: 'POST',
    //    headers: {
    //      'Content-Type': 'application/json;charset=utf-8',
    //    },
    //    body: JSON.stringify({
    //      user: {
    //        username: userName,
    //        email: emailAddress,
    //        password: password,
    //      },
    //    }),
    //  });
    //  const result = await res.json();
    //  //  result.then((data) => console.log(data))
    //  console.log(result);
  };

  return (
    <div className="regForm">
      <div className="regForm__container">
        <h1 className="regForm__title">Create new account</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form__label" htmlFor="userName">
            Username
          </label>
          <input
            className="form__input"
            type="text"
            placeholder="Username"
            id="userName"
            {...register('userName', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {(errors.userName?.type === 'minLength' ||
            errors.userName?.type === 'maxLength') && (
            <span className="form__errorMessage">
              Username must be between 3 and 20 characters
            </span>
          )}
          {errors.userName?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
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
          <label className="form__label" htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            className="form__input"
            type="password"
            placeholder="Repeat Password"
            id="repeatPassword"
            {...register('repeatPassword', { required: true })}
          />
          {watch('password') !== watch('repeatPassword') && (
            <span className="form__errorMessage">Passwords must match</span>
          )}
          {errors.repeatPassword?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
          <hr className="form__line" />
          <div className="form__checkbox">
            <input
              className="form__checkbox--input"
              type="checkbox"
              id="checkbox"
              {...register('checkbox', { required: true })}
            />
            {/* {errors.checkbox?.type === 'required' && (
              <span className="form__errorMessage">
                This is a required field
              </span>
            )} */}
            <label className="form__checkbox--label" htmlFor="checkbox">
              I agree to the processing of my personal information
            </label>
          </div>
          <button className="form__submit" type="submit">
            Create
          </button>
        </form>
        <div className="footer">
          <span className="footer__text">Already have an account?</span>
          <Link to="/sign-in" className="footer__text footer__link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
