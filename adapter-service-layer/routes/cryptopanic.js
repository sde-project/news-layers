const express = require('express');
const router = express.Router();

// APIs Wrapper
const CryptoPanicWrapper = require('../wrappers/cryptopanic-wrapper');

/**
 * Get latest news from cryptocompare
 * Query params:
 * - number: minimum number of news to retrieve, if available
 */
router.get("/latest", async (req, res, next) => {
    // Get minimum number of news from request
    const numberOfNews = (req.query.number ? req.query.number : 1);

    // Setup API wrappers
    const cryptoPanicWrapper = new CryptoPanicWrapper();

    // Get news
    const news = await cryptoPanicWrapper.getLatestCryptoNews(numberOfNews);

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
 * - number: minimum number of news to retrieve, if available 
 * - currency: search for a specific crypto currency
 */
router.get("/search", async (req, res, next) => {
    // Get minimum number of news from request
    const numberOfNews = (req.query.number ? req.query.number : 1);

    // Get specific currency if specified
    const currency = (req.query.currency ? req.query.currency : "all");

    // Setup API wrappers
    const cryptoCompareWrapper = new CryptoPanicWrapper();

    // Get news
    const news = await cryptoCompareWrapper.getSpecificCryptoNews(currency, numberOfNews);

    // Return news or error
    if (news) {
        res.status(200).json(news);
    } else {
        next(err);
    }
});

module.exports = router;
