# TasteOfThebes API

[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.1.0-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v8.15.0-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## About Luxor

Luxor, known as the "world's greatest open-air museum," is a historic city in southern Egypt that was once the ancient city of Thebes. While famous for its archaeological wonders like the Valley of the Kings and the Temple of Karnak, the city's authentic local culture and cuisine often remain hidden from tourists.

## Project Purpose

This REST API provides a comprehensive database of restaurants in Luxor, focusing on both local and international cuisine. Our API offers:

- Restaurant listings with detailed information
- Menu items and pricing
- Location data
- Contact information


The API serves as a centralized source of restaurant data, making it easier for developers to build applications that help visitors discover dining options in Luxor.

## Data Sources and Collection

Our restaurant data is primarily sourced through:

1. **External API Integration**
   - Integration with External API for restaurant data
   - Automated data collection and updates
   - Structured data processing

2. **Data Management**
   - Admin verification of restaurant information
   - Regular data updates
   - Quality control checks

This approach ensures reliable and up-to-date restaurant information for our users.

## Project Requirements

### Prerequisites
- Node.js (v18.x or higher)
- MongoDB (v8.15.0 or higher)
- npm (Node Package Manager)

## API Structure

### Core Components
1. **Models**: Define the data structure for restaurants, dishes, and reviews
2. **Controllers**: Handle business logic and data processing
3. **Routes**: Define API endpoints and request handling
4. **Middleware**: Authentication, validation, and error handling
5. **Services**: External API integrations and data processing

### API Routes

#### Restaurant Routes
- `GET /getAllRestaurants` - Retrieves all restaurants from the database
- `POST /addRestaurant` - Creates a new restaurant with enriched data (requires admin role and approval)
- `GET /getRestaurantsWithMissingData` - Retrieves restaurants with missing required information (requires admin role and approval)
- `PUT /updateRestaurant/:id` - Updates an existing restaurant's information (requires admin role and approval)
- `DELETE /deleteRestaurant/:id` - Removes a restaurant from the database (requires admin role and approval)

#### Welcome Routes
- `GET /` - Returns API documentation and available endpoints

#### API Keys Routes
- `GET /createAPIKey` - Creates a new API key for a specified role (admin or user)
- `GET /approveAdmin` - Allows super admin to approve an admin API key
- `GET /isAdminApproved` - Checks if an admin API key has been approved by super admin

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm app.js
   ```

## API Testing

A Postman collection is included in the project for testing all API endpoints. The collection file `taste-of-thebes.postman_collection.json` contains pre-configured requests for all available endpoints.

To use the Postman collection:
1. Open Postman
2. Click "Import" and select the `taste-of-thebes.postman_collection.json` file
3. The collection will be imported with all endpoints pre-configured
4. Update the environment variables in Postman with your API key
5. Start testing the endpoints

The collection includes:
- All restaurant endpoints
- API key management endpoints
- Welcome endpoint
- Example request bodies for POST and PUT requests
- Environment variables setup

## API Documentation

The API uses RESTful principles and returns JSON responses. All endpoints require authentication using an API key, which should be included as a query parameter:

```
?key=your-api-key
```

Example request:
```
GET /getAllRestaurants?key=your-api-key
```

### Response Format
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Format
```json
{
  "status": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Example error responses:
```json
// Missing API Key
{
  "status": false,
  "message": "API Key is required",
  "error": "Missing API Key"
}

// Invalid API Key
{
  "status": false,
  "message": "Invalid API Key",
  "error": "API Key not found"
}

// Server Error
{
  "status": false,
  "message": "Authentication failed",
  "error": "Error message details"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License

Copyright (c) 2025 TasteOfThebes API