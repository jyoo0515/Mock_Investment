import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'recoil/auth/useAuth';

function PublicOutlet() {
  const authState = useAuth();
  return authState.authenticated ? <Navigate to="/" /> : <Outlet />;
}

export default PublicOutlet;
