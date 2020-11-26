import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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

import AdminLogin from './views/components/auth/AdminLogin';

import UserRegister from './views/components/auth/UserRegister';
import AllUsers from './views/components/user/Users';
import UpdateUserPassword from './views/components/user/UpdateUserPassword';

import AddProduct from './views/components/product/AddProduct';
import UpdateProduct from './views/components/product/UpdateProduct';
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
    window.location.href = '/#/admin-login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/login-admin" name="Login Page" component={AdminLogin} />
          <PrivateRoute path="/register-user" name="Home" component={UserRegister} />
          <PrivateRoute exact path="/all-users" name="Home"  component={AllUsers} /> 
          <PrivateRoute exact path="/update-user-password/:_id" name="Home"  component={UpdateUserPassword} />
          <PrivateRoute exact path="/add-product" name="Home"  component={AddProduct} /> 
          <PrivateRoute exact path="/update-product/:product_id" name="Home"  component={UpdateProduct} />   
          <PrivateRoute exact path="/product-data/:product_id" name="Home"  component={GetProductDataById} />
          <PrivateRoute exact path="/add-expenses" name="Home"  component={AddExpenses} />
          <PrivateRoute exact path="/get-expenses" name="Home"  component={GetExpenses} />
          <PrivateRoute exact path="/all-expenses/" name="Home"  component={AllExpenses} />
          <PrivateRoute exact path="/add-order" name="Home"  component={AddCasher} />
          <PrivateRoute exact path="/billing" name="Home"  component={billing} />
          <PrivateRoute exact path="/get-orders" name="Home"  component={GetOrders} />
          <PrivateRoute exact path="/all-orders/" name="Home"  component={AllOrders} />
          <PrivateRoute exact path="/order-details/:order_id" name="Home"  component={OrderDetails} />
          <PrivateRoute exact path="/contact-me" name="Home"  component={ContactMe} />
          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
          
        </Switch>
      </HashRouter>
      </Provider>
    );
  }
}

export default App;
