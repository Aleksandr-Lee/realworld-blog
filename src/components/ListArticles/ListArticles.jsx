import React from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import Article from '../Article';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import './ListArticles.scss';

const ListArticles = () => {
  const articlesList = useSelector(
    (state) => state.articlesReducer.articlesList
  );
  const completeDownload = useSelector(
    (state) => state.articlesReducer.completeDownload
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );

  const loadingIndicator = !completeDownload ? <LoadingIndicator /> : null;
  if (errorDownload) {
    return <ErrorIndicator />;
  }

  const articleList = articlesList.map((item) => (
    <Article
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
  ));

  return (
    <ul className="container">
      {loadingIndicator}
      {articleList}
    </ul>
  );
};

export default ListArticles;
