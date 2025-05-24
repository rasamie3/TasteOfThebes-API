/**
 * API Key Controller
 * Handles the generation and management of API keys for different user roles
 */
const crypto = require('crypto');
const ApiKeyModel = require('../models/apikey_model');

class APIKeyController {
    /**
     * Generates a new API key for a specified role
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} JSON response with the generated API key or error message
     */
    async generateAPIKey(req, res) {
        try {
            // Extract role from query parameters
            const role = req.query.role;

            // Validate if role is provided
            if (!role) {
                return res.status(400).json({
                    status: false, 
                    message: 'Please specify a role for API key (user or admin)'
                });
            }

            // Validate if role is either 'user' or 'admin'
            if (!['user', 'admin'].includes(role)) {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid role. Role must be either "user" or "admin"'
                });
            }
            
            // Generate a random 32-byte hex string as the API key
            const key = crypto.randomBytes(32).toString('hex');
            const apiKey = new ApiKeyModel({key, role});
            await apiKey.save();

            // Verify if API key was created successfully
            if (!apiKey) {
                return res.status(500).json({
                    status: false, 
                    message: 'Something went wrong while creating an API Key'
                });
            }

            // Return the created API key
            return res.status(201).json({
                status: true, 
                apiKey: apiKey
            });
        } catch (error) {
            // Handle any unexpected errors
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    /**
     * Checks if an admin API key has been approved
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} JSON response with approval status or error message
     */
    async isAdminApproved(req, res) {
        try {
            // Extract admin key from query parameters
            const adminKey = req.query.adminKey;

            // Validate if admin key is provided
            if (!adminKey) {
                return res.status(400).json({
                    status: false, 
                    message: 'Please provide an admin API Key'
                });
            }

            // Find the admin API key in the database
            const ApiKeyObj = await ApiKeyModel.findOne({key: adminKey, role: 'admin'});

            // Check if admin key exists and is valid
            if (!ApiKeyObj) {
                return res.status(401).json({
                    status: false, 
                    message: 'Invalid admin API Key'
                });
            }

            // Return the approval status
            const message = ApiKeyObj.is_admin_approved ? 'Admin approved' : 'Admin not approved yet';
            return res.status(200).json({
                status: true, 
                message: message
            });
        } catch (error) {
            // Handle any unexpected errors
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

module.exports = new APIKeyController();