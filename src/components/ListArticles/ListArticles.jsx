/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import Article from '../Article';
import LoadingIndicator from '../LoadingIndicator';
import BlogService from '../../services/BlogService';
import ErrorIndicator from '../ErrorIndicator';
import { actionArticles } from '../../redux/actions/listArticles';
import './ListArticles.scss';

const ListArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);
  const articlesList = useSelector(
    (state) => state.articlesReducer.articlesList
  );
  const completeDownload = useSelector(
    (state) => state.articlesReducer.completeDownload
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );

  const getSlug = useCallback(
    (slug) => {
      new BlogService().getArticle(slug).then((articles) => {
        dispatch(actionArticles(articles.article));
      });
    },
    [dispatch]
  );

  const loadingIndicator = !completeDownload ? <LoadingIndicator /> : null;
  if (errorDownload) {
    return <ErrorIndicator />;
  }

  
  const articleList = articlesList.map((item) => {
    return (
      <Article
        getSlug={getSlug}
        key={item.title + item.body + v4()}
        title={item.title}
        description={item.description}
        slug={item.slug}
        username={item.author.username}
        body={item.body}
        favoritesCount={item.favoritesCount}
        image={item.author.image}
        updatedAt={item.updatedAt}
        tagList={item.tagList}
      />
    );
  });

  return (
    <ul className="container">
      {loadingIndicator}
      {articleList}
    </ul>
  );
};

export default ListArticles;
