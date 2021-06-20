/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from 'react';
import format from 'date-fns/format';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
// import BlogService from '../../services/BlogService';
import like from '../../Assets/Images/like.svg';
// import noAvatar from '../../Assets/Images/noAvatar.svg';
import './Article.scss';

const Article = ({
  title,
  username,
  description,
  favoritesCount,
  image,
  updatedAt,
  tagList,
  slug,
  getSlug,
}) => {

  const dateArticle = format(new Date(updatedAt), 'MMMM dd, yyyy');
  const tag = tagList.map((item) => {
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
            <Link
              to={`/articles/${slug}`}
              className="article__title"
              onClick={() => getSlug(slug)}
            >
              {title}
            </Link>
            <img className="article__like" src={like} alt="like" />
            <span className="article__likeCount">{favoritesCount}</span>
          </div>
          {tag}
        </div>
        <div className="profile">
          <div className="profile__data">
            <span className="profile__name">{username}</span>
            <span className="profile__date">{dateArticle}</span>
          </div>
          <img className="profile__foto" src={image} alt="foto" />
        </div>
      </div>
      <p className="article__text">{description}</p>
    </li>
  );
};

export default Article;
