import { combineReducers } from 'redux';
import articlesReducer from './listArticles';

const rootReducer = combineReducers({
  articlesReducer,
});

export default rootReducer;
