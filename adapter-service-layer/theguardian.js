var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for The Guardian API
 */
class TheGuardianWrapper {
    constructor() {
        this.API_KEY = process.env.THE_GUARDIAN_API_KEY;
    }

    /**
     * Get latest crypto currency news from The Guardian
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews() {
        try {
            // TODO: in the first page we have 10 results, we have to decide whether they are enough or not
            const rawNews = await axios.get(`https://content.guardianapis.com/search?q=cryptocurrency&api-key=${this.API_KEY}&page=1`);
            let newsResult = [];
            for (const newsItem in rawNews.data.response.results) {
                if (Object.hasOwnProperty.call(rawNews.data.response.results, newsItem)) {
                    const element = rawNews.data.response.results[newsItem];
                    newsResult.push(new News(element.webTitle, element.webUrl, element.webPublicationDate));
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = TheGuardianWrapper;