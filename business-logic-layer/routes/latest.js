const express = require('express');
const router = express.Router();

// String similarity calculation
const stringSimilarity = require('string-similarity');
const similarityThreshold = 0.6;

// Sentiment analysis - paper on the use of vader for crypto sentiment analysis: https://www.mdpi.com/2504-2289/4/4/33/pdf
const vader = require('vader-sentiment');

// APIs Wrappers
const CryptoCompareWrapper = require('../wrappers/cryptocompare-wrapper');
const CryptoPanicWrapper = require('../wrappers/cryptopanic-wrapper');

/**
 * Get latest news
 * Query params:
 * - number: minimum number of news to retrieve, if available
 */
router.get("/", async (req, res, next) => {
    // Get minimum number of news from request
    const numberOfNews = (req.query.number ? req.query.number : 1);

    // Setup API wrappers
    const cryptoCompareWrapper = new CryptoCompareWrapper(process.env.ADAPTER_HOST);
    const cryptoPanicWrapper = new CryptoPanicWrapper(process.env.ADAPTER_HOST);

    // Get news from different sources
    let news = await Promise.all([
        cryptoCompareWrapper.getLatestCryptoNews(),
        cryptoPanicWrapper.getLatestCryptoNews(numberOfNews)
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

/**
 * Get latest news on a specific crypto currency
 * Parameters:
 * - currency: crypto currency to search (CODE)
 * Query params:
 * - number: minimum number of news to retrieve, if available
 */
router.get("/currency/:currency", async (req, res, next) => {
    const currency = req.params.currency;

    if (currency) {
        // Get minimum number of news from request
        const numberOfNews = (req.query.number ? req.query.number : 1);

        // Setup API wrappers
        const cryptoCompareWrapper = new CryptoCompareWrapper();
        const cryptoPanicWrapper = new CryptoPanicWrapper();

        // Get news from different sources
        let news = await Promise.all([
            cryptoCompareWrapper.getSpecificCryptoNews(currency),
            cryptoPanicWrapper.getSpecificCryptoNews(currency, numberOfNews)
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
    } else {
        res.status(400).json({
            error: "No Crypto Currency Provided"
        });
    }
});

module.exports = router;