import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import BlogService from '../../services/BlogService';
import ErrorIndicator from '../ErrorIndicator';
import constants from '../../constants';
import {
  actionUpdateUser,
  actionSuccessfulEditProfile,
} from '../../redux/actions/users';
import { actionErrorDownload } from '../../redux/actions/listArticles';

import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const successEditProfile = useSelector(
    (state) => state.usersReducer.successfulEditProfile
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ userName, emailAddress, password, avatarImage }) => {
    new BlogService()
      .updateUser(userName, emailAddress, password, avatarImage)
      .then((user) => {
        if (user.errors) {
          dispatch(actionSuccessfulEditProfile(user));
        } else {
          dispatch(actionUpdateUser(user));
          dispatch(actionSuccessfulEditProfile(constants.SUCCESSFUL_REQUEST));
        }
      })
      .catch((error) => {
        dispatch(actionSuccessfulEditProfile(error.message));
        dispatch(actionErrorDownload());
      });
  };

  const editUser =
    successEditProfile === constants.SUCCESSFUL_REQUEST ? (
      <p className="successProfile">Profile data changed</p>
    ) : null;

  const editProfileError =
    typeof successEditProfile === 'object' ? (
      <p className="editProfileError">A user with such data already exists</p>
    ) : null;

  if (
    successEditProfile === constants.SUCCESSFUL_REQUEST ||
    typeof successEditProfile === 'object'
  ) {
    setTimeout(() => {
      dispatch(actionSuccessfulEditProfile(false));
    }, 5000);
  }

  if (errorDownload) {
    return <ErrorIndicator />;
  }

  return (
    <div className="editProfile">
      {editUser}
      {editProfileError}
      <div className="editProfile__container">
        <h1 className="editProfile__title">Edit Profile</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form__label" htmlFor="userName">
            Username
          </label>
          <input
            defaultValue={users.user.username}
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
            defaultValue={users.user.email}
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
            New password
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
          <label className="form__label" htmlFor="avatarImage">
            Avatar image (url)
          </label>
          <input
            defaultValue={users.user.image}
            className="form__input"
            type="text"
            placeholder="Avatar image"
            id="avatarImage"
            {...register('avatarImage', {
              required: false,
              pattern:
                /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
            })}
          />
          {errors.avatarImage?.type === 'pattern' && (
            <span className="form__errorMessage">Invalid url address</span>
          )}
          <button className="form__submit" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
