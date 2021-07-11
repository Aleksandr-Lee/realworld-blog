import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import BlogService from '../../services/BlogService';
import ErrorIndicator from '../ErrorIndicator';
import constants from '../../constants';
import { actionSuccessfulCreate } from '../../redux/actions/users';
import { actionErrorDownload } from '../../redux/actions/listArticles';
import './SignUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const successfulCreate = useSelector(
    (state) => state.usersReducer.successfulCreate
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = ({ userName, emailAddress, password }) => {
    new BlogService()
      .setUserRegistration(userName, emailAddress, password)
      .then((users) => {
        if (users.errors) {
          dispatch(actionSuccessfulCreate(users));
        } else {
          dispatch(actionSuccessfulCreate(constants.SUCCESSFUL_REQUEST));
        }
      })
      .catch((error) => {
        dispatch(actionSuccessfulCreate(error.message));
        dispatch(actionErrorDownload());
      });
  };

  const createFailed =
    typeof successfulCreate === 'object' ? (
      <p className="createError">Such a user exists</p>
    ) : null;

  const createUser =
    successfulCreate === constants.SUCCESSFUL_REQUEST ? (
      <p className="createSuccess">You have successfully registered</p>
    ) : null;

  if (
    successfulCreate === constants.SUCCESSFUL_REQUEST ||
    typeof successfulCreate === 'object'
  ) {
    setTimeout(() => {
      dispatch(actionSuccessfulCreate(false));
    }, 5000);
  }

  if (errorDownload) {
    return <ErrorIndicator />;
  }

  return (
    <div className="regForm">
      {createFailed}
      {createUser}
      <div className="regForm__container">
        <h1 className="regForm__title">Create new account</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form__label" htmlFor="userName">
            Username
          </label>
          <input
            className={
              errors.userName?.type ? 'form__input--error' : 'form__input'
            }
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
            className={
              errors.emailAddress?.type ? 'form__input--error' : 'form__input'
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
            <span className="form__errorMessage">Invalid email address</span>
          )}
          {errors.emailAddress?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className={
              errors.password?.type ? 'form__input--error' : 'form__input'
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
            className={
              errors.repeatPassword?.type ? 'form__input--error' : 'form__input'
            }
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
              className="checkbox__input"
              type="checkbox"
              id="checkbox"
              {...register('checkbox', { required: true })}
            />
            <label
              className={`checkbox__label${
                errors.checkbox?.type ? '--error' : ''
              }`}
              htmlFor="checkbox"
            >
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
