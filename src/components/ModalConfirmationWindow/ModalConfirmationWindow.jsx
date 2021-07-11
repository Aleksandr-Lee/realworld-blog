import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BlogService from '../../services/BlogService';
import {
  actionSuccessfulDeleteArticle,
  actionModalConfirmationWindow,
} from '../../redux/actions/listArticles';
import exclamation from '../../Assets/Images/exclamation-circle.svg';
import './ModalConfirmationWindow.scss';

const ModalConfirmationWindow = ({ slug }) => {
  const dispatch = useDispatch();
  const successfulDeleteArticle = useSelector(
    (state) => state.articlesReducer.successfulDeleteArticle
  );

  const onDeleteArticle = () => {
    new BlogService().deleteArticle(slug.slug).then(() => {
      dispatch(actionSuccessfulDeleteArticle(true));
    });
  };

  if (successfulDeleteArticle) {
    setTimeout(() => {
      dispatch(actionSuccessfulDeleteArticle(false));
      dispatch(actionModalConfirmationWindow(false));
    }, 500);
    return <Redirect to="/articles" />;
  }
  return (
    <div className="modalWindow">
      <div className="modalWindow__container">
        <div className="modalWindow__header">
          <img
            className="modalWindow__img"
            src={exclamation}
            alt="exclamation"
          />
          <span className="modalWindow__title">
            Are you sure to delete this article?
          </span>
        </div>
        <div className="modalWindow__buttons">
          <button
            className="buttonModal buttonModal__no"
            type="button"
            onClick={() => dispatch(actionModalConfirmationWindow(false))}
          >
            NO
          </button>
          <button
            className="buttonModal buttonModal__yes"
            type="button"
            onClick={onDeleteArticle}
          >
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

ModalConfirmationWindow.propTypes = {
  slug: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ModalConfirmationWindow;
