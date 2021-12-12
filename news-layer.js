// Initialization
const express = require('express');
const newsLayer = express();

// API Wrappers
const CryptoCompareWrapper = require('./adapter-service-layer/cryptocompare');
const CryptoPanicWrapper = require('./adapter-service-layer/cryptopanic');
const GNewsWrapper = require('./adapter-service-layer/gnews');
const NewYorkTimesWrapper = require('./adapter-service-layer/nytimes');
const TheGuardianWrapper = require('./adapter-service-layer/theguardian');

// Load environment variables
require('dotenv').config();

// Middlewares
newsLayer.use(express.json());

/* DEBUG TESTS */
// const cryptoPanicWrapper = new CryptoPanicWrapper();
// cryptoPanicWrapper.getLatestCryptoNews(["BTC"]).then(news => console.log(news));
// cryptoPanicWrapper.getSpecificCryptoNews("BTC").then(res => console.log(res));

// const newYorkTimesWrapper = new NewYorkTimesWrapper();
// newYorkTimesWrapper.getLatestCryptoNews().then(res => console.log(res));
// newYorkTimesWrapper.getSpecificCryptoNews(new Date('2020-01-17T03:24:00'), new Date('2021-01-30T03:24:00'), "bitcoin").then(res => console.log(res));

// const theGuardianWrapper = new TheGuardianWrapper();
// theGuardianWrapper.getLatestCryptoNews().then(res => console.log(res));
// theGuardianWrapper.getSpecificCryptoNews(new Date('2020-01-17T03:24:00'), new Date('2021-01-30T03:24:00')).then(res => console.log(res));

// const cryptoCompareWrapper = new CryptoCompareWrapper();
// cryptoCompareWrapper.getLatestCryptoNews().then(res => console.log(res));
// cryptoCompareWrapper.getSpecificCryptoNews("BTC").then(res => console.log(res));

// const gnewsWrapper = new GNewsWrapper();
// gnewsWrapper.getLatestCryptoNews().then(res => console.log(res));
// gnewsWrapper.getSpecificCryptoNews(new Date('2020-01-17T03:24:00'), new Date('2021-01-30T03:24:00'), "bitcoin").then(res => console.log(res));

// API endpoints
/* TODO */

// Default 404 handler
/* TODO */

// Centralized Error Handler
/* TODO */