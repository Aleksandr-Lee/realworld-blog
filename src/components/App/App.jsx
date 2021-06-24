/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import Header from '../Header';
import ListArticles from '../ListArticles';
import BlogService from '../../services/BlogService';
import PaginationArticle from '../PaginationArticle';
import ArticlePage from '../ArticlePage';
import SignIn from '../SignIn';
import {
  actionListArticles,
  actionCompleteDownload,
  actionErrorDownload,
  actionArticlesCount,
  actionPage,
} from '../../redux/actions/listArticles';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const completeDownload = useSelector(
    (state) => state.articlesReducer.completeDownload
  );
  const articlesCount = useSelector(
    (state) => state.articlesReducer.articlesCount
  );

  const articlesDisplay = useCallback(
    (offset) => {
      dispatch(actionCompleteDownload());
      new BlogService()
        .getListArticles(offset)
        .then((articles) => {
          dispatch(actionListArticles(articles.articles));
          if (articlesCount === 1) {
            dispatch(actionArticlesCount(articles.articlesCount));
          }
        })
        .catch(() => {
          dispatch(actionCompleteDownload());
          dispatch(actionErrorDownload());
        });
    },
    [dispatch, articlesCount]
  );

  useEffect(() => {
    articlesDisplay();
  }, [articlesDisplay]);

  const handlePageClick = (page = 1) => {
    dispatch(actionPage(page));
    const offset = 0 + (page - 1) * 5;
    articlesDisplay(offset);
  };

  const pagination = completeDownload ? (
    <PaginationArticle handlePageClick={handlePageClick} />
  ) : null;

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route path="/" component={ListArticles} exact />
        <Route path="/articles" component={ListArticles} exact />
        <Route path="/" render={() => pagination} exact />
        <Route path="/articles" render={() => pagination} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            return <ArticlePage slug={match.params} />;
          }}
        />
        <Route path="/sign-in" component={SignIn} exact />
      </div>
    </BrowserRouter>
  );
};

export default App;
