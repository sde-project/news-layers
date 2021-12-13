var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for CryptoCompare API
 */
class CryptoCompareWrapper {
    #API_KEY;                       // API Key necessary for accessing the API
    #APP_NAME = "NewsAggregation";  // Adviced to use it for making requests to the API

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#API_KEY = process.env.CRYPTO_COMPARE_API_KEY;
    }

    /**
     * Get latest crypto currency news from CryptoCompare
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews() {
        // Array keeping all the news
        let newsResult = [];

        // Perform request
        const rawNews = await axios.get(`https://min-api.cryptocompare.com/data/v2/news/?api_key=${this.#API_KEY}&extraParams=${this.#APP_NAME}`).catch(e => console.log(e));
        if (rawNews) {
            for (const newsItem in rawNews.data.Data) {
                if (Object.hasOwnProperty.call(rawNews.data.Data, newsItem)) {
                    const element = rawNews.data.Data[newsItem];
                    newsResult.push(new News(element.title, element.url, element.published_on * 1000));
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
        const rawNews = await axios.get(`https://min-api.cryptocompare.com/data/v2/news/?api_key=${this.#API_KEY}&${currency == "all" ? "" : ("categories=" + currency)}&extraParams=${this.#APP_NAME}`).catch(e => console.log(e));
        if (rawNews) {
            for (const newsItem in rawNews.data.Data) {
                if (Object.hasOwnProperty.call(rawNews.data.Data, newsItem)) {
                    const element = rawNews.data.Data[newsItem];
                    newsResult.push(new News(element.title, element.url, element.published_on * 1000));
                }
            }
        }
        return newsResult;
    }
}

module.exports = CryptoCompareWrapper;