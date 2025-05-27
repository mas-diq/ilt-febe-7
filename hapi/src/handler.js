const ProductsService = require('./service');

class ProductsHandler {
    constructor() {
        this._service = new ProductsService();
    }

    async welcome(request, h) {
        try {
            const response = h.response({
                status: 'success',
                message: 'Welcome to the Products API',
                data: null,
            });

            return response.code(200);
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: 'Internal server error',
            });

            return response.code(500);
        }
    }

    async addProduct(request, h) {
        try {
            const { name, price, category } = request.payload;

            // Validation
            if (!name || !price || !category) {
                const response = h.response({
                    status: 'fail',
                    message: 'Name, price, and category are required',
                });

                return response.code(400);
            }

            const productId = await this._service.addProduct({ name, price, category });

            const response = h.response({
                status: 'success',
                message: 'Product successfully added',
                data: {
                    productId,
                },
            });

            return response.code(201);
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: error.message || 'Internal server error',
            });

            return response.code(500);
        }
    }

    async getAllProducts(request, h) {
        try {
            const products = await this._service.getAllProducts();

            const response = h.response({
                status: 'success',
                message: 'Products retrieved successfully',
                data: {
                    products,
                },
            });

            return response.code(200);
        } catch (error) {
            const response = h.response({
                status: 'error',
                message: error.message || 'Internal server error',
            });

            return response.code(500);
        }
    }

    async getOneProduct(request, h) {
        try {
            const { id } = request.params;
            const product = await this._service.getOneProduct(id);

            const response = h.response({
                status: 'success',
                message: 'Product retrieved successfully',
                data: {
                    product,
                },
            });

            return response.code(200);
        } catch (error) {
            const statusCode = error.message === 'Product not found' ? 404 : 500;

            const response = h.response({
                status: error.message === 'Product not found' ? 'fail' : 'error',
                message: error.message || 'Internal server error',
            });

            return response.code(statusCode);
        }
    }

    async updateProduct(request, h) {
        try {
            const { id } = request.params;
            const { name, price, category } = request.payload;

            // Validation
            if (!name || !price || !category) {
                const response = h.response({
                    status: 'fail',
                    message: 'Name, price, and category are required',
                });

                return response.code(400);
            }

            const product = await this._service.updateProduct(id, { name, price, category });

            const response = h.response({
                status: 'success',
                message: 'Product updated successfully',
                data: {
                    product,
                },
            });

            return response.code(200);
        } catch (error) {
            const statusCode = error.message === 'Product not found' ? 404 : 500;

            const response = h.response({
                status: error.message === 'Product not found' ? 'fail' : 'error',
                message: error.message || 'Internal server error',
            });

            return response.code(statusCode);
        }
    }

    async deleteOneProduct(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteOneProduct(id);

            const response = h.response({
                status: 'success',
                message: 'Product deleted successfully',
                data: null,
            });

            return response.code(200);
        } catch (error) {
            const statusCode = error.message === 'Product not found' ? 404 : 500;

            const response = h.response({
                status: error.message === 'Product not found' ? 'fail' : 'error',
                message: error.message || 'Internal server error',
            });

            return response.code(statusCode);
        }
    }
}

module.exports = ProductsHandler;