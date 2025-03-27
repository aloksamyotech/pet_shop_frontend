import { register } from 'numeral';

const base = 'http://localhost:7200/api';
export const urls = Object.freeze({
  product: {
    create: base + '/product/save',
    get: base + '/product/fetch',
    update: base + '/product/update/:id',
    delete: base + '/product/:id',
    bulkSave: base + '/product/bulkUpload',
    getCount: base + '/product/count'
  },

  productType: {
    create: base + '/productType/save',
    get: base + '/productType/fetch',
    update: base + '/productType/update',
    delete: base + '/productType/:productId'
  },

  customer: {
    create: base + '/customer/save',
    get: base + '/customer/fetch',
    update: base + '/customer/update/:id',
    delete: base + '/customer/:id',
    getCount: base + '/customer/count'
  },
  employee: {
    create: base + '/employee/save',
    get: base + '/employee/fetch',
    update: base + '/employee/update/:id',
    delete: base + '/employee/:id',
    },

  company: {
    create: base + '/company/save',
    get: base + '/company/fetch',
    update: base + '/company/update/:id',
    delete: base + '/company/:id',
    getCount: base + '/company/count'
  },

  purchase: {
    create: base + '/purchase/save',
    get: base + '/purchase/fetch',
    update: base + '/purchase//update/:id',
    delete: base + '/purchase/:id'
  },

  category: {
    create: base + '/category/save',
    get: base + '/category/fetch',
    update: base + '/category/update/:id',
    delete: base + '/category/:id',
    bulkSave: base + '/category/bulkUpload',
    getCount: base + '/category/count'
  },
  Subcategory: {
    create: base + '/Subcategory/save',
    get: base + '/Subcategory/fetch',
    update: base + '/Subcategory/update/:id',
    delete: base + '/Subcategory/:id',
    bulkSave: base + '/Subcategory/bulkUpload',
    getCount: base + '/Subcategory/count'
  },

  order: {
    create: base + '/order/save',
    get: base + '/order/fetch',
    getCount: base + '/order/count',
    getTotalAmount: base + '/order/totalSales',
    getTotalQuantity: base + '/order/totalQuantity'
  },

  invoice: {
    create: base + '/invoice/save',
    get: base + '/invoice/fetch'
  },
  profile: {
    create: base + '/profile/save',
    get: base + '/profile/fetch'
  },
  login: {
    create: base + '/user/login'
  },

  register: {
    update: base + '/user/update/:id',
    UpdateNewPassword : base +'/user/updatePassword/:id',
    updateLogo : base +'/user/updatelogo/:id',
    get : base +'/user/fetch',
    updateCurrency : base + '/user/updateCurrency/:id'
  },

  logo :{
    create : base +'/Logo/save',
    update: base + '/Logo/update/:id',
    get : base + '/Logo/fetch'
  }  ,

email :{

  get : base +'/Email/fetch',
  update : base +'/Email/update'

}

,
chat :{
  create : base + '/chat/save',
  
}





});
