const express = require('express');
const router = express.Router();

// APIs Wrapper
const NewYorkTimesWrapper = require('../wrappers/nytimes-wrapper');

/**
 * Get latest news from cryptocompare
 * Query params:
 * - key: api key needed for accessing this resource [MANDATORY]
 * - number: minimum number of news to retrieve, if available
 */
router.get("/latest", async (req, res, next) => {
    // Check for api key
    if (!req.query.key || req.query.key !== process.env.NEWS_ADAPTER_API_KEY) {
        return res.status(401).json({
            statusCode: 401,
            message: "Unauthorized"
        });
    }

    // Get minimum number of news from request
    const numberOfNews = (req.query.number ? req.query.number : 1);

    // Setup API wrappers
    const newYorkTimesWrapper = new NewYorkTimesWrapper();

    // Get news
    const news = await newYorkTimesWrapper.getLatestCryptoNews(numberOfNews);

    // Return news or error
    if (news) {
        res.status(200).json(news);
    } else {
        next(err);
    }
});

/**
 * Search for news of a given currency from cryptocompare
 * Query params:
 * - key: api key needed for accessing this resource [MANDATORY]
 * - from: search news from the specified date [MANDATORY]
 * - to: search news to the specified date [MANDATORY]
 * - currency: search for a specific crypto currency
 * - number: minimum number of news to retrieve, if available
 */
router.get("/search", async (req, res, next) => {
    // Check for api key
    if (!req.query.key || req.query.key !== process.env.NEWS_ADAPTER_API_KEY) {
        return res.status(401).json({
            statusCode: 401,
            message: "Unauthorized"
        });
    }

    // Get specific currency if specified
    const currency = (req.query.currency ? req.query.currency : "all");

    // Get minimum number of news from request
    const numberOfNews = (req.query.number ? req.query.number : 1);

    // Check if the request is valid
    if (!req.query.from || !req.query.to) {
        return res.status(400).json({
            statusCode: 400,
            message: "Bad Request",
            error: "the query parameters from and to must be provided"
        });
    }

    // Get time frame
    const fromDate = new Date(req.query.from);
    const toDate = new Date(req.query.to);

    // Setup API wrappers
    const newYorkTimesWrapper = new NewYorkTimesWrapper();

    // Get news
    const news = await newYorkTimesWrapper.getSpecificCryptoNews(fromDate, toDate, currency, numberOfNews);

    // Return news or error
    if (news) {
        res.status(200).json(news);
    } else {
        next(err);
    }
});

module.exports = router;
