import React from 'react';
import { Provider } from 'react-redux';
import {Router, Switch, Route } from 'react-router-dom';
import store from './redux/store';
import history from './history';
import LayoutRoute from './utils/auth/layoutRoute'

//components
import Login from './pages/landing-pages/login'
import Dashboard from "./pages/auth-pages/user/dashboard";
import AdminDashboard from "./pages/auth-pages/admin/dashboard";
import EditStory from "./pages/auth-pages/admin/editStory";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}/>
          {/* <Route exact path="/user/dashboard" component={Dashboard}/> */}
          {/* <LayoutRoute exact={true} path="/" component={Login} /> */}
          <LayoutRoute exact={true} path="/user/dashboard" component={Dashboard} />
          <LayoutRoute exact={true} path="/admin/dashboard" component={AdminDashboard} />
          <LayoutRoute exact={true} path="/admin/stories/:id" component={EditStory} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
