/**
 * utils/validators.js
 * ------------------------------------------------------------
 * Validasi input untuk register dan login.
 * ------------------------------------------------------------
 */

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function validateRegisterInput({ name, email, password }) {
    const errors = [];
  
    if (!name || name.trim().length < 3) {
      errors.push('Nama minimal 3 karakter.');
    }
    if (!email || !isValidEmail(email)) {
      errors.push('Format email tidak valid.');
    }
    if (!password || password.length < 6) {
      errors.push('Password minimal 6 karakter.');
    }
  
    return errors;
  }
  
  function validateLoginInput({ email, password }) {
    const errors = [];
  
    if (!email || !isValidEmail(email)) {
      errors.push('Format email tidak valid.');
    }
    if (!password) {
      errors.push('Password wajib diisi.');
    }
  
    return errors;
  }
  
  module.exports = { isValidEmail, validateRegisterInput, validateLoginInput };