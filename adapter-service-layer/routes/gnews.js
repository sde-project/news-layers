const express = require('express');
const router = express.Router();

// APIs Wrapper
const GNewsWrapper = require('../wrappers/gnews-wrapper');

/**
 * Get latest news from cryptocompare
 */
router.get("/latest", async (req, res, next) => {
    // Setup API wrappers
    const gNewsWrapper = new GNewsWrapper();

    // Get news
    const news = await gNewsWrapper.getLatestCryptoNews();

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
 * - from: search news from the specified date [MANDATORY]
 * - to: search news to the specified date [MANDATORY]
 * - currency: search for a specific crypto currency
 */
router.get("/search", async (req, res, next) => {
    // Get specific currency if specified
    const currency = (req.query.currency ? req.query.currency : "all");

    // Check if the request is valid
    if (!req.query.from || !req.query.to) {
        return res.status(400).json({
            error: "Bad Request - the query parameters from and to must be provided"
        });
    }

    // Get time frame
    const fromDate = new Date(req.query.from);
    const toDate = new Date(req.query.to);

    // Setup API wrappers
    const gNewsWrapper = new GNewsWrapper();

    // Get news
    const news = await gNewsWrapper.getSpecificCryptoNews(fromDate, toDate, currency);

    // Return news or error
    if (news) {
        res.status(200).json(news);
    } else {
        next(err);
    }
});

module.exports = router;
