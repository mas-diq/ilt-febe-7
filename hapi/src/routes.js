const ProductsHandler = require('./handler');

const handler = new ProductsHandler();

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: handler.welcome.bind(handler),
    },
    {
        method: 'POST',
        path: '/products',
        handler: handler.addProduct.bind(handler),
    },
    {
        method: 'GET',
        path: '/products',
        handler: handler.getAllProducts.bind(handler),
    },
    {
        method: 'GET',
        path: '/products/{id}',
        handler: handler.getOneProduct.bind(handler),
    },
    {
        method: 'PUT',
        path: '/products/{id}',
        handler: handler.updateProduct.bind(handler),
    },
    {
        method: 'DELETE',
        path: '/products/{id}',
        handler: handler.deleteOneProduct.bind(handler),
    },
];

module.exports = routes;