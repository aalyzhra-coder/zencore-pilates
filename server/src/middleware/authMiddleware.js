/**
 * middleware/authMiddleware.js
 * ------------------------------------------------------------
 * Middleware untuk memverifikasi token JWT.
 * Jika valid, data user (id, role) disimpan di req.user.
 * ------------------------------------------------------------
 */

const { verifyToken } = require('../utils/token');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak ditemukan. Silakan login.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau sudah expired.',
    });
  }
}

module.exports = authMiddleware;