/**
 * Welcome Controller
 * Provides API documentation and endpoint information
 * Serves as the main entry point for API discovery
 */
async function welcomeHandler(req, res) {
    return await res.status(200).json({
        // Main welcome message
        message: 'Welcome to TasteOfThebes API!',
        
        // API version information
        version: '1.0.0',
        
        // Available endpoints grouped by resource
        endpoints: {
            // Restaurant management endpoints
            restaurants: {
                get_all_restaurants: '/api/v1/getAllRestaurants',
                add_restaurant: '/api/v1/addRestaurant',
                get_restaurants_with_missing_data: '/api/v1/getRestaurantsWithMissingData',
                update_restaurant: '/api/v1/updateRestaurant/:id',
                delete_restaurant: '/api/v1/deleteRestaurant/:id'
            },
            // API key management endpoints
            api_keys: {
                create_api_key: '/api/createAPIKey',
                approve_admin: '/api/approveAdmin',
                check_admin_approval: '/api/isAdminApproved'
            }
        },

        // Authentication requirements
        authentication: {
            api_key: 'All endpoints require an API key as a query parameter (?key=your_api_key)',
            admin_routes: 'Requires admin role and approval',
        },

        // Additional information
        documentation: {
            base_url: '/api/v1',
            status_codes: {
                '200': 'Success',
                '201': 'Resource Created',
                '400': 'Bad Request',
                '401': 'Unauthorized',
                '404': 'Resource Not Found',
                '500': 'Internal Server Error'
            }
        }
    });
}

module.exports = welcomeHandler;