// Initialization
const express = require('express');
const newsLayer = express();

const latestNews = require('./business-logic-layer/latest-news');
const searchNews = require('./business-logic-layer/search-news');

// Load environment variables
require('dotenv').config();

// Middlewares
newsLayer.use(express.json());

// API endpoints
newsLayer.use('/api/latest/', latestNews);
newsLayer.use('/api/search/', searchNews);

// Default 404 handler
newsLayer.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: "Not Found"
    });
});

// Centralized Error Handler
newsLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        error: err
    });
});

// Start server
newsLayer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
