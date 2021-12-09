var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for CryptoCompare API
 */
class CryptoCompareWrapper {
    constructor() {
        this.API_KEY = process.env.CRYPTO_COMPARE_API_KEY;
    }

    /**
     * Get latest crypto currency news from CryptoCompare
     * @returns Latest crypto currency news
     */
     async getLatestCryptoNews() {
        try {
            const rawNews = await axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${this.API_KEY}`);
            let newsResult = [];
            for (const newsItem in rawNews.data.Data) {
                if (Object.hasOwnProperty.call(rawNews.data.Data, newsItem)) {
                    const element = rawNews.data.Data[newsItem];
                    newsResult.push(new News(element.title, element.url, element.published_on * 1000));
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = CryptoCompareWrapper;