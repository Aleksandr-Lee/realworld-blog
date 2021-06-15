/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
import React from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import Article from '../Article';
import './ListArticles.scss';

const ListArticles = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);

  const article = articles.map((item) => {
    return (
      <Article
        key={item.title + item.body + v4()}
        title={item.title}
        username={item.author.username}
        body={item.body}
        favoritesCount={item.favoritesCount}
        image={item.author.image}
        updatedAt={item.updatedAt}
        tagList={item.tagList}
      />
    );
  });

  return <ul className="container">{article}</ul>;
};

export default ListArticles;
