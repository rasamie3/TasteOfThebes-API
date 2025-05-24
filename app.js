/**
 * Main Application Entry Point
 * Configures and initializes the Express server
 * Sets up middleware, routes, and database connection
 */

// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import route handlers
const welcomeRoutes = require('./routes/welcome_routes');
const apiKeysRoutes = require('./routes/apikeys_routes');
const restaurantRoutes = require('./routes/restaurant_routes');

// Initialize Express application
const app = express();

/**
 * Middleware Configuration
 * - express.json(): Parses incoming JSON payloads
 */
app.use(express.json());  // parses req.body data to json format

/**
 * Route Configuration
 * - /: Welcome and API documentation
 * - /api/: API key management endpoints
 * - /api/v1/: Restaurant management endpoints
 */
app.use('/', welcomeRoutes);
app.use('/api/', apiKeysRoutes);
app.use('/api/v1/', restaurantRoutes);

/**
 * Database Connection
 * Connects to MongoDB using environment variable
 * Logs connection status
 */
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to mongoDB!'))
    .catch(error => console.log(error));

/**
 * Server Configuration
 * Sets up the server port and starts listening
 * Uses environment variable PORT or defaults to 5000
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});