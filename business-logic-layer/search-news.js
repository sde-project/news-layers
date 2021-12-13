const express = require('express');
const router = express.Router();

const GNewsWrapper = require('../adapter-service-layer/gnews');
const NewYorkTimesWrapper = require('../adapter-service-layer/nytimes');
const TheGuardianWrapper = require('../adapter-service-layer/theguardian');

/**
 * Search for a certain number of news during a given time frame
 * Query params:
 * - from: search news from the specified date [mandatory]
 * - to: search news to the specified date [mandatory]
 * - number: minimum number of news to retrieve, if available
 * - currency: search for a specific crypto currency
 */
router.get("/", async (req, res, next) => {
    // Get minimum number of news from request
    const numberOfNews = (req.query.number ? req.query.number : 1);

    // Get specific currency is specified
    const currency = (req.query.currency ? req.query.currency : "all");

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
    const gNewsWrapper = new GNewsWrapper();
    const newYorkTimesWrapper = new NewYorkTimesWrapper();
    const theGuardianWrapper = new TheGuardianWrapper();

    // Get news from different sources
    let news = await Promise.all([
        gNewsWrapper.getSpecificCryptoNews(fromDate, toDate, currency),
        newYorkTimesWrapper.getSpecificCryptoNews(fromDate, toDate, currency, numberOfNews),
        theGuardianWrapper.getSpecificCryptoNews(fromDate, toDate, currency, numberOfNews)
    ])
        .then(result => result.reduce((acc, res) => {
            return acc.concat(res);
        }, []))
        .catch(e => console.log(e));

    // Sort news by date in descending order
    news.sort((a, b) => {
        return (b.publishedAt - a.publishedAt);
    });

    // Return news or error
    if (news) {
        res.status(200).json(news);
    } else {
        next(err);
    }
});

module.exports = router;