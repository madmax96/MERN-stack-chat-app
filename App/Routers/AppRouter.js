import React from 'react';
import {Router,Route,Switch,Link,NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {LoginRegisterPage} from '../Components/LoginRegisterPage';
import {NotFoundPage} from '../Components/NotFoundPage';
export const history = createHistory();

const AppRouter = ()=>(
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={LoginRegisterPage} exact={true} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
   </Router> 
);

export default AppRouter;