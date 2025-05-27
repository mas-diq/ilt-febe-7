const { nanoid } = require('nanoid');
const pool = require('./config');

class ProductsService {
    async addProduct({ name, price, category }) {
        try {
            const id = nanoid(16);
            const query = {
                text: 'INSERT INTO products (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING id',
                values: [id, name, price, category],
            };

            const result = await pool.query(query);
            return result.rows[0].id;
        } catch (error) {
            console.error('Error adding product:', error);
            throw new Error('Failed to add product');
        }
    }

    async getAllProducts() {
        try {
            const result = await pool.query('SELECT * FROM products ORDER BY name');
            return result.rows;
        } catch (error) {
            console.error('Error getting all products:', error);
            throw new Error('Failed to retrieve products');
        }
    }

    async getOneProduct(id) {
        try {
            const query = {
                text: 'SELECT * FROM products WHERE id = $1',
                values: [id],
            };

            const result = await pool.query(query);

            if (!result.rows.length) {
                throw new Error('Product not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error getting product:', error);
            throw error;
        }
    }

    async updateProduct(id, { name, price, category }) {
        try {
            const query = {
                text: 'UPDATE products SET name = $2, price = $3, category = $4 WHERE id = $1 RETURNING *',
                values: [id, name, price, category],
            };

            const result = await pool.query(query);

            if (!result.rows.length) {
                throw new Error('Product not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    async deleteOneProduct(id) {
        try {
            const query = {
                text: 'DELETE FROM products WHERE id = $1 RETURNING *',
                values: [id],
            };

            const result = await pool.query(query);

            if (!result.rows.length) {
                throw new Error('Product not found');
            }

            return result.rows[0];
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}

module.exports = ProductsService;