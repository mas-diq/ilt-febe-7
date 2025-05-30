// handler.js - Modified for Native HTTP
class ProductsHandler {
  constructor(service) {
    this._service = service;
  }

  async welcome(req, res) {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to the Product API',
      data: null
    });
  }

  async addProductHandler(req, res) {
    const { name = 'untitled', price, category } = req.body;
    const productId = await this._service.addProduct({ name, price, category });

    res.status(201).json({
      status: 'success',
      message: 'Product berhasil ditambahkan',
      data: { productId }
    });
  }

  async getAllProductsHandler(req, res) {
    const products = await this._service.getAllProducts();
    res.status(200).json({
      status: 'success',
      message: 'Product berhasil ditampilkan',
      data: { products }
    });
  }

  async getOneProductHandler(req, res) {
    const { id } = req.params;
    const product = await this._service.getOneProduct(id);

    res.status(200).json({
      status: 'success',
      message: 'Product berhasil ditampilkan',
      data: { product }
    });
  }

  async deleteOneProductHandler(req, res) {
    const { id } = req.params;
    await this._service.deleteOneProduct(id);

    res.status(200).json({
      status: 'success',
      message: 'Product berhasil dihapus',
      data: { id }
    });
  }
}

module.exports = ProductsHandler;