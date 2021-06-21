/* eslint-disable import/prefer-default-export */
import actionTypes from '../actionsTypes';

export const actionListArticles = (articlesList) => ({
  type: actionTypes.getArticlesList,
  articlesList,
});

export const actionArticles = (articles) => ({
  type: actionTypes.getArticles,
  articles,
});

export const actionCompleteDownload = () => ({
  type: actionTypes.completeDownload,
});

export const actionErrorDownload = () => ({
  type: actionTypes.errorDownload,
});

export const actionArticlesCount = (articlesCount) => ({
  type: actionTypes.articlesCount,
  articlesCount,
});

// export const actionPage = (page) => ({
// 	type: actionTypes.page,
// 	page,
//  });
