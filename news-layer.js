// Initialization
const express = require('express');
const CryptoCompareWrapper = require('./adapter-service-layer/cryptocompare');
const CryptoPanicWrapper = require('./adapter-service-layer/cryptopanic');
const NewYorkTimesWrapper = require('./adapter-service-layer/nytimes');
const TheGuardianWrapper = require('./adapter-service-layer/theguardian');
const newsLayer = express();

// Load environment variables
require('dotenv').config();

// Middlewares
newsLayer.use(express.json());

/* DEBUG TESTS */
// const cryptoPanicWrapper = new CryptoPanicWrapper();
// cryptoPanicWrapper.getLatestCryptoNews(["BTC"]).then(news => console.log(news));

// const newYorkTimesWrapper = new NewYorkTimesWrapper();
// newYorkTimesWrapper.getLatestCryptoNews().then(res => console.log(res));

// const theGuardianWrapper = new TheGuardianWrapper();
// theGuardianWrapper.getLatestCryptoNews().then(res => console.log(res));

// const cryptoCompareWrapper = new CryptoCompareWrapper();
// cryptoCompareWrapper.getLatestCryptoNews().then(res => console.log(res));

// API endpoints
/* TODO */

// Default 404 handler
/* TODO */

// Centralized Error Handler
/* TODO */