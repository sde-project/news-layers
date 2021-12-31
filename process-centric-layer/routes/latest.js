const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

/**
 * Get latest news
 * Query params:
 * - number: minimum number of news to retrieve, if available
 */
router.get("/", async (req, res, next) => {

    // Get latest news
    let news = await axios.get(`${process.env.NEWS_BUSINESS_LOGIC_HOST}/latest`).catch(e => console.log(e));

    // Return news or error
    if (news) {
        res.status(200).json(news.data);
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
        // Get latest news
        let news = await axios.get(`${process.env.NEWS_BUSINESS_LOGIC_HOST}/latest/currency/${currency}`).catch(e => console.log(e));

        // Return news or error
        if (news) {
            res.status(200).json(news.data);
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