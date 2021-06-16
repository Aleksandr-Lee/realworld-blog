import actionTypes from '../actionsTypes';

const initialState = {
  articles: [],
  completeDownload: false,
  errorDownload: false,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default articlesReducer;
