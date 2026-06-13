/**
 * app.js
 * ------------------------------------------------------------
 * Konfigurasi utama aplikasi Express.
 * ------------------------------------------------------------
 */

const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'ZenCore Pilates API is running 🚀',
    timestamp: new Date().toISOString(),
  });
});

// Routes akan ditambahkan di sini pada step berikutnya

app.use(notFound);
app.use(errorHandler);

module.exports = app;