// Initialization
const express = require('express');
const processLayer = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const docs = require('./doc/index');

const axios = require('axios');

// Route modules
const latest = require('./routes/latest');

// Load environment variables
require('dotenv').config();

// Middlewares
processLayer.use(express.json());
processLayer.use(morgan("dev"));
processLayer.use(cors());

// Documentation
processLayer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

processLayer.use((req, res, next) => {
    axios.defaults.headers.common["Authorization"] = process.env.NEWS_BUSINESS_LOGIC_API_KEY;
    next();
});

// API endpoints
processLayer.use('/latest/', latest);

// Default 404 handler
processLayer.use((req, res) => {
    res.status(404).json({
        message: "Not Found"
    });
});

// Centralized Error Handler
processLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        error: `Internal Server Error - ${err}`,
    });
});

// Start server
processLayer.listen(process.env.PORT || 8000, () => {
    console.log(`News Process Centric Layer listening on port ${process.env.PORT || 8000}`);
});
