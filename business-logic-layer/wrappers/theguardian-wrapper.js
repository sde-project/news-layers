var axios = require('axios');
const News = require('../../models/news');

/**
 * Wrapper for The Guardian Adapter Layer
 */
class TheGuardianWrapper {
    #HOST;

    /**
     * Constructor - get API KEY from environment variables
     */
    constructor() {
        this.#HOST = process.env.ADAPTER_HOST;
    }

    /**
     * Get latest crypto currency news from The Guardian
     * @param {number} numberOfNews Minimum number of news to fetch
     * @returns Latest crypto currency news
     */
    async getLatestCryptoNews(numberOfNews = 1) {
        // Array keeping all the news
        let newsResult = [];

        // Perform request
        const rawNews = await axios.get(`${this.#HOST}/theguardian/latest?number=${numberOfNews}`).catch(e => console.log(e));
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
     * @param {number} numberOfNews Minimum number of news
     * @returns Filtered crypto currency news
     */
    async getSpecificCryptoNews(fromDate, toDate, currency = "all", numberOfNews = 1) {
        // Array keeping all the news
        let newsResult = [];

        // Convert dates to solve the timezone issue
        const offset = fromDate.getTimezoneOffset();
        fromDate = new Date(fromDate.getTime() - (offset * 60 * 1000));
        toDate = new Date(toDate.getTime() - (offset * 60 * 1000));

        // Define date filters according to API specification
        const dateFilters = `from=${fromDate.toISOString()}&to=${toDate.toISOString()}`;

        // Perform request
        const rawNews = await axios.get(`${this.#HOST}/theguardian/search?${dateFilters}&currency=${currency}&number=${numberOfNews}`).catch(e => console.log(e));
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

module.exports = TheGuardianWrapper;