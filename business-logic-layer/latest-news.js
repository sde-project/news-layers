const express = require('express');
const router = express.Router();

// APIs Wrappers
const CryptoCompareWrapper = require('../adapter-service-layer/cryptocompare');
const CryptoPanicWrapper = require('../adapter-service-layer/cryptopanic');

/**
 * Get latest news
 * Query params:
 * - number: minimum number of news to retrieve, if available
 */
router.get("/", async (req, res, next) => {
    // Get minimum number of news from request
    const numberOfNews = (req.query.number ? req.query.number : 1);

    // Setup API wrappers
    const cryptoCompareWrapper = new CryptoCompareWrapper();
    const cryptoPanicWrapper = new CryptoPanicWrapper();

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

        // Return news or error
        if (news) {
            res.status(200).json(news);
        } else {
            next(err);
        }
    } else {
        res.status(200).json({
            message: "No Crypto Currency Provided"
        });
    }
});

module.exports = router;