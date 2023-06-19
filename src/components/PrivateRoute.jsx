import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, isAuth }) => (
  <Route render={(props) => (isAuth ? <Component /> : <Navigate to={{ pathname: '/' }} />)} />
);

export default PrivateRoute;
