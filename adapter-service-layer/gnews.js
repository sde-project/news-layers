var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for GNews API
 */
class GNewsWrapper {
    #API_KEY;               // API Key necessary for accessing the API
    #NEWS_PER_PAGE = 10;    // How many news are there in every page
    #CALLS_PER_SECOND = 1;  // How many calls per second can we do

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#API_KEY = process.env.GNEWS_API_KEY;
    }

    /**
     * Get latest crypto currency news from GNews
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews() {
        try {
            // Array keeping all the news
            let newsResult = [];

            // Perform request
            const rawNews = await axios.get(`https://gnews.io/api/v4/top-headlines?q=cryptocurrency&token=${this.#API_KEY}&lang=en&max=${this.#NEWS_PER_PAGE}`);
            for (const newsItem in rawNews.data.articles) {
                if (Object.hasOwnProperty.call(rawNews.data.articles, newsItem)) {
                    const element = rawNews.data.articles[newsItem];
                    newsResult.push(new News(element.title, element.url, element.publishedAt));
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Get crypto currency news based on different filters
     * @param {Date} fromDate Search news from the specified date
     * @param {Date} toDate Search news to the specified date
     * @param {string} currency Chosen currency - default is "all"
     * @returns Filtered crypto currency news
     */
    async getSpecificCryptoNews(fromDate, toDate, currency = "all") {
        try {
            // Array keeping all the news
            let newsResult = [];

            // Convert dates to solve the timezone issue
            const offset = fromDate.getTimezoneOffset();
            fromDate = new Date(fromDate.getTime() - (offset * 60 * 1000));
            toDate = new Date(toDate.getTime() - (offset * 60 * 1000));

            // Define date filters according to API specification
            const dateFilters = `from=${fromDate.toISOString()}&to=${toDate.toISOString()}&sortby=relevance`;

            // Perform requests
            const rawNews = await axios.get(`https://gnews.io/api/v4/top-headlines?q=${currency == "all" ? "cryptocurrency" : currency}&token=${this.#API_KEY}&lang=en&max=${this.#NEWS_PER_PAGE}&${dateFilters}`);
            for (const newsItem in rawNews.data.articles) {
                if (Object.hasOwnProperty.call(rawNews.data.articles, newsItem)) {
                    const element = rawNews.data.articles[newsItem];
                    newsResult.push(new News(element.title, element.url, element.publishedAt));
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = GNewsWrapper;