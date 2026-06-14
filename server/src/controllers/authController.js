/**
 * controllers/authController.js
 * ------------------------------------------------------------
 * Logika autentikasi: register, login, dan ambil profil sendiri.
 * ------------------------------------------------------------
 */

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/token');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');

const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * Body: { name, email, password, phone }
 */
async function register(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;

    const errors = validateRegisterInput({ name, email, password });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar. Silakan gunakan email lain.',
      });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const userId = await User.create({ name, email, password_hash, phone });

    const token = generateToken({ id: userId, role: 'member' });

    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil.',
      data: {
        user: { id: userId, name, email, role: 'member' },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const errors = validateLoginInput({ email, password });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(' ') });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    const token = generateToken({ id: user.id, role: user.role });

    return res.json({
      success: true,
      message: 'Login berhasil.',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };