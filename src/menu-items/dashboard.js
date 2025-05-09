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
  IconStackPop,
  IconShoppingCart,
  IconCategory2,
  IconTruckReturn,
  IconFileDescription,
  IconBuildingStore,
  IconHistoryToggle,
  IconPentagram,
  IconPaw ,
  IconScissors ,
  IconBox ,
  IconGift ,
  IconDroplet,
  
  
} from '@tabler/icons';
import SummarizeIcon from '@mui/icons-material/Summarize';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';
import i18n from 'i18n';



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
  IconShoppingCart,
  InventoryIcon,
  StorefrontIcon,
  ShoppingCartIcon,
  IconCategory,
  IconStackPop,
  IconCategory2,
  IconTruckReturn,
  IconFileDescription,
  IconBuildingStore,
  IconHistoryToggle,
  IconPentagram,
  IconScissors ,
  IconPaw,
  IconBox ,
  IconGift ,
  IconDroplet,
};


const dashboard = {
  title:i18n.t('DashBoard-Menu'),
  
  type: 'group',
  children: [
    {
      id: 'default',
      title: i18n.t('Dashboard'),
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    
    {
      id: '08',
      title: i18n.t('Category'),
      type: 'item',
      url: '/dashboard/category',
      icon: icons.IconCategory,
      breadcrumbs: false,
    
    },
    {
      id: '16',
      title: i18n.t('Subcategory'),
      type: 'item',
      url: '/dashboard/subcategory',
      icon: icons.IconCategory2,
      breadcrumbs: false
    },
    

    {
      id: '01',
      title: i18n.t('POS'),
      type: 'item',
      url: '/dashboard/addToCard',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: '02',
      title: i18n.t('Product'),
      type: 'item',
      url: '/dashboard/product',
      icon: icons.IconStackPop,
      breadcrumbs: false
    },

   {
      id: '20',
      title: i18n.t('Grooming Pets'),
      type: 'collapse',
      icon: icons.IconDroplet,
      children: [
        {
          id: '17',
          title: i18n.t('Booking'),
          type: 'item',
          url: '/dashboard/booking',
          icon: icons.IconStackPop, 
          breadcrumbs: false
        },
        {
          id: '21',
          title: i18n.t('TodayBooking'),
          type: 'item',
          url: '/dashboard/todayBooking',
          icon: icons.IconCalendarEvent, 
          breadcrumbs: false
        },
        {
          id: '18', 
          title: i18n.t('Pets Type'),
          type: 'item',
          url: '/dashboard/petType',
          icon: icons.IconPaw ,
          breadcrumbs: false
        },
        {
          id: '19', 
          title: i18n.t('Packages'),
          type: 'item',
          url: '/dashboard/package',
          icon: icons.IconGift ,
          breadcrumbs: false
        },
      ]
    },


    {
      id: '11',
      title: i18n.t('Clients'),
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: '06',
          title: i18n.t('Supplier'),
          type: 'item',
          url: '/dashboard/supplier',
          icon: icons.IconBuildingStore,
          breadcrumbs: false
        },
        {
          id: '04',
          title: i18n.t('Customer'),
          type: 'item',
          url: '/dashboard/customer',
          icon: icons.IconUsers,
          breadcrumbs: false
        },
        {
          id: '10',
          title: i18n.t('Employee'),
          type: 'item',
          url: '/dashboard/employee',
          icon: icons.IconUsers,
          breadcrumbs: false
        },
      ]
    },
{
      id: '07',
      title: i18n.t('Purchase'),
      type: 'item',
      url: '/dashboard/purchase',
      icon: icons.IconTruckReturn,
      breadcrumbs: false
    },

      {
      id: '03',
      title: i18n.t('Order History'),
      type: 'item',
      url: '/dashboard/history',
      icon: icons.IconHistoryToggle,
      breadcrumbs: false
    },
    // {
    //   id: '22',
    //   title: i18n.t('Booking History'),
    //   type: 'item',
    //   url: '/dashboard/bookingHistory',
    //   icon: icons.IconHistoryToggle,
    //   breadcrumbs: false


    // },
    
    {
      id: '09',
      title: i18n.t('Report'),
      type: 'item',
      url: '/dashboard/report',
      icon: icons.IconFileDescription,
      breadcrumbs: false
    },
    {
      id: '05',
      title: i18n.t('Profile'),
      type: 'item',
      url: '/dashboard/profile',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
  
    
  
  
   ]
};

export default dashboard;
