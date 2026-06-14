/**
 * models/User.js
 * ------------------------------------------------------------
 * Model untuk tabel `users`.
 * Berisi semua query database terkait user.
 * ------------------------------------------------------------
 */

const { pool } = require('../config/db');

const User = {
  /**
   * Membuat user baru.
   */
  async create({ name, email, password_hash, phone = null }) {
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password_hash, phone)
       VALUES (?, ?, ?, ?)`,
      [name, email, password_hash, phone]
    );
    return result.insertId;
  },

  /**
   * Mencari user berdasarkan email (untuk login & cek duplikat).
   */
  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email]
    );
    return rows[0] || null;
  },

  /**
   * Mencari user berdasarkan ID (tanpa password).
   */
  async findById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, email, role, phone, created_at
       FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = User;