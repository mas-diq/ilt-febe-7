const Hapi = require('@hapi/hapi');
const productRoutes = require('./src/routes');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        routes: {
            cors: {
                origin: ['*'], // Allow all origins for development
            },
        },
    });

    // Register routes
    server.route(productRoutes);

    // Error handling
    server.ext('onPreResponse', (request, h) => {
        const response = request.response;

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'error',
                message: response.message,
            });

            return newResponse.code(response.output.statusCode);
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

init().catch((error) => {
    console.error('Server initialization failed:', error);
    process.exit(1);
});