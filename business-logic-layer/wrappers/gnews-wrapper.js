var axios = require('axios');
const News = require('../../models/news');

/**
 * Wrapper for GNews Adapter Layer
 */
class GNewsWrapper {
    #HOST;

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#HOST = process.env.ADAPTER_HOST;
    }

    /**
     * Get latest crypto currency news from GNews
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews() {
        // Array keeping all the news
        let newsResult = [];

        // Perform request
        const rawNews = await axios.get(`${this.#HOST}/gnews/latest`).catch(e => console.log(e));
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
     * @param {Date} fromDate Search news from the specified date
     * @param {Date} toDate Search news to the specified date
     * @param {string} currency Chosen currency - default is "all"
     * @returns Filtered crypto currency news
     */
    async getSpecificCryptoNews(fromDate, toDate, currency = "all") {
        // Array keeping all the news
        let newsResult = [];

        // Convert dates to solve the timezone issue
        const offset = fromDate.getTimezoneOffset();
        fromDate = new Date(fromDate.getTime() - (offset * 60 * 1000));
        toDate = new Date(toDate.getTime() - (offset * 60 * 1000));

        // Define date filters according to API specification
        const dateFilters = `from=${fromDate.toISOString()}&to=${toDate.toISOString()}`;

        // Perform request
        const rawNews = await axios.get(`${this.#HOST}/gnews/search?${dateFilters}&currency=${currency}`).catch(e => console.log(e));
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

module.exports = GNewsWrapper;