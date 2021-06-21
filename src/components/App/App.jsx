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
import {
  actionListArticles,
  actionCompleteDownload,
  actionErrorDownload,
  actionArticlesCount,
} from '../../redux/actions/listArticles';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const articlesList = useSelector(
    (state) => state.articlesReducer.articlesList
  );
  //   const articles = useSelector((state) => state.articlesReducer.articles);
  const articlesCount = useSelector(
    (state) => state.articlesReducer.articlesCount
  );
  console.log(articlesCount);
  const articlesDisplay = useCallback(
    (offset) => {
      new BlogService()
        .getListArticles(offset)
        .then((articles) => {
          dispatch(actionListArticles(articles.articles));
          if (articlesCount === 1) {
            dispatch(actionArticlesCount(articles.articlesCount));
          }
          dispatch(actionCompleteDownload());
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

  const handlePageClick = (page) => {
    const offset = 0 + (page - 1) * 5;
    articlesDisplay(offset);
  };

  const pagination = articlesList.length ? (
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
      </div>
    </BrowserRouter>
  );
};

export default App;
