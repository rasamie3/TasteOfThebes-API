/**
 * API Keys Routes
 * Handles all API key management endpoints including creation, approval, and status checks
 * These routes are used for managing authentication and authorization in the system
 */

// Import required controllers
const ApikeyController = require('../controllers/apikeys_controller');
const superAdminController = require('../controllers/super_admin_controller');

// Initialize Express router
const express = require('express');
const router = express.Router();

/**
 * Route Definitions
 * 
 * GET /createAPIKey
 * Creates a new API key for a specified role (admin or user)
 * Query Parameters:
 * - role: 'admin' or 'user'
 */
router.get('/createAPIKey', ApikeyController.generateAPIKey);

/**
 * GET /approveAdmin
 * Allows super admin to approve an admin API key
 * Query Parameters:
 * - superAdminKey: API key of the super admin
 * - adminKey: API key of the admin to be approved
 */
router.get('/approveAdmin', superAdminController);

/**
 * GET /isAdminApproved
 * Checks if an admin API key has been approved by super admin
 * Query Parameters:
 * - adminKey: API key to check approval status
 */
router.get('/isAdminApproved', ApikeyController.isAdminApproved);

// Export the router
module.exports = router;