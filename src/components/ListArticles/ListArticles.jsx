import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import Article from '../Article';
import LoadingIndicator from '../LoadingIndicator';
import PaginationArticle from '../PaginationArticle';
import ErrorIndicator from '../ErrorIndicator';
import BlogService from '../../services/BlogService';
import {
  actionListArticles,
  actionCompleteDownload,
  actionErrorDownload,
  actionArticlesCount,
  actionPage,
} from '../../redux/actions/listArticles';
import './ListArticles.scss';

const ListArticles = () => {
  const dispatch = useDispatch();
  const articlesList = useSelector(
    (state) => state.articlesReducer.articlesList
  );
  const completeDownload = useSelector(
    (state) => state.articlesReducer.completeDownload
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );

  const page = useSelector((state) => state.articlesReducer.page);

  const articlesCount = useSelector(
    (state) => state.articlesReducer.articlesCount
  );

  const articlesDisplay = useCallback(
    (offset) => {
      dispatch(actionCompleteDownload());
      setTimeout(() => {
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
      }, 500);
    },
    [dispatch, articlesCount]
  );

  useEffect(() => {
    articlesDisplay(page);
  }, [articlesDisplay, page]);

  const handlePageClick = (changePage) => {
    dispatch(actionPage(changePage));
  };

  const pagination = completeDownload ? (
    <PaginationArticle handlePageClick={handlePageClick} />
  ) : null;

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
      favorited={item.favorited}
      favoritesCount={item.favoritesCount}
      image={item.author.image}
      updatedAt={item.updatedAt}
      tagList={item.tagList}
    />
  ));

  return (
    <>
      <ul className="container">
        {loadingIndicator}
        {articleList}
      </ul>
      {pagination}
    </>
  );
};

export default ListArticles;
