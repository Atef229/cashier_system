import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

import jwt_decode from 'jwt-decode';
import setAuthToken from './views/components/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './views/actions/authActions';
import { clearCurrentProfile } from './views/actions/AdminsActions';
import { Provider } from 'react-redux';
import store from './views/store';
import PrivateRoute from './views/components/common/PrivateRoute';
// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';


// import { renderRoutes } from 'react-router-config';

import UserLogin from './views/components/auth/UserLogin';

import GetProductDataById from './views/components/product/GetProductDataById';

import AddExpenses from './views/components/expenses/AddExpenses';
import GetExpenses from './views/components/expenses/GetExpenses';
import AllExpenses from './views/components/expenses/Expensess';

import AddCasher from './views/components/casher/casher';
import billing from './views/components/casher/Billing';

import GetOrders from './views/components/orders/GetOrders';
import AllOrders from './views/components/orders/Orders';
import OrderDetails from './views/components/orders/OrderDetails';

import ContactMe from './views/components/ContactMe';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/user/login-user';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      {/* <HashRouter> */}
      <Router>
        <Switch>
          <Route exact path="/user/login-user" name="Login Page" component={UserLogin} />
          <PrivateRoute exact path="/user/product-data/:product_id" name="Home"  component={GetProductDataById} />
          <PrivateRoute exact path="/user/add-expenses" name="Home"  component={AddExpenses} />
          <PrivateRoute exact path="/user/get-expenses" name="Home"  component={GetExpenses} />
          <PrivateRoute exact path="/user/all-expenses/" name="Home"  component={AllExpenses} />
          <PrivateRoute exact path="/add-order" name="Home"  component={AddCasher} />
          <PrivateRoute exact path="/billing" name="Home"  component={billing} />
          <PrivateRoute exact path="/get-orders" name="Home"  component={GetOrders} />
          <PrivateRoute exact path="/all-orders/" name="Home"  component={AllOrders} />
          <PrivateRoute exact path="/order-details/:order_id" name="Home"  component={OrderDetails} />
          <PrivateRoute exact path="/contact-me" name="Home"  component={ContactMe} />
          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          
        </Switch>
      {/* </HashRouter> */}
      </Router>
      </Provider>
    );
  }
}

export default App;
