const base='http://localhost:7200';
export const urls = Object.freeze({

    
    product: {
        create: base + '/product/save',
        get: base + '/product/fetch',
        update: base + '/product/update/:id',
        delete:  base + '/product/:id',
        bulkSave: base + '/product/bulkUpload'
    },

    productType: {
        create: base + '/productType/save',
        get: base + '/productType/fetch',
        update: base + '/productType/update',
        delete:  base + '/productType/:productId'
    },
    
customer: {
        create: base + '/customer/save',
        get: base + '/customer/fetch',
        update: base + '/customer/update/:id',
        delete:  base + '/customer/:id'
    },
    
    company: {
        create: base + '/company/save',
        get: base + '/company/fetch',
        update: base + '/company/update/:id',
        delete:  base + '/company/:id'
    },

purchase: {
        create: base + '/purchase/save',
        get: base + '/purchase/fetch',
        update: base + '/purchase//update/:id',
        delete:  base + '/purchase/:id'
    },
    
     category: {
        create: base + '/category/save',
        get: base + '/category/fetch',
        update: base + '/category/update/:id',
        delete:  base + '/category/:id',
        bulkSave: base + '/category/bulkUpload',
    },
  
    order :{
        create : base + '/order/save',
        get: base + '/order/fetch',
    },

    invoice :{
        create : base + '/invoice/save',
        get: base + '/invoice/fetch',

    }

    }
);










