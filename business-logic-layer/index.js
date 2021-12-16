// Initialization
const express = require('express');
const businessLayer = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const docs = require('./doc/index');

const axios = require('axios');
// Set default authorization

// Route modules
const latest = require('./routes/latest');
const search = require('./routes/search');

// Load environment variables
require('dotenv').config();

// Middlewares
businessLayer.use(express.json());
businessLayer.use(morgan("dev"));
businessLayer.use(cors());

// Documentation
businessLayer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// Check permissions
businessLayer.use((req, res, next) => {
    if (req.headers.authorization !== process.env.NEWS_BUSINESS_LOGIC_API_KEY) {
        return res.status(401).send({ error: "Unauthorized" })
    } else {
        // Set default authorization for news adapter
        axios.defaults.headers.common["Authorization"] = process.env.NEWS_ADAPTER_API_KEY;
        next();
    }
});

// API endpoints
businessLayer.use('/latest/', latest);
businessLayer.use('/search/', search);

// Default 404 handler
businessLayer.use((req, res) => {
    res.status(404).json({
        message: "Not Found"
    });
});

// Centralized Error Handler
businessLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        error: `Internal Server Error - ${err}`,
    });
});

// Start server
businessLayer.listen(process.env.PORT || 8000, () => {
    console.log(`News Business Logic Layer listening on port ${process.env.PORT || 8000}`);
});
