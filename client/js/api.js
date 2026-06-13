const API_BASE_URL = 'http://localhost:5000/api';

// Tes koneksi ke backend
fetch(`${API_BASE_URL}/health`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('status').textContent =
      'Server status: ' + data.message;
  })
  .catch(err => {
    document.getElementById('status').textContent =
      'Gagal terhubung ke server.';
    console.error(err);
  });