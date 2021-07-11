import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionArticles,
  actionErrorDownload,
  actionCompleteDownloadArticle,
  actionModalConfirmationWindow,
} from '../../redux/actions/listArticles';
import LoadingIndicator from '../LoadingIndicator';
import ModalConfirmationWindow from '../ModalConfirmationWindow';
import BlogService from '../../services/BlogService';
import ErrorIndicator from '../ErrorIndicator';
import Like from '../Like';
import './ArticlePage.scss';

const ArticlePage = ({ slug }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);
  const users = useSelector((state) => state.usersReducer.users);
  const isAuth = useSelector((state) => state.usersReducer.isAuth);
  const completeDownloadArticle = useSelector(
    (state) => state.articlesReducer.completeDownloadArticle
  );
  const errorDownload = useSelector(
    (state) => state.articlesReducer.errorDownload
  );
  const modalConfirmationWindow = useSelector(
    (state) => state.articlesReducer.modalConfirmationWindow
  );

  const getSlug = useCallback(() => {
    dispatch(actionCompleteDownloadArticle());
    new BlogService()
      .getArticle(slug.slug)
      .then((articlesList) => {
        dispatch(actionArticles(articlesList.article));
      })
      .catch(() => {
        dispatch(actionCompleteDownloadArticle());
        dispatch(actionErrorDownload());
      });
  }, [dispatch, slug.slug]);

  useEffect(() => {
    getSlug();
  }, [getSlug]);

  if (!completeDownloadArticle && !errorDownload) {
    return <LoadingIndicator />;
  }

  if (errorDownload) {
    return <ErrorIndicator />;
  }

  if (articles !== null) {
    const dateArticle = format(new Date(articles.updatedAt), 'MMMM dd, yyyy');

    const tag = articles.tagList.map((item) => (
      <span className="articlePage__tag" key={v4()}>
        {item}
      </span>
    ));

    return (
      <li className="articlePage">
        <div className="articlePage__header">
          <div>
            <div className="articlePage__data">
              <span className="articlePage__title">{articles.title}</span>
              <Like
                favorited={articles.favorited}
                favoritesCount={articles.favoritesCount}
                slug={slug.slug}
              />
            </div>
            {tag}
          </div>
          <div className="profile">
            <div className="profile__data">
              <span className="profile__name">{articles.author.username}</span>
              <span className="profile__date">{dateArticle}</span>
            </div>
            <img
              className="profile__foto"
              src={articles.author.image}
              alt="foto"
            />
          </div>
        </div>
        <div className="block__textButton">
          <p className="articlePage__text">{articles.description}</p>
          {isAuth && users.user.username === articles.author.username ? (
            <div>
              <button
                className="button button__delete"
                type="button"
                onClick={() => dispatch(actionModalConfirmationWindow(true))}
              >
                Delete
              </button>
              <Link
                to={`/articles/${slug.slug}/edit`}
                className="button button__edit"
                type="button"
              >
                Edit
              </Link>
            </div>
          ) : null}
          {modalConfirmationWindow ? (
            <ModalConfirmationWindow slug={slug} />
          ) : null}
        </div>
        <ReactMarkdown className="articlePage__text">
          {articles.body}
        </ReactMarkdown>
      </li>
    );
  }
  return null;
};

ArticlePage.propTypes = {
  slug: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ArticlePage;
