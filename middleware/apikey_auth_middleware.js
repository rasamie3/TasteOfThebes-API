/**
 * API Key Authentication Middleware
 * Validates API keys for all protected routes
 * Attaches user information to the request object if authentication is successful
 */
const ApiKeyModel = require('../models/apikey_model');

/**
 * Middleware to authenticate requests using API key
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object|void} Returns error response if authentication fails, or calls next() if successful
 */
async function apiKeyAuth(req, res, next) {
    try {
        // Extract API key from query parameters
        const apiKey = req.query.key;

        // Check if API key is provided
        if (!apiKey) {
            return res.status(401).json({
                status: false,
                message: "API Key is required",
                error: "Missing API Key"
            });
        }

        // Find API key in database
        const ApiKeyObj = await ApiKeyModel.findOne({ key: apiKey });

        // Validate API key
        if (!ApiKeyObj) {
            return res.status(401).json({
                status: false,
                message: "Invalid API Key",
                error: "API Key not found"
            });
        }

        // Attach user information to request object
        req.user = {
            role: ApiKeyObj.role,
            key: ApiKeyObj.key,
            is_admin_approved: ApiKeyObj.is_admin_approved
        };

        // Proceed to next middleware/route handler
        next();
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({
            status: false,
            message: "Authentication failed",
            error: error.message
        });
    }
}

module.exports = apiKeyAuth;
