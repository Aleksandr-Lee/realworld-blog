import actionTypes from '../actionsTypes';

const initialState = {
  articles: [],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getArticles:
      return {
        ...state,
        articles: action.articles,
      };
    default:
      return state;
  }
};

export default articlesReducer;
