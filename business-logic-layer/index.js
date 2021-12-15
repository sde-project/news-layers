// Initialization
const express = require('express');
const businessLayer = express();

// Route modules
const latest = require('./routes/latest');
const search = require('./routes/search');

// Load environment variables
require('dotenv').config();

// Middlewares
businessLayer.use(express.json());

// API endpoints
businessLayer.use('/api/latest/', latest);
businessLayer.use('/api/search/', search);

// Default 404 handler
businessLayer.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: "Not Found"
    });
});

// Centralized Error Handler
businessLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        error: err
    });
});

// Start server
businessLayer.listen(process.env.PORT || 8001, () => {
    console.log(`News Business Logic Layer listening on port ${process.env.PORT || 8001}`);
});
