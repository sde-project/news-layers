// Initialization
const express = require('express');
const adapterLayer = express();

// Route modules
const cryptocompare = require('./routes/cryptocompare');
const cryptopanic = require('./routes/cryptopanic');
const gnews = require('./routes/gnews');
const nytimes = require('./routes/nytimes');
const theguardian = require('./routes/theguardian');

// Load environment variables
require('dotenv').config();

// Middlewares
adapterLayer.use(express.json());

// API endpoints
adapterLayer.use('/api/cryptocompare/', cryptocompare);
adapterLayer.use('/api/cryptopanic/', cryptopanic);
adapterLayer.use('/api/gnews/', gnews);
adapterLayer.use('/api/nytimes/', nytimes);
adapterLayer.use('/api/theguardian/', theguardian);

// Default 404 handler
adapterLayer.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: "Not Found"
    });
});

// Centralized Error Handler
adapterLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        error: err
    });
});

// Start server
adapterLayer.listen(process.env.PORT || 8000, () => {
    console.log(`News Adapter Layer listening on port ${process.env.PORT || 8000}`);
});
