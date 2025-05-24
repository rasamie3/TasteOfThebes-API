/**
 * Restaurant Model
 * Defines the schema for restaurant data including basic information and Google Places data
 * Stores both user-provided and externally fetched restaurant information
 */
const mongoose = require('mongoose');

/**
 * Schema definition for restaurants
 * @property {String} arabic_name - Restaurant name in Arabic (required)
 * @property {String} english_name - Restaurant name in English (required)
 * @property {String} phone - Restaurant contact number
 * @property {String} type - Type of cuisine or restaurant category
 * @property {String} address - Physical location of the restaurant
 * @property {String} place_id - Google Places API unique identifier
 * @property {Number} google_rating - Restaurant rating from Google (0-5)
 * @property {String} price_per_person - Average price per person
 * @property {String} directions - Directions to reach the restaurant
 * @property {String} google_reviews - Reviews from Google Places
 */
const restaurantSchema = new mongoose.Schema({
    // Primary identifier in Arabic
    arabic_name: {
        type: String,
        required: true,
        trim: true // Remove whitespace from both ends
    },
    // Primary identifier in English
    english_name: {
        type: String,
        required: true
    },
    // Contact information
    phone: {
        type: String,
        trim: true // Remove whitespace from both ends
    },
    // Restaurant category or cuisine type
    type: {
        type: String
    },
    // Physical location
    address: {
        type: String,
    },
    // Google Places API identifier
    place_id: {
        type: String
    },
    // Google Places rating (0-5 scale)
    google_rating: {
        type: Number,
    },
    // Cost information
    price_per_person: {
        type: String
    },
    // Navigation information
    directions: {
        type: String
    },
    // Customer reviews from Google
    google_reviews: {
        type: String
    }
});

// Create and export the model with versioned collection name
module.exports = mongoose.model("v1_restaurants", restaurantSchema);