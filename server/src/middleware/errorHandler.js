/**
 * middleware/errorHandler.js
 * ------------------------------------------------------------
 * Middleware terpusat untuk menangani error.
 * ------------------------------------------------------------
 */

function errorHandler(err, req, res, next) {
    console.error('[ERROR]', err.message);
  
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Terjadi kesalahan pada server.',
    });
  }
  
  function notFound(req, res, next) {
    res.status(404).json({
      success: false,
      message: `Route tidak ditemukan: ${req.originalUrl}`,
    });
  }
  
  module.exports = { errorHandler, notFound };