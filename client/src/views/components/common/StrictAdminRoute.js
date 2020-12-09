import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const StrictAdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !!localStorage.getItem("jwtTokenAdmin") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/user/login-user" />
      )
    }
  />
);

StrictAdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(StrictAdminRoute);

