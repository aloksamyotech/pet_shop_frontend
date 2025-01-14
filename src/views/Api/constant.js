const base='http://localhost:7200';
export const urls = Object.freeze({

    
    product: {
        create: base + '/product/save',
        get: base + '/product/fetch',
        update: base + '/product/update',
        delete:  base + '/product/:categoryId'
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
        update: base + '/customer/update',
        delete:  base + '/customer/:customerId'
    },
    
    company: {
        create: base + '/company/save',
        get: base + '/company/fetch',
        update: base + '/company/update',
        delete:  base + '/company/:companyId'
    },

purchase: {
        create: base + '/purchase/save',
        get: base + '/purchase/fetch',
        update: base + '/purchase/update',
        delete:  base + '/purchase/:purchaseId'
    },
    
     category: {
        create: base + '/category/save',
        get: base + '/category/fetch',
        update: base + '/category/update',
        delete:  base + '/category/:categoryId'
    },
    
    

    }
);










