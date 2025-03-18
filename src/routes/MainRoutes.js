import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { element } from 'prop-types';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Product = Loadable(lazy(() => import('views/Product')));
const CustomerDetail = Loadable(lazy(() => import('views/CustomerDetail')));
const Customer = Loadable(lazy(() => import('views/Customer')));
const ProductType = Loadable(lazy(() => import('views/Invoice')));
const AddToCard = Loadable(lazy(() => import('views/AddToCard/AddFood')));
const Category = Loadable(lazy(() => import('views/Category')));
const Profile = Loadable(lazy(() => import('views/Profile')));
const Supplier = Loadable(lazy(() => import('views/Supplier')));
const Purchase = Loadable(lazy(() => import('views/Purchase')));
const Report = Loadable(lazy(() => import('views/Report/index')))
const History = Loadable(lazy(() => import('views/History/index')))
const Order =  Loadable(lazy(() => import('views/Order/index')))
const Employee = Loadable(lazy(()=> import('views/Employee')))



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
              path: 'user',
              children :[

                {
                  path: '',
                  element: <CustomerDetail />
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
          path: 'employee',
          element: <Employee />
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
          path: 'report',
          element: <Report/>
        },
         {
          path: 'History',
          element: <History/>
          
        },
        {
          path: 'Order',
          element: <Order/>
        }

      ]
      
    }
  ]
};

export default MainRoutes;
