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

import classes from './Profile.module.scss';

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
    formState: { errors, isSubmitting },
  } = useForm();

  // eslint-disable-next-line no-undef
  console.log(isSubmitting);

  const onSubmit = ({ userName, emailAddress, password, avatarImage }) => {
    console.log(userName);
    if (isSubmitting) {
      setTimeout(() => {
        new BlogService()
          .updateUser(userName, emailAddress, password, avatarImage)
          .then((user) => {
            if (user.errors) {
              dispatch(actionSuccessfulEditProfile(user));
            } else {
              dispatch(actionUpdateUser(user));
              dispatch(
                actionSuccessfulEditProfile(constants.SUCCESSFUL_REQUEST)
              );
            }
          })
          .catch((error) => {
            dispatch(actionSuccessfulEditProfile(error.message));
            dispatch(actionErrorDownload());
          });
      }, 10000);
    }
  };

  const editUser =
    successEditProfile === constants.SUCCESSFUL_REQUEST ? (
      <p className={classes.successProfile}>Profile data changed</p>
    ) : null;

  const editProfileError =
    typeof successEditProfile === 'object' ? (
      <p className={classes.editProfileError}>
        A user with such data already exists
      </p>
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
    <div className={classes.editProfile}>
      {editUser}
      {editProfileError}
      <div className={classes.editProfile__container}>
        <h1 className={classes.editProfile__title}>Edit Profile</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.form__label} htmlFor="userName">
            Username
          </label>
          <input
            defaultValue={users.user.username}
            className={
              errors.userName?.type
                ? `${classes.form__input} ${classes.error}`
                : `${classes.form__input}`
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
            <span className={classes.form__errorMessage}>
              Username must be between 3 and 20 characters
            </span>
          )}
          {errors.userName?.type === 'required' && (
            <span className={classes.form__errorMessage}>
              This is a required field
            </span>
          )}
          <label className={classes.form__label} htmlFor="emailAddress">
            Email address
          </label>
          <input
            defaultValue={users.user.email}
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
            New password
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
          <label className={classes.form__label} htmlFor="avatarImage">
            Avatar image (url)
          </label>
          <input
            defaultValue={users.user.image}
            className={classes.form__input}
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
            <span className={classes.form__errorMessage}>
              Invalid url address
            </span>
          )}
          <button
            className={classes.form__submit}
            type="submit"
            disabled={isSubmitting}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
