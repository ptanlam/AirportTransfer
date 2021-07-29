import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import NotActive from '../pages/authenticated/NotActive';

function ActivePartnerRoute({ isAuthenticated, children, isActive, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          isActive ? (
            children
          ) : (
            <NotActive />
          )
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
    isActive: state.partner.isActive,
  };
}

export default connect(mapStateToProps)(ActivePartnerRoute);
