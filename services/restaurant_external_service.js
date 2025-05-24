/**
 * Restaurant External Service
 * Fetches additional restaurant data from external API (SERP API)
 * Enriches restaurant information with Google Places data
 */

const axios = require('axios');

// External API configuration
const URL = process.env.RESTAURANTS_EXTERNAL_API_URL;
const API_KEY = process.env.RESTAURANTS_EXTERNAL_API_KEY;

/**
 * Fetches external restaurant data from and external API
 * @param {string} placeName - Name of the restaurant to search for
 * @param {string} city - City name with location context (default: "luxor+الاقصر+egypt")
 * @returns {Promise<Object>} Restaurant data including phone, address, rating, etc.
 */
const getExternalRestaurantData = async (placeName, city="luxor+الاقصر+egypt") => {
    // Format place name for URL
    placeName = placeName.replace(" ", "+");
    
    // Construct search parameter
    const fullParam = `${city}+${placeName}`;
    
    // Build API URL with parameters
    const url =`${URL}?format=json&q=${fullParam}&api_key=${API_KEY}`;
    
    // Default values for missing data
    const nullSubData = {
        phone: '-1',
        address: '-1',
        type: '-1',
        google_rating: -1,
        place_id: '-1',
        price_per_person: '-1',
        directions: '-1',
        google_reviews: '-1'
    };

    try {
        // Fetch data from external API
        const response = await axios.get(url);

        // Check if response contains required data
        if (!response.data || !response.data.knowledge_graph) {
            return nullSubData;
        }

        // Extract and format restaurant data from response
        const subData = {
            phone: response.data.knowledge_graph.phone ?? '-1',
            address: response.data.knowledge_graph.address ?? '-1',
            type: response.data.knowledge_graph.type ?? '-1',
            google_rating: response.data.knowledge_graph.rating ?? -1,
            place_id: response.data.knowledge_graph.place_id ?? '-1',
            price_per_person: response.data.knowledge_graph.price ?? '-1',
            directions: response.data.knowledge_graph.directions ?? '-1',
            google_reviews: response.data.knowledge_graph.reviews ?? '-1'
        }
        return subData;
     
    } catch(error) {
        // Log error and return default values
        console.error("Error fetching external data: ", error.message);
        return nullSubData;
    }
}

module.exports = {getExternalRestaurantData};