import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

function ProtectedRoute({ isAuthenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.account.isAuthenticated,
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
