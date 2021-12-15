const express = require('express');
const router = express.Router();

// APIs Wrapper
const CryptoCompareWrapper = require('../wrappers/cryptocompare-wrapper');

/**
 * Get latest news from cryptocompare
 * Query params:
 * - key: api key needed for accessing this resource [MANDATORY]
 */
router.get("/latest", async (req, res, next) => {
    // Check for api key
    if (!req.query.key || req.query.key !== process.env.NEWS_ADAPTER_API_KEY) {
        return res.status(401).json({
            statusCode: 401,
            message: "Unauthorized"
        });
    }

    // Setup API wrappers
    const cryptoCompareWrapper = new CryptoCompareWrapper();

    // Get news
    const news = await cryptoCompareWrapper.getLatestCryptoNews();

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
 * - currency: search for a specific crypto currency
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

    // Setup API wrappers
    const cryptoCompareWrapper = new CryptoCompareWrapper();

    // Get news
    const news = await cryptoCompareWrapper.getSpecificCryptoNews(currency);

    // Return news or error
    if (news) {
        res.status(200).json(news);
    } else {
        next(err);
    }
});

module.exports = router;
