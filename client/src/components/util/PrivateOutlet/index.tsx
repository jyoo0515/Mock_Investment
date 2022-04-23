import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'recoil/auth/useAuth';

function PrivateOutlet() {
  const authState = useAuth();
  return authState.authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
