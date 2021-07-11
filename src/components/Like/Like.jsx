import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BlogService from '../../services/BlogService';
import { actionArticles } from '../../redux/actions/listArticles';
import './Like.scss';

const Like = ({ favorited, favoritesCount, slug }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.usersReducer.isAuth);
  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);

  const onLiked = () => {
    if (isAuth) {
      if (!like) {
        new BlogService().likeArticle(slug).then((articles) => {
          if (articles.article) {
            setLike(true);
            setLikeCount((count) => count + 1);
            dispatch(actionArticles(articles.article));
          }
        });
      } else {
        new BlogService().dislikeArticle(slug).then((articles) => {
          if (articles.article) {
            setLike(false);
            setLikeCount((count) => count - 1);
          }
        });
      }
    }
  };

  return (
    <>
      <button
        label="like"
        type="button"
        className={`like__button like__button--${like ? 'liked' : 'noLike'}`}
        onClick={onLiked}
      />
      <span className="like__likeCount">{likeCount}</span>
    </>
  );
};

Like.defaultProps = {
  favorited: false,
  favoritesCount: 0,
};

Like.propTypes = {
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  slug: PropTypes.string.isRequired,
};
export default Like;
