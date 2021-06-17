/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination } from 'antd';
// import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import './PaginationArticle.scss';

const PaginationArticle = ({ handlePageClick }) => 
  // const { handlePageClick, totalCount } = props;
  // const dispatch = useDispatch();
   (
    <Pagination
      defaultCurrent={1}
      onChange={handlePageClick}
      size="small"
      total={100}
      pageSize={1}
      showSizeChanger={false}
    />
  )
;

export default PaginationArticle;
