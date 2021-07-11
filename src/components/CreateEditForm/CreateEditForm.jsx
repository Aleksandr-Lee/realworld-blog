import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import './CreateEditForm.scss';

const CreateEditForm = ({ title, submit, valueInput }) => {
  const tagValue = !valueInput.tagList.length ? [''] : valueInput.tagList;
  const [tags, setTags] = useState(tagValue);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    submit({ ...data, tagList: tags });
  };

  const onAddTag = () => {
    const newTags = [...tags, ''];
    setTags(newTags);
  };

  const onDeleteTag = (indexTags) => {
    const newTags = tags.filter((_tag, index) => indexTags !== index);
    setTags(newTags);
  };

  const inputValueTag = (event, index) => {
    event.preventDefault();
    const newTags = [...tags];
    newTags[index] = event.target.value;
    setTags(newTags);
  };

  const tagsList = tags.map((_tag, index) => (
    <div key={String(index)}>
      <input
        className="formTags__tags"
        type="text"
        placeholder="Tag"
        value={tags[index]}
        onChange={(event) => inputValueTag(event, index)}
      />
      <button
        disabled={tags.length === 1}
        className="formTags__delete"
        type="button"
        onClick={() => onDeleteTag(index)}
      >
        Delete
      </button>
    </div>
  ));

  return (
    <div className="createEditArticleForm">
      <div className="createEditArticleForm__container">
        <h1 className="createEditArticleForm__title">{title}</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form__label" htmlFor="title">
            Title
          </label>
          <input
            className={
              errors.title?.type ? 'form__input--error' : 'form__input'
            }
            type="text"
            placeholder="Title"
            defaultValue={valueInput.title}
            id="title"
            {...register('title', {
              required: true,
            })}
          />
          {errors.title?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
          <label className="form__label" htmlFor="shortDescription">
            Short description
          </label>
          <input
            className={
              errors.shortDescription?.type
                ? 'form__input--error'
                : 'form__input'
            }
            type="text"
            placeholder="Title"
            defaultValue={valueInput.shortDescription}
            id="shortDescription"
            {...register('shortDescription', {
              required: true,
            })}
          />
          {errors.shortDescription?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
          <label className="form__label" htmlFor="text">
            Text
          </label>
          <textarea
            className={`form__textarea ${
              errors.text?.type ? 'form__input--error' : 'form__input'
            }`}
            type="text"
            placeholder="Text"
            defaultValue={valueInput.text}
            id="text"
            {...register('text', {
              required: true,
            })}
          />
          {errors.text?.type === 'required' && (
            <span className="form__errorMessage">This is a required field</span>
          )}
          <div className="formTags">
            <label className="formTags__label" htmlFor="tags">
              Tags
            </label>
            <div className="formTags__blockTags">
              <div className="formTags__tagsWrapper"> {tagsList} </div>
              <button
                className="formTags__submitTags"
                type="button"
                onClick={onAddTag}
              >
                Add tag
              </button>
            </div>
          </div>
          <button className="form__submit" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

CreateEditForm.defaultProps = {
  submit: () => {},
};

CreateEditForm.propTypes = {
  title: PropTypes.string.isRequired,
  submit: PropTypes.func,
  valueInput: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    text: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CreateEditForm;