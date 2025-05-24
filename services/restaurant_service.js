/**
 * Restaurant Service
 * Handles all database operations for restaurants
 * Provides CRUD operations and specialized queries
 */
const restaurantModel = require('../models/restaurant_model');

class RestaurantServices {
    /**
     * Creates a new restaurant in the database
     * @param {Object} restaurantData - Restaurant information including basic and external data
     * @returns {Promise<Object>} The created restaurant document
     */
    async createRestaurant(restaurantData) {
        const restaurant = new restaurantModel(restaurantData);
        return await restaurant.save();
    }

    /**
     * Retrieves all restaurants from the database
     * @returns {Promise<Array>} Array of all restaurant documents
     */
    async getAllRestaurants() {
        return await restaurantModel.find();
    }

    /**
     * Finds restaurants with missing or default data
     * Searches for restaurants where any of the following fields have default values:
     * - phone
     * - type
     * - address
     * - place_id
     * - directions
     * - google_reviews
     * - google_rating
     * @returns {Promise<Array>} Array of restaurants with missing data
     */
    async getRestaurantsWithMissingData() {
        return await restaurantModel.find({
            $or: [
                {phone: "-1"},
                {type: "-1"},
                {address: "-1"},
                {place_id: "-1"},
                {directions: "-1"},
                {google_reviews: "-1"},
                {google_rating: -1}
            ]
        });
    }

    /**
     * Updates an existing restaurant's information
     * @param {string} id - MongoDB document ID of the restaurant
     * @param {Object} updatedData - New data to update the restaurant with
     * @returns {Promise<Object>} The updated restaurant document
     */
    async updateRestaurantsData(id, updatedData) {
        return await restaurantModel.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Run model validators on update
        });
    }

    /**
     * Removes a restaurant from the database
     * @param {string} id - MongoDB document ID of the restaurant to delete
     * @returns {Promise<Object>} The deleted restaurant document
     */
    async deleteRestaurant(id) {
        return await restaurantModel.findByIdAndDelete(id);
    }
} 

// Export a singleton instance of the service
module.exports = new RestaurantServices();