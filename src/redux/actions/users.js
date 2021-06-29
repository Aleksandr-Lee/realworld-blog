/* eslint-disable import/prefer-default-export */
import actionTypes from '../actionsTypes';

export const actionGetUser = (users) => ({
  type: actionTypes.getUser,
  users,
});

export const actionLogOut = () => ({
  type: actionTypes.logOut,
});

export const actionUpdateUser = (users) => ({
  type: actionTypes.updateUser,
  users,
});
