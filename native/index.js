// index.js - Native HTTP Server Implementation
const http = require('http');
const url = require('url');
const routes = require('./src/routes');
const ProductsService = require('./src/ProductsService');
const ProductsHandler = require('./src/handler');

// Initialize services and handler
const productsService = new ProductsService();
const productsHandler = new ProductsHandler(productsService);

const createServer = (handler) => {
  const routeConfigs = routes(handler);

  const requestListener = async (request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const parsedUrl = url.parse(request.url, true);
    const { method } = request;
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Find matching route
    const matchedRoute = routeConfigs.find((route) => {
      // Handle path parameters
      if (route.path.includes('{id}')) {
        const basePath = route.path.split('{id}')[0];
        return path.startsWith(basePath) && method === route.method;
      }
      return path === route.path && method === route.method;
    });

    try {
      if (matchedRoute) {
        // Extract ID if path has {id} parameter
        let id = null;
        if (matchedRoute.path.includes('{id}')) {
          const basePath = matchedRoute.path.split('{id}')[0];
          id = path.slice(basePath.length);
        }

        // Prepare request object similar to Hapi's request
        const req = {
          method,
          url: path,
          params: id ? { id } : {},
          query,
          body: null
        };

        // Handle request body for POST requests
        if (method === 'POST') {
          req.body = await getRequestBody(request);
        }

        // Create simplified response object
        const res = {
          response,
          status: function (code) {
            response.statusCode = code;
            return this;
          },
          json: function (data) {
            response.end(JSON.stringify(data));
            return this;
          }
        };

        // Call the appropriate handler
        await matchedRoute.handler(req, res);
      } else {
        response.statusCode = 404;
        response.end(JSON.stringify({ message: 'Route not found' }));
      }
    } catch (error) {
      console.error(error);
      response.statusCode = 500;
      response.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  };

  return http.createServer(requestListener);
};

// Helper function to parse request body
function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    request.on('error', reject);
  });
}

// create a HTTP server
const server = createServer(productsHandler);

// run the HTTP server
server.listen(3000, 'localhost', () => {
  console.log('Server running on http://localhost:3000');
});