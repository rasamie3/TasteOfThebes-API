/**
 * Admin Authorization Middleware
 * Ensures that the request is made by an approved admin user
 * Must be used after the API key authentication middleware
 */
function requireAdmin(req, res, next) {
    try {
        // Check if user object exists (should be set by apiKeyAuth middleware)
        if (!req.user) {
            return res.status(401).json({
                status: false,
                message: "Authentication required",
                error: "User not authenticated"
            });
        }

        // Check if user has admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                status: false,
                message: "Access denied",
                error: "Admin role required"
            });
        }

        // Check if admin is approved by super admin
        if (!req.user.is_admin_approved) {
            return res.status(403).json({
                status: false,
                message: "Access denied",
                error: "Admin approval pending"
            });
        }

        // If all checks pass, proceed to next middleware/route handler
        next();
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({
            status: false,
            message: "Authorization failed",
            error: error.message
        });
    }
}

module.exports = requireAdmin;