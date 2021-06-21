/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react';
import format from 'date-fns/format';
import ReactMarkdown from 'react-markdown';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { actionArticles } from '../../redux/actions/listArticles';
import BlogService from '../../services/BlogService';
import like from '../../Assets/Images/like.svg';
import './ArticlePage.scss';

const ArticlePage = ({ slug }) => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesReducer.articles);

  const getSlug = useCallback(() => {
    new BlogService().getArticle(slug.slug).then((articles) => {
      dispatch(actionArticles(articles.article));
    });
  }, [dispatch, slug.slug]);

  useEffect(() => {
    getSlug();
  }, [getSlug]);

  if (articles !== null) {
    const dateArticle = format(new Date(articles.updatedAt), 'MMMM dd, yyyy');

    const tag = articles.tagList.map((item) => (
      <span className="article__tag" key={v4()}>
        {item}
      </span>
    ));

    return (
      <li className="articlePage">
        <div className="article__header">
          <div>
            <div className="article__data">
              <span className="article__title">{articles.title}</span>
              <img className="article__like" src={like} alt="like" />
              <span className="article__likeCount">
                {articles.favoritesCount}
              </span>
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
        <p className="article__text">{articles.description}</p>
        <ReactMarkdown className="article__text">{articles.body}</ReactMarkdown>
      </li>
    );
  }
  return null;
};

export default ArticlePage;
