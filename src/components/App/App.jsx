/* eslint-disable arrow-body-style */
import React from 'react';
import './App.scss';
import Header from '../Header';
import ListArticles from '../ListArticles';

const App = () => {
  return (
    <div className="App">
      <Header />
      <ListArticles />
    </div>
  );
};

export default App;
