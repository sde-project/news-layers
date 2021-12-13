// Initialization
const express = require('express');
const newsLayer = express();

// Load environment variables
require('dotenv').config();

// Middlewares
newsLayer.use(express.json());

// API endpoints
/* TODO */

// Default 404 handler
/* TODO */

// Centralized Error Handler
/* TODO */