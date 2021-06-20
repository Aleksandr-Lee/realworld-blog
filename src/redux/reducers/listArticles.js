import actionTypes from '../actionsTypes';

const initialState = {
  articlesList: [],
  articles: null,
  completeDownload: false,
  errorDownload: false,
  articlesCount: 1,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getArticlesList:
      return {
        ...state,
        articlesList: action.articlesList,
      };
    case actionTypes.getArticles:
      return {
        ...state,
        articles: action.articles,
      };
    case actionTypes.completeDownload:
      return {
        ...state,
        completeDownload: true,
      };
    case actionTypes.errorDownload:
      return {
        ...state,
        errorDownload: true,
      };
    case actionTypes.articlesCount:
      return {
        ...state,
        articlesCount: state.articlesCount + action.articlesCount - 1,
      };
    default:
      return state;
  }
};

export default articlesReducer;
