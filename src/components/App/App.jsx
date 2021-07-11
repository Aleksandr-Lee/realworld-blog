import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import ListArticles from '../ListArticles';
import BlogService from '../../services/BlogService';
import ArticlePage from '../ArticlePage';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Profile from '../Profile';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';
import PrivateRoute from '../PrivateRoute';
import { actionGetUser } from '../../redux/actions/users';
import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.usersReducer.isAuth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      new BlogService().getCurrentUsers(token).then((users) => {
        dispatch(actionGetUser(users));
      });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/" component={ListArticles} exact />
          <Route path="/articles" component={ListArticles} exact />
          <Route
            path="/articles/:slug/edit"
            render={({ match }) => <EditArticle slug={match.params} />}
          />
          <Route
            path="/articles/:slug"
            render={({ match }) => <ArticlePage slug={match.params} />}
          />
          <Route path="/sign-in" component={SignIn} exact />
          <Route path="/sign-up" component={SignUp} exact />
          {isAuth && <Route path="/profile" component={Profile} exact />}
          <PrivateRoute path="/new-article" component={CreateArticle} exact />

          <Route
            render={() => <h2 className={classes.noPage}>Page not found</h2>}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
