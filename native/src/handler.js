class ProductsHandler {
  constructor(service) {
    this._service = service;

    this.welcome = this.welcome.bind(this);
    this.addProductHandler = this.addProductHandler.bind(this);
    this.getAllProductsHandler = this.getAllProductsHandler.bind(this);
    this.getOneProductHandler = this.getOneProductHandler.bind(this);
    this.deleteOneProductHandler = this.deleteOneProductHandler.bind(this);
  }

  /**
 * @TODO 2
 * Define handler for post product handler
 */

  async welcome(request, h) {
    const response = h.response({
      status: 'success',
      message: 'Welcome to the Product API',
      data: '',
    });

    response.code(201);
    return response;
  }

  async addProductHandler(request, h) {
    const { name = 'untitled', price, category } = request.payload;
    const productId = await this._service.addProduct({ name, price, category });

    const response = h.response({
      status: 'success',
      message: 'Product berhasil ditambahkan',
      data: {
        productId
      },
    });

    response.code(201);
    return response;
  }

  async getAllProductsHandler(request, h) {
    const products = await this._service.getAllProducts();
    const response = h.response({
      status: 'success',
      message: 'Product berhasil ditampilkan',
      data: {
        products
      },
    });

    response.code(201);
    return response;
  }

  async getOneProductHandler(request, h) {
    const { id } = request.params;
    const product = await this._service.getOneProduct(id);

    const response = h.response({
      status: 'success',
      message: 'Product berhasil ditampilkan',
      data: {
        product
      }
    });
    response.code(200);
    return response;
  }

  async deleteOneProductHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteOneProduct(id);

    const response = h.response({
      status: 'success',
      message: 'Product berhasil dihapus',
      data: { id },
    });
    response.code(200);
    return response;
  }
}

module.exports = ProductsHandler;