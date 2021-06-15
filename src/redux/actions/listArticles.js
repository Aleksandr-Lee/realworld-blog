/* eslint-disable import/prefer-default-export */
import actionTypes from '../actionsTypes';

export const actionListArticles = (articles) => ({
  type: actionTypes.getArticles,
  articles,
});
