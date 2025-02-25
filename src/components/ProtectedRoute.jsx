import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
