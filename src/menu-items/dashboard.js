// assets
import {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers,
  IconCategory,
  IconStackPop
  
} from '@tabler/icons';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// constant
const icons = {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers,
  SummarizeIcon,
  HistoryIcon,
  ShoppingBagIcon,
  InventoryIcon,
  StorefrontIcon,
  ShoppingCartIcon,
  IconCategory,
  IconStackPop
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  title: 'Admin Dashboard-Menu',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Category',
      type: 'item',
      url: '/dashboard/category',
      icon: icons.IconCategory,
      breadcrumbs: false
    },
    {
      id: '02',
      title: 'Product',
      type: 'item',
      url: '/dashboard/product',
      icon: icons.IconStackPop,
      breadcrumbs: false
    },

    {
      id: '01',
      title: 'POS',
      type: 'item',
      url: '/dashboard/addToCard',
      icon: icons.ShoppingCartIcon,
      breadcrumbs: false
    },
    

    {
      id: '11',
      title: 'Clients',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: '06',
          title: 'Supplier',
          type: 'item',
          url: '/dashboard/supplier',
          icon: icons.StorefrontIcon,
          breadcrumbs: false
        },
        {
          id: '04',
          title: 'Customer',
          type: 'item',
          url: '/dashboard/customer',
          icon: icons.IconUsers,
          breadcrumbs: false
        },
      ]
    },
{
      id: '07',
      title: 'Purchase',
      type: 'item',
      url: '/dashboard/purchase',
      icon: icons.InventoryIcon,
      breadcrumbs: false
    },

      {
      id: '03',
      title: ' Order History',
      type: 'item',
      url: '/dashboard/history',
      icon: icons.HistoryIcon,
      breadcrumbs: false
    },
    
    {
      id: '09',
      title: 'Report',
      type: 'item',
      url: '/dashboard/report',
      icon: icons.SummarizeIcon,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Profile',
      type: 'item',
      url: '/dashboard/profile',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
  
  
   ]
};

export default dashboard;
