import React from 'react';
import Article from '../Article';
import './ListArticles.scss';

const ListArticles = () => {
  return (
    <ul className="container">
      <Article />
      <Article />
      <Article />
      <Article />
      <Article />
    </ul>
  );
};

export default ListArticles;
