const routes = (handler) => [
  /**
 * @TODO 1
 * Define rout for POST method
 */
  {
    method: 'GET',
    path: '/',
    handler: handler.welcome,
  },
  {
    method: 'POST',
    path: '/products',
    handler: handler.addProductHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: handler.getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: handler.getOneProductHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: handler.deleteOneProductHandler,
  },
];

module.exports = routes;