// import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'

// Import layout
import AuthenticationLayout from 'src/layouts/AuthenticationLayout';

// Import components
import Signup from 'src/components/signup/Signup';
import ActivateAccount from 'src/components/activate_account/ActivateAccount';

// Import route config
import { RouteNames } from 'src/routes.config';

export default function AuthenticationRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <AuthenticationLayout />,
      children: [
        {
          path: RouteNames.signup.path,
          element: <Signup />
        },
        {
          path: RouteNames.activateAccount.path,
          element: <ActivateAccount />
        },
        {
          path: "/",
          element: <Navigate to={RouteNames.signup.path} replace />
        }
      ]
    }
  ]);
}