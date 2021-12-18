const express = require('express');
const router = express.Router();

// APIs Wrapper
const CryptoCompareWrapper = require('../wrappers/cryptocompare-wrapper');

/**
 * Get latest news from cryptocompare
 */
router.get("/latest", async (req, res, next) => {
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
 * - currency: search for a specific crypto currency
 */
router.get("/search", async (req, res, next) => {
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
