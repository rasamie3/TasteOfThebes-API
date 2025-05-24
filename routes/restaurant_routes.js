/**
 * Restaurant Routes
 * Handles all restaurant-related endpoints including CRUD operations
 * Implements authentication and authorization middleware for protected routes
 */

// Import required dependencies
const express = require('express');
const router = express.Router();

// Import controllers and middleware
const restaurantsController = require('../controllers/restaurants_controller');
const require_admin_middleware = require('../middleware/require_admin_middleware');
const apikey_auth_middleware = require('../middleware/apikey_auth_middleware');

// Apply API key authentication to all routes
router.use(apikey_auth_middleware);

/**
 * Route Definitions
 * 
 * GET /getAllRestaurants
 * Retrieves all restaurants from the database
 * Requires: Valid API key
 */
router.get('/getAllRestaurants', restaurantsController.getAllRestaurants);

/**
 * POST /addRestaurant
 * Creates a new restaurant with enriched data
 * Requires: 
 * - Valid API key
 * - Admin role
 * - Admin approval
 * Body: Restaurant data including arabic_name
 */
router.post('/addRestaurant', require_admin_middleware, restaurantsController.createRestaurant);

/**
 * GET /getRestaurantsWithMissingData
 * Retrieves restaurants that have missing required information
 * Requires:
 * - Valid API key
 * - Admin role
 * - Admin approval
 */
router.get('/getRestaurantsWithMissingData', require_admin_middleware, restaurantsController.getRestaurantsWithMissingData);

/**
 * PUT /updateRestaurant/:id
 * Updates an existing restaurant's information
 * Requires:
 * - Valid API key
 * - Admin role
 * - Admin approval
 * Parameters:
 * - id: Restaurant ID
 * Body: Updated restaurant data
 */
router.put('/updateRestaurant/:id', require_admin_middleware, restaurantsController.updateRestaurant);

/**
 * DELETE /deleteRestaurant/:id
 * Removes a restaurant from the database
 * Requires:
 * - Valid API key
 * - Admin role
 * - Admin approval
 * Parameters:
 * - id: Restaurant ID
 */
router.delete('/deleteRestaurant/:id', require_admin_middleware, restaurantsController.deleteRestaurant);

// Export the router
module.exports = router;