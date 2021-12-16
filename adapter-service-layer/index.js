// Initialization
const express = require('express');
const adapterLayer = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const docs = require('./doc/index');

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
adapterLayer.use(morgan("dev"));
adapterLayer.use(cors());

// Documentation
adapterLayer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// Check permissions
adapterLayer.use((req, res, next) => {
    if (req.headers.authorization !== process.env.NEWS_ADAPTER_API_KEY) {
        return res.status(401).send({ error: "Unauthorized" })
    } else {
        next();
    }
});

// API endpoints
adapterLayer.use('/cryptocompare/', cryptocompare);
adapterLayer.use('/cryptopanic/', cryptopanic);
adapterLayer.use('/gnews/', gnews);
adapterLayer.use('/nytimes/', nytimes);
adapterLayer.use('/theguardian/', theguardian);

// Default 404 handler
adapterLayer.use((req, res) => {
    res.status(404).json({
        error: "Not Found"
    });
});

// Centralized Error Handler
adapterLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        message: `Internal Server Error - ${err}`,
    });
});

// Start server
adapterLayer.listen(process.env.PORT || 8000, () => {
    console.log(`News Adapter Layer listening on port ${process.env.PORT || 8000}`);
});
