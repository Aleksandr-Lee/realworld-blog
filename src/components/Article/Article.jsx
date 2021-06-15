import React from 'react';
import './Article.scss';

const Article = () => {
  return (
    <li className="article">
      <div className="article__header">
        <div>
          <div className="article__data">
            <h1 className="article__title">Some article title</h1>
            <img
              className="article__like"
              src="http://de-korol.ru/wp-content/uploads/2016/01/girlanda-serdechki-34.jpg"
              alt="like"
            />
            <p className="article__likeCount">12</p>
          </div>
          <button className="article__tag">Tag1</button>
          <button className="article__tag">Some Tag1</button>
        </div>
        <div className="profile">
          <div className="profile__data">
            <p className="profile__name">John Doe</p>
            <p className="profile__date">March 5, 2020</p>
          </div>
          <img className="profile__foto" src="" alt="foto" />
        </div>
      </div>
      <p className="article__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.{' '}
      </p>
    </li>
  );
};

export default Article;
