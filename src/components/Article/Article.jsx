import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import Like from '../Like';
import './Article.scss';

const Article = ({
  title,
  username,
  description,
  favorited,
  favoritesCount,
  image,
  updatedAt,
  tagList,
  slug,
}) => {
  const dateArticle = format(new Date(updatedAt), 'MMMM dd, yyyy');
  const tag = tagList.map((item) => (
    <span className="article__tag" key={v4()}>
      {item}
    </span>
  ));

  return (
    <li className="article">
      <div className="article__header">
        <div>
          <div className="article__data">
            <Link to={`/articles/${slug}`} className="article__title">
              {title}
            </Link>
            <Like
              favorited={favorited}
              favoritesCount={favoritesCount}
              slug={slug}
            />
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

Article.defaultProps = {
  favorited: false,
  favoritesCount: 0,
  image: null,
  updatedAt: '',
  tagList: [''],
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  image: PropTypes.string,
  updatedAt: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  slug: PropTypes.string.isRequired,
};

export default Article;
