/* eslint-disable no-shadow */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actionUpdateUser } from '../../redux/actions/users';
import BlogService from '../../services/BlogService';
import './Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const {
    register,
    handleSubmit,
    formState: { errors },
    //  watch,
  } = useForm();

  //   const onSubmit = (data) => {
  //     console.log(data);
  //   };
  console.log(users.user.token);
  const onSubmit = async ({ emailAddress, bio, avatarImage }) => {
    console.log(avatarImage);
    new BlogService()
      .updateUser(emailAddress, bio, avatarImage, users.user.token)
      .then((users) => {
        dispatch(actionUpdateUser(users));
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="editProfile">
      <div className="editProfile__container">
        <h1 className="editProfile__title">Edit Profile</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form__label" htmlFor="userName">
            Username
          </label>
          <input
            defaultValue={users.user.username}
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
            defaultValue={users.user.email}
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
            New password
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
          <label className="form__label" htmlFor="avatarImage">
            Avatar image (url)
          </label>
          <input
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
