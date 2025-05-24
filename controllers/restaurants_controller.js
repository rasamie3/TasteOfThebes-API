/**
 * Restaurant Controller
 * Handles all restaurant-related operations including CRUD operations and data enrichment
 */
const restaurantService = require('../services/restaurant_service');
const restauratntExternalService = require('../services/restaurant_external_service');

class RestaurantController {
    /**
     * Creates a new restaurant with enriched data from external service
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} JSON response with created restaurant data
     */
    async createRestaurant(req, res) {
        try {
            const userData = req.body;
            // Fetch additional data from external service
            const externalData = await restauratntExternalService.getExternalRestaurantData(userData.arabic_name);
            const fullData = {
                ...userData,
                ...externalData
            }

            // Create restaurant in database
            const createdRestaurant = await restaurantService.createRestaurant(fullData);
            return res.status(201).json({
                status: true, 
                message: 'Restaurant created successfully', 
                data: createdRestaurant
            });
        } catch (error) {
            return res.status(400).json({
                status: false, 
                message: 'Failed to create restaurant',
                error: error.message
            });
        }
    }

    /**
     * Retrieves all restaurants from the database
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} JSON response with all restaurants
     */
    async getAllRestaurants(req, res) {
        try {
            const restaurants = await restaurantService.getAllRestaurants();
            return res.status(200).json({
                status: true, 
                message: 'Restaurants retrieved successfully', 
                data: restaurants
            });
        } catch (error) {
            return res.status(500).json({
                status: false, 
                message: 'Failed to retrieve restaurants',
                error: error.message
            });
        }
    }

    /**
     * Retrieves restaurants that have missing required data
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} JSON response with restaurants having missing data
     */
    async getRestaurantsWithMissingData(req, res) {
        try {
            const restaurants = await restaurantService.getRestaurantsWithMissingData();
            return res.status(200).json({
                status: true, 
                message: 'Restaurants with missing data retrieved successfully', 
                data: restaurants
            });
        } catch (error) {
            return res.status(500).json({
                status: false, 
                message: 'Failed to retrieve restaurants with missing data',
                error: error.message
            });
        }
    }

    /**
     * Updates an existing restaurant's data
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} JSON response with updated restaurant data
     */
    async updateRestaurant(req, res) {
        try {
            const {id} = req.params;
            const updatedData = req.body;

            const updatedRestaurant = await restaurantService.updateRestaurantsData(id, updatedData);

            if (!updatedRestaurant) {
                return res.status(404).json({
                    status: false, 
                    message: 'Restaurant not found'
                });
            }

            return res.status(200).json({
                status: true, 
                message: 'Restaurant updated successfully', 
                data: updatedRestaurant
            });
        } catch(error) {
            return res.status(500).json({
                status: false, 
                message: 'Failed to update restaurant',
                error: error.message
            });
        }
    }

    /**
     * Deletes a restaurant from the database
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} JSON response with deletion status
     */
    async deleteRestaurant(req, res) {
        try {
            const {id} = req.params;
            const deletedRestaurant = await restaurantService.deleteRestaurant(id);

            if (!deletedRestaurant) {
                return res.status(404).json({
                    status: false, 
                    message: 'Restaurant not found'
                });
            }

            return res.status(200).json({
                status: true, 
                message: 'Restaurant deleted successfully', 
                data: deletedRestaurant
            });
        } catch (error) {
            return res.status(500).json({
                status: false, 
                message: 'Failed to delete restaurant',
                error: error.message
            });
        }
    }
}

module.exports = new RestaurantController();