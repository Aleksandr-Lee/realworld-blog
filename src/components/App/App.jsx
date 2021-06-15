/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
import ListArticles from '../ListArticles';
import BlogService from '../../services/BlogService';
import { actionListArticles } from '../../redux/actions/listArticles';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);

  console.log(articles);
  const articlesDisplay = useCallback(() => {
    new BlogService()
      .getListArticles()
      .then((articles) => {
        //   console.log(articles.articles);
        dispatch(actionListArticles(articles.articles));
      })
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    articlesDisplay();
  }, [articlesDisplay]);

  return (
    <div className="App">
      <Header />
      <ListArticles />
    </div>
  );
};

export default App;
