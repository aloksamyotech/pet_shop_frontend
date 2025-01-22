import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Product = Loadable(lazy(() => import('views/Product')));
const CustomerDetail = Loadable(lazy(() => import('views/CustomerDetail')));
const PersonalDetails = Loadable(lazy(() => import('views/CustomerDetail/PersonalDetails')));
const CP = Loadable(lazy(() => import('views/CustomerDetail/CP')));
const MYAccount = Loadable(lazy(() => import('views/CustomerDetail/Account')));
const Customer = Loadable(lazy(() => import('views/Customer')));
const ProductType = Loadable(lazy(() => import('views/ProductType')));
const AddToCard = Loadable(lazy(() => import('views/AddToCard/AddFood')));
const Category = Loadable(lazy(() => import('views/Category')));
const Profile = Loadable(lazy(() => import('views/Profile')));
const MyInformation = Loadable(lazy(() => import('views/CustomerDetail/Information')));
const Supplier = Loadable(lazy(() => import('views/Supplier')));
const Purchase = Loadable(lazy(() => import('views/Purchase')));
const Order = Loadable(lazy(() => import('views/Order/index')))
const history = Loadable(lazy(() => import('views/History/index')))



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'product',
          element: <Product />
        },
        {
          path: 'customer',
          children: [
            {
              path: '',
              element: <Customer />
            },
            {
              path: 'user/:id',
              children :[

                {
                  path: '',
                  element: <CustomerDetail />
                },

                {
                  path:'MyInformation',
                  element:<MyInformation/>

                },
                {
                  path: 'personal',
                  element: <PersonalDetails />
                },
                {
                  path :'cp',
                  element:<CP/>
                },
                {
                  path:'account',
                  element:<MYAccount/>
                }
        
              ]
            }
           
          ]
        },
        {
          path: 'ProductType',
          element: <ProductType />
        },

        {
          path: 'Profile',
          element:<Profile/>
        },

        {
          path: 'addToCard',
          element: <AddToCard />
        },

        {
          path: 'supplier',
          element: <Supplier />
        },
        {
          path: 'purchase',
          element: <Purchase />
        },
        {
          path: 'category',
          element: <Category />
        },
        {
          path: 'order',
          element: <Order/>
        }, {
          path: 'history',
          element: <history/>
        }

      ]
      
    }
  ]
};

export default MainRoutes;
