import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import LoginPage from '../Components/LoginPage';
import RegisterPage from '../Components/RegisterPage';
import NotFoundPage from '../Components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="flex-container">
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);
export default AppRouter;
