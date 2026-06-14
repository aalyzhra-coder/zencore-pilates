/**
 * js/auth.js
 * ------------------------------------------------------------
 * Menangani logika form register & login:
 *  - Submit data ke backend via fetch
 *  - Simpan token & data user ke localStorage jika berhasil
 *  - Tampilkan pesan error/sukses
 * ------------------------------------------------------------
 */

// ----------------- REGISTER -----------------
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const messageEl = document.getElementById('message');
    messageEl.textContent = '';
    messageEl.className = 'message';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const result = await response.json();

      if (!result.success) {
        messageEl.textContent = result.message;
        messageEl.classList.add('error');
        return;
      }

      // Simpan token & data user
      localStorage.setItem('zencore_token', result.data.token);
      localStorage.setItem('zencore_user', JSON.stringify(result.data.user));

      messageEl.textContent = 'Registrasi berhasil! Mengalihkan...';
      messageEl.classList.add('success');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } catch (error) {
      messageEl.textContent = 'Terjadi kesalahan. Pastikan server berjalan.';
      messageEl.classList.add('error');
      console.error(error);
    }
  });
}

// ----------------- LOGIN -----------------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const messageEl = document.getElementById('message');
    messageEl.textContent = '';
    messageEl.className = 'message';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!result.success) {
        messageEl.textContent = result.message;
        messageEl.classList.add('error');
        return;
      }

      localStorage.setItem('zencore_token', result.data.token);
      localStorage.setItem('zencore_user', JSON.stringify(result.data.user));

      messageEl.textContent = 'Login berhasil! Mengalihkan...';
      messageEl.classList.add('success');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } catch (error) {
      messageEl.textContent = 'Terjadi kesalahan. Pastikan server berjalan.';
      messageEl.classList.add('error');
      console.error(error);
    }
  });
}