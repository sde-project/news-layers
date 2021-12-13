var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for New York Times API
 */
class NewYorkTimesWrapper {
    #API_KEY;               // API Key necessary for accessing the API
    #FIRST_PAGE = 0;        // Index of the first page
    #NEWS_PER_PAGE = 10;    // How many news are there in every page
    #CALLS_PER_MINUTE = 10; // How many calls per minute can we do

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#API_KEY = process.env.NEW_YORK_TIMES_API_KEY;
    }

    /**
     * Get latest crypto currency news from the New York Times
     * @param {number} numberOfNews Minimum number of news to fetch
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews(numberOfNews = this.#NEWS_PER_PAGE) {
        // Array keeping all the news
        let newsResult = [];

        // Define the pages we have to fetch
        const pagesToFetch = Math.min(Math.ceil(numberOfNews / this.#NEWS_PER_PAGE), this.#CALLS_PER_MINUTE);

        // Perform requests
        for (let i = 0; i < pagesToFetch; i++) {
            const rawNews = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=cryptocurrency&api-key=${this.#API_KEY}&page=${i + this.#FIRST_PAGE}`).catch(e => console.log(e));
            if (rawNews) {
                for (const newsItem in rawNews.data.response.docs) {
                    if (Object.hasOwnProperty.call(rawNews.data.response.docs, newsItem)) {
                        const element = rawNews.data.response.docs[newsItem];
                        newsResult.push(new News(element.snippet, element.web_url, element.pub_date));
                    }
                }
            }
        }
        return newsResult;
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
        // Array keeping all the news
        let newsResult = [];

        // Define the pages we have to fetch
        const pagesToFetch = Math.min(Math.ceil(numberOfNews / this.#NEWS_PER_PAGE), this.#CALLS_PER_MINUTE);

        // Convert dates to solve the timezone issue
        const offset = fromDate.getTimezoneOffset();
        fromDate = new Date(fromDate.getTime() - (offset * 60 * 1000));
        toDate = new Date(toDate.getTime() - (offset * 60 * 1000));

        // Define date filters according to API specification
        const dateFilters = `begin_date=${fromDate.toISOString().split('T')[0].replace(/-/g, '')}&end_date=${toDate.toISOString().split('T')[0].replace(/-/g, '')}`;

        // Perform requests
        for (let i = 0; i < pagesToFetch; i++) {
            const rawNews = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${currency == "all" ? "cryptocurrency" : currency}&api-key=${this.#API_KEY}&page=${i + this.#FIRST_PAGE}&facet=true&${dateFilters}`).catch(e => console.log(e));

            if (rawNews) {
                for (const newsItem in rawNews.data.response.docs) {
                    if (Object.hasOwnProperty.call(rawNews.data.response.docs, newsItem)) {
                        const element = rawNews.data.response.docs[newsItem];
                        newsResult.push(new News(element.snippet, element.web_url, element.pub_date));
                    }
                }
            }
        }
        return newsResult;
    }
}

module.exports = NewYorkTimesWrapper;