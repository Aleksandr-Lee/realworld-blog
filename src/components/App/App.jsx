/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, useState } from 'react-redux';
import Header from '../Header';
import ListArticles from '../ListArticles';
import BlogService from '../../services/BlogService';
import PaginationArticle from '../PaginationArticle';
import {
  actionListArticles,
  actionCompleteDownload,
  actionErrorDownload,
} from '../../redux/actions/listArticles';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);
  // const [articleCount, setArticleCount] = useState(0);
  console.log(articles);
  const articlesDisplay = useCallback(() => {
    new BlogService()
      .getListArticles()
      .then((articles) => {
        console.log(articles);
        dispatch(actionListArticles(articles.articles));
        // setArticleCount(articles.articlesCount)
        dispatch(actionCompleteDownload());
      })
      .catch(() => {
        dispatch(actionCompleteDownload());
        dispatch(actionErrorDownload());
      });
  }, [dispatch]);

  useEffect(() => {
    articlesDisplay();
  }, [articlesDisplay]);

  //   handlePageClick = () => {
  //     // articlesDisplay();
  //     console.log('click');
  //   };

  return (
    <div className="App">
      <Header />
      <ListArticles />
      <PaginationArticle />
    </div>
  );
};

export default App;
