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
  
} from '@tabler/icons';

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
  IconUsers
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  title: 'Dashboard-Menu',
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
      id: '01',
      title: 'POS',
      type: 'item',
      url: '/dashboard/addToCard',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Order',
      type: 'item',
      url: '/dashboard/order',
      icon: icons.IconUsers,
      breadcrumbs: false
    }, 
    
    {
      id: '02',
      title: 'Product',
      type: 'item',
      url: '/dashboard/product',
      icon: icons.IconAntennaBars5,
      breadcrumbs: false
    },

  

    {
      id: '04',
      title: 'Customer',
      type: 'item',
      url: '/dashboard/customer',
      icon: icons.IconPhoneCall,
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
    
    {
      id: '06',
      title: 'Supplier',
      type: 'item',
      url: '/dashboard/supplier',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    
    {
      id: '07',
      title: 'Purchase',
      type: 'item',
      url: '/dashboard/purchase',
      icon: icons.IconUsers,
      breadcrumbs: false
    },

    {
      id: '08',
      title: 'Category',
      type: 'item',
      url: '/dashboard/category',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    
   
  
    
      
  ]
};

export default dashboard;
