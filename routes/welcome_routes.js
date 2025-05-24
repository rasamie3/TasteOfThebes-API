/**
 * Welcome Routes
 * Provides the main entry point for the API
 * Serves as the API documentation and discovery endpoint
 * No authentication required for this route
 */

// Import required dependencies
const express = require('express');
const router = express.Router();

// Import the welcome controller
const welcomeController = require('../controllers/welcome_controller');

/**
 * Route Definition
 * 
 * GET /
 * Returns API documentation and available endpoints
 * Response includes:
 * - Welcome message
 * - Available endpoints
 * - Authentication requirements
 * - API version information
 */
router.get('/', welcomeController);

// Export the router
module.exports = router;