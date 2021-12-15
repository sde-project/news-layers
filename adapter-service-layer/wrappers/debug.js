// API Wrappers
const CryptoCompareWrapper = require('./cryptocompare');
const CryptoPanicWrapper = require('./cryptopanic');
const GNewsWrapper = require('./gnews-wrapper');
const NewYorkTimesWrapper = require('./nytimes-wrapper');
const TheGuardianWrapper = require('./theguardian-wrapper');

// Load environment variables
require('dotenv').config();

/* DEBUG TESTS */

const cryptoPanicWrapper = new CryptoPanicWrapper();
cryptoPanicWrapper.getSpecificCryptoNews("BTC").then(res => console.log(res));
// cryptoPanicWrapper.getLatestCryptoNews().then(res => console.log(res));

const cryptoCompareWrapper = new CryptoCompareWrapper();
cryptoCompareWrapper.getSpecificCryptoNews("BTC").then(res => console.log(res));
// cryptoCompareWrapper.getLatestCryptoNews().then(res => console.log(res));

const newYorkTimesWrapper = new NewYorkTimesWrapper();
newYorkTimesWrapper.getSpecificCryptoNews(new Date('2021-11-01T03:24:00'), new Date('2021-11-30T03:24:00'), "all").then(res => {
    console.log(res);
    console.log(res.length);
});
// newYorkTimesWrapper.getLatestCryptoNews().then(res => console.log(res));

const theGuardianWrapper = new TheGuardianWrapper();
theGuardianWrapper.getSpecificCryptoNews(new Date('2021-11-01T03:24:00'), new Date('2021-11-30T03:24:00'), "all").then(res => {
    console.log(res)
    console.log(res.length);
});
// theGuardianWrapper.getLatestCryptoNews().then(res => console.log(res));

const gnewsWrapper = new GNewsWrapper();
gnewsWrapper.getSpecificCryptoNews(new Date('2021-11-01T03:24:00'), new Date('2021-11-30T03:24:00'), "bitcoin").then(res => {
    console.log(res);
    console.log(res.length);
});
// gnewsWrapper.getLatestCryptoNews().then(res => console.log(res));