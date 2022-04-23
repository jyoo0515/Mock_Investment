import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateOutlet from 'components/util/PrivateOutlet';
import PublicOutlet from 'components/util/PublicOutlet';
import Navigation from 'components/views/Navigation';
import LandingPage from 'components/views/LandingPage';
import RegisterPage from 'components/views/RegisterPage';
import LoginPage from 'components/views/LoginPage';
import PrivatePage from 'components/views/PrivatePage';
import apiClient from 'api/axios';
import useAuthAction from 'recoil/auth/useAuthAction';

function App() {
  const authAction = useAuthAction();
  useEffect(() => {
    apiClient
      .get('/users/me')
      .then((res) => {
        authAction.authorize();
      })
      .catch((err) => {
        authAction.logout();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PublicOutlet />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateOutlet />}>
            <Route path="/private" element={<PrivatePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
