const express = require('express');
const router = express.Router();

// String similarity calculation
const stringSimilarity = require('string-similarity');
const similarityThreshold = 0.6;

// Sentiment analysis - paper on the use of vader for crypto sentiment analysis: https://www.mdpi.com/2504-2289/4/4/33/pdf
const vader = require('vader-sentiment');

// API Wrappers
const GNewsWrapper = require('../wrappers/gnews-wrapper');
const NewYorkTimesWrapper = require('../wrappers/nytimes-wrapper');
const TheGuardianWrapper = require('../wrappers/theguardian-wrapper');

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
            error: "Bad Request - the query parameters from and to must be provided"
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

    // Remove duplicates, similarity calculated based on Sørensen Dice coefficient
    for (let i = 0; i < news.length; i++) {
        for (let j = i; j < news.length; j++) {
            const similarity = stringSimilarity.compareTwoStrings(news[i].title, news[j].title);
            if (similarity > similarityThreshold) {
                news.splice(j, 1);
            }
        }
    }

    // Sentiment analysis
    for (let i = 0; i < news.length; i++) {
        news[i].sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(news[i].title).compound;
    }

    // Return news or error
    if (news) {
        res.status(200).json(news);
    } else {
        next(err);
    }
});

module.exports = router;