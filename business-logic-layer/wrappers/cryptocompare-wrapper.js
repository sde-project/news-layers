var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for CryptoCompare Adapter Layer
 */
class CryptoCompareWrapper {
    #HOST;

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#HOST = process.env.ADAPTER_HOST;
    }

    /**
     * Get latest crypto currency news from CryptoCompare
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews() {
        // Array keeping all the news
        let newsResult = [];

        // Perform request
        const rawNews = await axios.get(`${this.#HOST}/cryptocompare/latest`).catch(e => console.log(e));
        if (rawNews) {
            for (const newsItem in rawNews.data) {
                if (Object.hasOwnProperty.call(rawNews.data, newsItem)) {
                    const element = rawNews.data[newsItem];
                    newsResult.push(News.from(element));
                }
            }
        }
        return newsResult;
    }

    /**
     * Get crypto currency news based on different filters
     * @param {string} currency Chosen currency (CODE) - default is "all"
     * @returns Filtered crypto currency news
     */
    async getSpecificCryptoNews(currency = "all") {
        // Array keeping all the news
        let newsResult = [];

        // Perform request
        const rawNews = await axios.get(`${this.#HOST}/cryptocompare/search?currency=${currency}`).catch(e => console.log(e));
        if (rawNews) {
            for (const newsItem in rawNews.data) {
                if (Object.hasOwnProperty.call(rawNews.data, newsItem)) {
                    const element = rawNews.data[newsItem];
                    newsResult.push(News.from(element));
                }
            }
        }
        return newsResult;
    }
}

module.exports = CryptoCompareWrapper;