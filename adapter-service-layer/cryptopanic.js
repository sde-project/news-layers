var axios = require('axios');
const News = require('../models/news');

/**
 * Wrapper for CryptoPanic API
 */
class CryptoPanicWrapper {
    #API_KEY;               // API Key necessary for accessing the API
    #FILTER = "important";  // Default news filter
    #KIND = "news";         // Kind of data we want to retrieve
    #PUBLIC = "true";       // The data will be expose publicly
    #NEWS_PER_PAGE = 200;   // How many news are there in every page
    #FIRST_PAGE = 1;        // Index of the first page
    #CALLS_PER_SECOND = 5;  // How many calls per second can we do

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#API_KEY = process.env.CRYPTO_PANIC_API_KEY;
    }

    /**
     * Get latest crypto currency news from CryptoPanic
     * @param {number} numberOfNews Minimum number of news to fetch
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews(numberOfNews = this.#NEWS_PER_PAGE) {
        try {
            // Array keeping all the news
            let newsResult = [];

            // Define the pages we have to fetch
            const pagesToFetch = Math.min(Math.ceil(numberOfNews / this.#NEWS_PER_PAGE), this.#CALLS_PER_SECOND);

            // Perform request
            for (let i = 0; i < pagesToFetch; i++) {
                const rawNews = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${this.#API_KEY}&filter=${this.#FILTER}&kind=${this.#KIND}&public=${this.#PUBLIC}&page=${i + this.#FIRST_PAGE}`);
                for (const newsItem in rawNews.data.results) {
                    if (Object.hasOwnProperty.call(rawNews.data.results, newsItem)) {
                        const element = rawNews.data.results[newsItem];
                        newsResult.push(new News(element.title, element.url, element.published_at));
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
     * @param {*} currency Chosen currency (CODE) - default is "all"
     * @param {*} numberOfNews Minimum number of news
     * @returns Filtered crypto currency news
     */
    async getSpecificCryptoNews(currency = "all", numberOfNews = this.#NEWS_PER_PAGE) {
        try {
            // Array keeping all the news
            let newsResult = [];

            // Define the pages we have to fetch
            const pagesToFetch = Math.min(Math.ceil(numberOfNews / this.#NEWS_PER_PAGE), this.#CALLS_PER_SECOND);

            // Perform requests
            for (let i = 0; i < pagesToFetch; i++) {
                const rawNews = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${this.#API_KEY}&filter=${this.#FILTER}&kind=${this.#KIND}&public=${this.#PUBLIC}&page=${i + this.#FIRST_PAGE}${currency == "all" ? "" : ("&currencies=" + currency)}`);
                for (const newsItem in rawNews.data.results) {
                    if (Object.hasOwnProperty.call(rawNews.data.results, newsItem)) {
                        const element = rawNews.data.results[newsItem];
                        newsResult.push(new News(element.title, element.url, element.published_at));
                    }
                }
            }
            return newsResult;
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = CryptoPanicWrapper;