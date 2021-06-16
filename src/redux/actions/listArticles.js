/* eslint-disable import/prefer-default-export */
import actionTypes from '../actionsTypes';

export const actionListArticles = (articles) => ({
  type: actionTypes.getArticles,
  articles,
});

export const actionCompleteDownload = () => ({
  type: actionTypes.completeDownload,
});

export const actionErrorDownload = () => ({
  type: actionTypes.errorDownload,
});
