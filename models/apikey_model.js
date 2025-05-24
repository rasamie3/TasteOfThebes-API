/**
 * API Key Model
 * Defines the schema for API keys used for authentication and authorization
 * Each API key is associated with a specific role and approval status
 */
const mongoose = require('mongoose');

/**
 * Schema definition for API keys
 * @property {String} key - Unique API key string used for authentication
 * @property {String} role - User role ('admin' or 'user')
 * @property {Date} created_at - Timestamp of when the API key was created
 * @property {Boolean} is_admin_approved - Whether an admin key has been approved by super admin
 * @property {Boolean} is_super_admin - Whether this key belongs to a super admin
 */
const apiKeySchema = new mongoose.Schema({
    // The actual API key string used for authentication
    key: {
        type: String,
        required: true, 
        unique: true
    },
    // User role associated with this API key
    role: {
        type: String,
        enum: ['admin', 'user'], // Only these roles are allowed
        required: true
    },
    // Timestamp of when the API key was created
    created_at: {
        type: Date,
        default: Date.now // Automatically set to current date/time
    },
    // Approval status for admin keys
    is_admin_approved: {
        type: Boolean,
        default: false // New admin keys are not approved by default
    },
    // Super admin status flag
    is_super_admin: {
        type: Boolean,
        default: false // New keys are not super admin by default
    }
});

// Create and export the model
module.exports = mongoose.model('api_keys', apiKeySchema);