var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for The Guardian API
 */
class TheGuardianWrapper {
    #API_KEY;               // API Key necessary for accessing the API
    #FIRST_PAGE = 1;        // Index of the first page
    #CALLS_PER_SECOND = 12; // How many calls per second can we do
    #NEWS_PER_PAGE = 50;    // How many news are there in every page

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#API_KEY = process.env.THE_GUARDIAN_API_KEY;
    }

    /**
     * Get latest crypto currency news from The Guardian
     * @param {number} numberOfNews Minimum number of news to fetch
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews(numberOfNews = this.#NEWS_PER_PAGE) {
        try {
            // Array keeping all the news
            let newsResult = [];

            // Define the pages we have to fetch
            const pagesToFetch = Math.min(Math.ceil(numberOfNews / this.#NEWS_PER_PAGE), this.#CALLS_PER_SECOND);

            // Perform requests
            for (let i = 0; i < pagesToFetch; i++) {
                const rawNews = await axios.get(`https://content.guardianapis.com/search?q=cryptocurrency&api-key=${this.#API_KEY}&order-by=newest&page-size=${this.#NEWS_PER_PAGE}&page=${i + this.#FIRST_PAGE}`);
                for (const newsItem in rawNews.data.response.results) {
                    if (Object.hasOwnProperty.call(rawNews.data.response.results, newsItem)) {
                        const element = rawNews.data.response.results[newsItem];
                        newsResult.push(new News(element.webTitle, element.webUrl, element.webPublicationDate));
                    }
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
     * @param {number} numberOfNews Minimum number of news
     * @returns Filtered crypto currency news
     */
    async getSpecificCryptoNews(fromDate, toDate, currency = "all", numberOfNews = this.#NEWS_PER_PAGE) {
        try {
            // Array keeping all the news
            let newsResult = [];

            // Define the pages we have to fetch
            const pagesToFetch = Math.min(Math.ceil(numberOfNews / this.#NEWS_PER_PAGE), this.#CALLS_PER_SECOND);

            // Convert dates to solve the timezone issue
            const offset = fromDate.getTimezoneOffset();
            fromDate = new Date(fromDate.getTime() - (offset * 60 * 1000));
            toDate = new Date(toDate.getTime() - (offset * 60 * 1000));

            // Define date filters according to API specification
            const dateFilters = `from-date=${fromDate.toISOString().split('T')[0]}&to-date=${toDate.toISOString().split('T')[0]}`;

            // Perform requests
            for (let i = 0; i < pagesToFetch; i++) {
                const rawNews = await axios.get(`https://content.guardianapis.com/search?q=${currency == "all" ? "cryptocurrency" : currency}&api-key=${this.#API_KEY}&query-fields=main&order-by=newest&page-size=${this.#NEWS_PER_PAGE}&page=${i + this.#FIRST_PAGE}&${dateFilters}`);
                for (const newsItem in rawNews.data.response.results) {
                    if (Object.hasOwnProperty.call(rawNews.data.response.results, newsItem)) {
                        const element = rawNews.data.response.results[newsItem];
                        newsResult.push(new News(element.webTitle, element.webUrl, element.webPublicationDate));
                    }
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = TheGuardianWrapper;