var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for New York Times API
 */
class NewYorkTimesWrapper {
    constructor() {
        this.API_KEY = process.env.NEW_YORK_TIMES_API_KEY;
    }

    /**
     * Get latest crypto currency news from the New York Times
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews() {
        try {
            // TODO: in the first page we have 10 results, we have to decide whether they are enough or not
            const rawNews = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=cryptocurrency&api-key=${this.API_KEY}&page=0`);
            let newsResult = [];
            for (const newsItem in rawNews.data.response.docs) {
                if (Object.hasOwnProperty.call(rawNews.data.response.docs, newsItem)) {
                    const element = rawNews.data.response.docs[newsItem];
                    newsResult.push(new News(element.snippet, element.web_url, element.pub_date));
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = NewYorkTimesWrapper;