/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import format from 'date-fns/format';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import like from '../../Assets/Images/like.svg';
import './ArticlePage.scss';

const ArticlePage = () => {
  const articles = useSelector((state) => state.articlesReducer.articles);
  console.log(articles);
  const dateArticle = format(new Date(articles.updatedAt), 'MMMM dd, yyyy');

  const tag = articles.tagList.map((item) => {
    return (
      <span className="article__tag" key={v4()}>
        {item}
      </span>
    );
  });

  return (
    <li className="article">
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
      <p className="article__text">{articles.body}</p>
    </li>
  );
};

export default ArticlePage;
