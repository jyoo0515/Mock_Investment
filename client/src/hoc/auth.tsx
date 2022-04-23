import apiClient from 'api/axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthHOC(SpecificComponent: any, option: boolean | null, adminRoute: boolean | null = null) {
  // option
  // null -> for everyone, true -> login required, false -> blocked if logged in
  const AuthenticationCheck = (props: any) => {
    // possible improvement: cache user data
    const navigate = useNavigate();
    useEffect(() => {
      apiClient
        .get('/users/me')
        .then((res) => {
          if (option === false) {
            navigate('/');
          }
        })
        .catch((err) => {
          if (option) {
            navigate('/login');
          }
        });
    }, []);
    return <SpecificComponent navigate={navigate} />;
  };
  return <AuthenticationCheck />;
}

export default AuthHOC;
