var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for CryptoPanic API
 */
class CryptoPanicWrapper {
    constructor() {
        this.API_KEY = process.env.CRYPTO_PANIC_API_KEY;
    }

    /**
     * Get latest crypto currency news from CryptoPanic
     * @param {string[]} currencies - specific currencies to check. Defaults to all if none are provided
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews(currencies) {
        try {
            const rawNews = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${this.API_KEY}&filter=important&kind=news` + (currencies ? `&currencies=${currencies.join()}` : "") + "&public=true");
            let newsResult = [];
            for (const newsItem in rawNews.data.results) {
                if (Object.hasOwnProperty.call(rawNews.data.results, newsItem)) {
                    const element = rawNews.data.results[newsItem];
                    newsResult.push(new News(element.title, element.url, element.published_at));
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = CryptoPanicWrapper;