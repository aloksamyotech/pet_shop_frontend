import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { element } from 'prop-types';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const SuccessPage = Loadable(lazy( ()=> import('views/pages/authentication/authentication3/SuccessPage')))
const PetWarehouse = Loadable(lazy(() => import('views/pages/authentication/authentication3/webpage')))

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin3 />
    },
    {
      path: '/success',
      element: <SuccessPage />
    },
    {
      path: '/register',
      element: <AuthRegister3 />
    },
    {
      path:'/PetWarehouse',
      element:<PetWarehouse/>

    }
  ]
};

export default AuthenticationRoutes;
