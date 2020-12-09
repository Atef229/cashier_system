import React, { Component } from 'react';
//import { HashRouter,Router, Route, Switch } from 'react-router-dom';
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
import { setCurrentUser, logoutAdmin, logoutUser } from './views/actions/authActions';
import { clearCurrentProfile } from './views/actions/AdminsActions';
import { Provider } from 'react-redux';
import store from './views/store';
import PrivateRoute from './views/components/common/PrivateRoute';
import StrictAdminRoute from './views/components/common/StrictAdminRoute';
// Containers
import { DefaultLayout } from './containers';


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

import { DefaultLayoutUser } from './containers/user';

import LoginUser from './views/components/auth/UserLogin';

import GetProductDataByIdUser from './views/components/product/user/GetProductDataById';

import AddExpensesUser from './views/components/expenses/user/AddExpenses';
import GetExpensesUser from './views/components/expenses/user/GetExpenses';
import AllExpensesUser from './views/components/expenses/user/Expensess';

import AddCasherUser from './views/components/casher/user/casher';
import billingUser from './views/components/casher/user/Billing';

import GetOrdersUser from './views/components/orders/user/GetOrders';
import AllOrdersUser from './views/components/orders/user/Orders';
import OrderDetailsUser from './views/components/orders/user/OrderDetails';

import ContactMeUser from './views/components/ContactMeUser';

//import {AdminLogin} from './Admin';

//Check for token Admin
if (localStorage.jwtTokenAdmin) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtTokenAdmin);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtTokenAdmin);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutAdmin());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login-admin';
  }
}

// Check for token user
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
      <Router>
        <Switch>
        <Route exact path="/user/login-user" name="Login Page" component={LoginUser} />
          <Route exact path="/login-admin" name="Login Page" component={AdminLogin} />
          <StrictAdminRoute path="/register-user" name="Home" component={UserRegister} />
          <StrictAdminRoute exact path="/all-users" name="Home"  component={AllUsers} /> 
          <StrictAdminRoute exact path="/update-user-password/:_id" name="Home"  component={UpdateUserPassword} />
          <StrictAdminRoute exact path="/add-product" name="Home"  component={AddProduct} /> 
          <StrictAdminRoute exact path="/update-product/:product_id" name="Home"  component={UpdateProduct} />
          <PrivateRoute exact path="/user/product-data/:product_id" name="Home"  component={GetProductDataByIdUser} />   
          <StrictAdminRoute exact path="/product-data/:product_id" name="Home"  component={GetProductDataById} />
          <PrivateRoute exact path="/user/add-expenses" name="Home"  component={AddExpensesUser} />
          <StrictAdminRoute exact path="/add-expenses" name="Home"  component={AddExpenses} />
          <PrivateRoute exact path="/user/get-expenses" name="Home"  component={GetExpensesUser} />
          <StrictAdminRoute exact path="/get-expenses" name="Home"  component={GetExpenses} />
          <PrivateRoute exact path="/user/all-expenses/" name="Home"  component={AllExpensesUser} />
          <StrictAdminRoute exact path="/all-expenses/" name="Home"  component={AllExpenses} />
          <PrivateRoute exact path="/user/add-order" name="Home"  component={AddCasherUser} />
          <StrictAdminRoute exact path="/add-order" name="Home"  component={AddCasher} />
          <PrivateRoute exact path="/user/billing" name="Home"  component={billingUser} />
          <StrictAdminRoute exact path="/billing" name="Home"  component={billing} />
          <PrivateRoute exact path="/user/get-orders" name="Home"  component={GetOrdersUser} />
          <StrictAdminRoute exact path="/get-orders" name="Home"  component={GetOrders} />
          <PrivateRoute exact path="/user/all-orders/" name="Home"  component={AllOrdersUser} />
          <StrictAdminRoute exact path="/all-orders/" name="Home"  component={AllOrders} />
          <PrivateRoute exact path="/user/order-details/:order_id" name="Home"  component={OrderDetailsUser} />
          <StrictAdminRoute exact path="/order-details/:order_id" name="Home"  component={OrderDetails} />
          <PrivateRoute exact path="/user/contact-me" name="Home"  component={ContactMeUser} />
          <StrictAdminRoute exact path="/contact-me" name="Home"  component={ContactMe} />
          <PrivateRoute path="/user" name="Home" component={DefaultLayoutUser} />
          <StrictAdminRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </Router>
      </Provider>
    );
  }
}

export default App;
