/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import './PaginationArticle.scss';

const PaginationArticle = ({ handlePageClick }) => {
  const articlesCount = useSelector(
    (state) => state.articlesReducer.articlesCount
  );
  return (
    <Pagination
      defaultCurrent={1}
      onChange={handlePageClick}
      size="small"
      total={articlesCount}
      pageSize={5}
      showSizeChanger={false}
    />
  );
};

export default PaginationArticle;
