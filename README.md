<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Budget & Expenses</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
  <style>
    /* CSS lengkap dari script kedua, tidak diubah */
    body { font-family: 'Montserrat', Arial, sans-serif; margin: 0; background: #f8fafc; color: #222;}
    header { background: #2155cd; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0.7rem 2rem; position: sticky; top: 0; z-index: 10;}
    .logo { font-weight: bold; font-size: 1.5rem; letter-spacing: 2px; display: flex; align-items: center; gap: 8px;}
    nav { display: flex; gap: 1.5rem; align-items: center;}
    nav a { color: #fff; text-decoration: none; font-weight: 500; transition: color 0.2s;}
    nav a:hover { color: #ffd700;}
    .header-right { display: flex; align-items: center; gap: 1rem;}
    .btn { background: #ffd700; color: #2155cd; border: none; padding: 0.5rem 1.2rem; border-radius: 20px; font-weight: bold; cursor: pointer; transition: background 0.2s;}
    .btn:hover { background: #fff; color: #2155cd;}
    .social-icons a { color: #fff; margin-left: 8px; font-size: 1.2rem; text-decoration: none;}
    .search-bar { display: none; margin-left: 1rem;}
    .search-bar input { padding: 0.3rem 0.7rem; border-radius: 12px; border: none;}
    .hero { background: linear-gradient(90deg, #2155cd 70%, #ffd700 100%); color: #fff; padding: 3rem 2rem 2rem 2rem; text-align: center; position: relative;}
    .hero h1 { font-size: 2.5rem; margin-bottom: 0.6rem; font-weight: 700;}
    .hero p { font-size: 1.2rem; margin-bottom: 1.2rem;}
    .hero .btn { font-size: 1.1rem; margin: 0.3rem;}
    .container { display: flex; gap: 2rem; max-width: 1200px; margin: 2rem auto; padding: 0 1rem;}
    .main-content { flex: 3; min-width: 0;}
    .sidebar { flex: 1; background: #fff; border-radius: 16px; box-shadow: 0 2px 8px #0001; padding: 1.2rem; margin-top: 1rem; min-width: 220px; max-width: 300px; height: fit-content;}
    .sidebar h3 { margin-top: 0; font-size: 1.1rem; color: #2155cd; margin-bottom: 0.7rem;}
    .sidebar ul { list-style: none; padding: 0; margin: 0 0 1.2rem 0;}
    .sidebar ul li { margin-bottom: 0.7rem;}
    .sidebar ul li a { color: #2155cd; text-decoration: none; font-weight: 500; transition: color 0.2s;}
    .sidebar ul li a:hover { color: #ffd700;}
    .widget { margin-bottom: 1rem; font-size: 0.98rem;}
    .features { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2rem;}
    .feature-box { background: #fff; padding: 1.2rem; border-radius: 14px; box-shadow: 0 2px 8px #0001; flex: 1 1 220px; min-width: 220px; text-align: center;}
    .feature-box h4 { color: #2155cd; margin-bottom: 0.5rem;}
    .chart-section { background: #fff; border-radius: 16px; box-shadow: 0 2px 8px #0001; padding: 1.5rem; margin-bottom: 2rem;}
    .testimonials { margin-bottom: 2rem;}
    .testimonial-slider { display: flex; gap: 1.5rem; overflow-x: auto; padding-bottom: 1rem;}
    .testimonial-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 8px #0001; padding: 1rem; min-width: 220px; max-width: 250px; text-align: center; flex-shrink: 0;}
    .testimonial-card img { width: 48px; height: 48px; border-radius: 50%; margin-bottom: 0.5rem;}
    .testimonial-card p { font-size: 0.96rem; color: #333;}
    .testimonial-card .name { font-weight: bold; margin-top: 0.5rem; color: #2155cd;}
    .blog-section { margin-bottom: 2rem;}
    .blog-list { display: flex; flex-wrap: wrap; gap: 1.2rem;}
    .blog-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 1rem; flex: 1 1 220px; min-width: 220px; max-width: 300px;}
    .blog-card h5 { margin: 0 0 0.5rem 0; color: #2155cd;}
    .blog-card p { font-size: 0.95rem; color: #333;}
    .form-section { background: #fff; border-radius: 16px; box-shadow: 0 2px 8px #0001; padding: 1.5rem; margin-bottom: 2rem; max-width: 400px;}
    .form-section h3 { margin-top: 0; color: #2155cd;}
    .form-group { margin-bottom: 1rem;}
    .form-group label { display: block; margin-bottom: 0.3rem; font-size: 0.97rem;}
    .form-group input, .form-group textarea { width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;}
    .form-group textarea { resize: vertical;}
    .form-error { color: #d32f2f; font-size: 0.9rem; margin-bottom: 0.5rem;}
    .cta-section { text-align: center; margin: 2rem 0;}
    .cta-section .btn { font-size: 1.15rem; padding: 0.7rem 2rem; margin-top: 0.5rem;}
    footer { background: #2155cd; color: #fff; padding: 2rem 2rem 1rem 2rem; text-align: center; margin-top: 2rem;}
    .footer-links { margin-bottom: 1rem;}
    .footer-links a { color: #ffd700; margin: 0 1rem; text-decoration: none; font-weight: 500;}
    .footer-links a:hover { text-decoration: underline;}
    .footer-social { margin-bottom: 1rem;}
    .footer-social a { color: #fff; margin: 0 0.5rem; font-size: 1.3rem; text-decoration: none;}
    .newsletter-signup input[type="email"] { padding: 0.4rem 0.8rem; border-radius: 12px; border: none; margin-right: 0.3rem; font-size: 1rem;}
    #cookieConsent { position: fixed; bottom: 0; left: 0; width: 100%; background: #333; color: #fff; text-align: center; padding: 1rem 0.5rem; z-index: 1000; display: none;}
    #cookieConsent button { background: #ffd700; color: #2155cd; border: none; border-radius: 10px; padding: 0.4rem 1.2rem; margin-left: 1rem; cursor: pointer; font-weight: bold;}
    #filemanager-section { margin-bottom:2rem;}
    #fileManagerTree ul { list-style:none; padding-left:1.2em;}
    #fileManagerTree li { margin-bottom:0.2em;}
    #fileManagerTree span { cursor:pointer;}
    .modal-excel-preview { position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;z-index:3000; display:flex;align-items:center;justify-content:center;}
    .modal-excel-preview-content { background:#fff;max-width:90vw;max-height:90vh;overflow:auto;padding:2rem 1.5rem;border-radius:16px;position:relative;}
    .modal-excel-preview-content h3 { color:#2155cd; }
    .modal-excel-preview-content button { position:absolute;top:10px;right:10px;background:none;border:none;font-size:1.4rem;cursor:pointer;}
    .folder-section { background: #fff; border-radius: 16px; box-shadow: 0 2px 8px #0001; margin-bottom: 2rem; max-width: 500px; overflow: hidden;}
    .folder-header { display: flex; align-items: center; cursor: pointer; background: #2155cd; color: #fff; padding: 1rem 1.5rem; font-weight: bold; font-size: 1.15rem; border: none; outline: none; user-select: none; transition: background 0.2s;}
    .folder-header:hover { background: #163c94;}
    .folder-content { padding: 1.5rem; display: none; animation: fadeIn 0.3s;}
    .folder-section.open .folder-content { display: block;}
    .folder-arrow { margin-right: 1rem; font-size: 1.2rem; transition: transform 0.2s;}
    .folder-section.open .folder-arrow { transform: rotate(90deg);}
    @keyframes fadeIn { from { opacity: 0; } to   { opacity: 1; }}
    @media (max-width: 900px) { .container { flex-direction: column;} .sidebar { margin-top: 0; margin-bottom: 1.5rem; max-width: 100%;}}
    @media (max-width: 700px) { .features, .blog-list, .testimonial-slider { flex-direction: column;} .main-content, .sidebar { min-width: 0; max-width: 100%;} header { flex-direction: column; align-items: flex-start; padding: 1rem;} nav { flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;} .header-right { margin-top: 0.5rem;} .search-bar { display: block; margin-top: 0.5rem;}}
  </style>
</head>
<body>
  <div class="widget">
    <div id="digitalClock" style="font-size:1.3rem;font-weight:bold;"></div>
  </div>
  <header>
    <div class="logo">
      <span>💰</span> Budget<span style="color:#ffd700;">&</span>Expenses
    </div>
    <nav>
      <a href="#">Beranda</a>
      <a href="#features">Fitur</a>
      <a href="#chart">Statistik</a>
      <a href="#filemanager-section">File Manager</a>
      <a href="#blog">Blog</a>
      <a href="#contact">Kontak</a>
    </nav>
    <div class="header-right">
      <button class="btn" onclick="showLoginForm()">Login / Signup</button>
      <div class="social-icons">
        <a href="#" title="Facebook">🌐</a>
        <a href="#" title="Instagram">📸</a>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Cari...">
      </div>
    </div>
  </header>
  <section class="hero">
    <h1>Kelola Budget & Expenses Anda dengan Mudah</h1>
    <p>Pantau pemasukan dan pengeluaran, capai tujuan finansial Anda.</p>
    <button class="btn" onclick="showSignupForm()">Mulai Sekarang</button>
    <button class="btn" style="background:#fff;color:#2155cd;" onclick="window.location='#features'">Pelajari Lebih Lanjut</button>
  </section>

  <!-- Folder Section untuk Form Input & Tabel Data -->
  <section class="folder-section" id="budgetFolder">
    <div class="folder-header" onclick="toggleFolder('budgetFolder')">
      <span class="folder-arrow">&#9654;</span>
      Data Budget & Pengeluaran
    </div>
    <div class="folder-content">
      <section class="form-section" id="dataInputSection" style="margin-bottom:0;">
        <h3>Input Data Budget/Pengeluaran</h3>
        <form id="dataForm" onsubmit="return addDataRow(event)">
          <div class="form-group">
            <label for="tanggal">Tanggal</label>
            <input type="date" id="tanggal" required>
          </div>
          <div class="form-group">
            <label for="kategori">Kategori</label>
            <input type="text" id="kategori" required placeholder="Contoh: Makan, Transport">
          </div>
          <div class="form-group">
            <label for="tipe">Tipe</label>
            <select id="tipe" required>
              <option value="Budget">Budget</option>
              <option value="Pengeluaran">Pengeluaran</option>
            </select>
          </div>
          <div class="form-group">
            <label for="jumlah">Jumlah (Rp)</label>
            <input type="number" id="jumlah" required min="1" placeholder="Contoh: 50000">
          </div>
          <button class="btn" type="submit">Tambah Data</button>
        </form>
      </section>
      <section class="form-section" id="dataTableSection" style="margin-top:1.5rem;">
        <h3>Data Budget & Pengeluaran</h3>
        <table id="dataTable" style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#2155cd;color:#fff;">
              <th style="padding:8px;">Tanggal</th>
              <th style="padding:8px;">Kategori</th>
              <th style="padding:8px;">Tipe</th>
              <th style="padding:8px;">Jumlah (Rp)</th>
            </tr>
          </thead>
          <tbody>
            <!-- Data rows will appear here -->
          </tbody>
        </table>
        <!-- Grafik di bawah tabel -->
        <div class="form-section" style="margin-top:1.5rem;">
          <h3>Visualisasi Data Budget & Pengeluaran</h3>
          <canvas id="inputDataChart" height="120"></canvas>
        </div>
      </section>
    </div>
  </section>

  <!-- File Manager Section -->
  <section id="filemanager-section" style="background:#fff;border-radius:16px;box-shadow:0 2px 8px #0001;padding:1.5rem;margin:2rem 0;">
    <h3 style="color:#2155cd;">File Manager</h3>
    <div style="margin-bottom:1rem;">
      <button class="btn" onclick="createFolder()">Buat Folder</button>
      <label class="btn" style="margin-left:1rem;cursor:pointer;">
        Upload File
        <input type="file" id="fileInput" multiple style="display:none" onchange="uploadFiles(event)">
      </label>
      <label class="btn" style="margin-left:1rem;cursor:pointer;">
        Upload Folder
        <input type="file" id="folderInput" webkitdirectory directory multiple style="display:none" onchange="uploadFolder(event)">
      </label>
    </div>
    <div id="fileManagerTree" style="font-size:1rem;"></div>
  </section>

  <div class="container">
    <div class="main-content">
      <section id="features" class="features">
        <div class="feature-box">
          <h4>Input & Tracking</h4>
          <p>Catat pemasukan dan pengeluaran harian secara mudah dan cepat.</p>
        </div>
        <div class="feature-box">
          <h4>Kategori Custom</h4>
          <p>Buat kategori sesuai kebutuhan Anda, misal: Makan, Transportasi, Hiburan.</p>
        </div>
        <div class="feature-box">
          <h4>Laporan Otomatis</h4>
          <p>Dapatkan ringkasan keuangan bulanan dan tahunan secara otomatis.</p>
        </div>
        <div class="feature-box">
          <h4>Grafik Interaktif</h4>
          <p>Visualisasi budget & expenses dengan grafik bar, pie, dan line chart.</p>
        </div>
      </section>
      <section id="chart" class="chart-section">
        <h3 style="color:#2155cd;">Perbandingan Budget & Pengeluaran Bulanan</h3>
        <canvas id="budgetExpensesChart" height="120"></canvas>
      </section>
      <section class="testimonials">
        <h3 style="color:#2155cd;">Apa Kata Pengguna?</h3>
        <div class="testimonial-slider">
          <div class="testimonial-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
            <p>"Semenjak pakai Budget&Expenses, keuangan pribadi saya jadi lebih terkontrol!"</p>
            <div class="name">Rizky, Freelancer</div>
          </div>
          <div class="testimonial-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User">
            <p>"Grafiknya sangat membantu untuk melihat pengeluaran terbesar setiap bulan."</p>
            <div class="name">Nadia, Mahasiswi</div>
          </div>
          <div class="testimonial-card">
            <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="User">
            <p>"Fitur kategorinya fleksibel, cocok untuk keluarga maupun bisnis kecil."</p>
            <div class="name">Budi, Wirausaha</div>
          </div>
        </div>
      </section>
      <section id="blog" class="blog-section">
        <h3 style="color:#2155cd;">Tips & Artikel Keuangan</h3>
        <div class="blog-list">
          <div class="blog-card">
            <h5>5 Cara Efektif Mengatur Pengeluaran Bulanan</h5>
            <p>Pelajari strategi sederhana agar pengeluaran tidak melebihi budget.</p>
          </div>
          <div class="blog-card">
            <h5>Kenali Kategori Pengeluaran Terbesar Anda</h5>
            <p>Analisa data dan temukan pos pengeluaran yang bisa dihemat.</p>
          </div>
          <div class="blog-card">
            <h5>Manfaat Visualisasi Keuangan</h5>
            <p>Bagaimana grafik membantu Anda mengambil keputusan finansial.</p>
          </div>
        </div>
      </section>
      <section class="cta-section">
        <h2>Siap Lebih Cerdas Kelola Uang?</h2>
        <button class="btn" onclick="showSignupForm()">Daftar Sekarang</button>
      </section>
      <section id="contact" class="form-section">
        <h3>Hubungi Kami</h3>
        <form id="contactForm" onsubmit="return validateContactForm()">
          <div id="contactError" class="form-error"></div>
          <div class="form-group">
            <label for="contactName">Nama</label>
            <input type="text" id="contactName" required>
          </div>
          <div class="form-group">
            <label for="contactEmail">Email</label>
            <input type="email" id="contactEmail" required>
          </div>
          <div class="form-group">
            <label for="contactMsg">Pesan</label>
            <textarea id="contactMsg" rows="3" required></textarea>
          </div>
          <button class="btn" type="submit">Kirim</button>
        </form>
      </section>
    </div>
    <aside class="sidebar">
      <h3>Menu Tambahan</h3>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Kategori Pengeluaran</a></li>
        <li><a href="#">Laporan</a></li>
        <li><a href="#">Pengaturan</a></li>
      </ul>
      <div class="widget">
        <strong>Saldo Bulan Ini:</strong>
        <div id="saldoSidebar">Rp 1.200.000</div>
      </div>
      <div class="widget">
        <strong>Kalender:</strong>
        <div id="calendarWidget"></div>
      </div>
      <div class="widget">
        <strong>Ikuti Kami:</strong>
        <div>
          <a href="#">🌐</a>
          <a href="#">📸</a>
        </div>
      </div>
    </aside>
  </div>
  <footer>
    <div class="footer-links">
      <a href="#">Tentang Kami</a> |
      <a href="#contact">Kontak</a> |
      <a href="#">Kebijakan Privasi</a>
    </div>
    <div class="footer-social">
      <a href="#">🌐</a>
      <a href="#">📸</a>
    </div>
    <div class="newsletter-signup">
      <form onsubmit="return subscribeNewsletter(event)">
        <input type="email" id="newsletterEmail" placeholder="Email Anda" required>
        <button class="btn" type="submit">Langganan</button>
      </form>
    </div>
    <div style="margin-top:1rem;font-size:0.95rem;">&copy; 2024 Budget & Expenses. All rights reserved.</div>
  </footer>
  <div id="cookieConsent">
    Situs ini menggunakan cookie untuk meningkatkan pengalaman Anda. <button onclick="acceptCookies()">Saya Setuju</button>
  </div>
  <!-- Login/Signup Modal (Sederhana) -->
  <div id="loginModal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;z-index:2000;align-items:center;justify-content:center;">
    <div style="background:#fff;padding:2rem 1.5rem;border-radius:16px;max-width:350px;width:90%;position:relative;">
      <button onclick="closeLoginForm()" style="position:absolute;top:10px;right:10px;background:none;border:none;font-size:1.4rem;cursor:pointer;">&times;</button>
      <h3 style="color:#2155cd;">Login / Signup</h3>
      <form id="loginForm" onsubmit="return validateLoginForm()">
        <div id="loginError" class="form-error"></div>
        <div class="form-group">
          <label for="loginEmail">Email</label>
          <input type="email" id="loginEmail" required>
        </div>
        <div class="form-group">
          <label for="loginPassword">Password</label>
          <input type="password" id="loginPassword" required>
        </div>
        <button class="btn" type="submit">Masuk</button>
      </form>
      <div style="margin-top:1rem;font-size:0.96rem;">Belum punya akun? <a href="#" onclick="showSignupForm();return false;" style="color:#2155cd;">Daftar</a></div>
    </div>
  </div>
  <div id="signupModal" style="display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0008;z-index:2000;align-items:center;justify-content:center;">
    <div style="background:#fff;padding:2rem 1.5rem;border-radius:16px;max-width:350px;width:90%;position:relative;">
      <button onclick="closeSignupForm()" style="position:absolute;top:10px;right:10px;background:none;border:none;font-size:1.4rem;cursor:pointer;">&times;</button>
      <h3 style="color:#2155cd;">Daftar Akun</h3>
      <form id="signupForm" onsubmit="return validateSignupForm()">
        <div id="signupError" class="form-error"></div>
        <div class="form-group">
          <label for="signupName">Nama</label>
          <input type="text" id="signupName" required>
        </div>
        <div class="form-group">
          <label for="signupEmail">Email</label>
          <input type="email" id="signupEmail" required>
        </div>
        <div class="form-group">
          <label for="signupPassword">Password</label>
          <input type="password" id="signupPassword" required>
        </div>
        <div class="form-group">
          <label for="signupPassword2">Konfirmasi Password</label>
          <input type="password" id="signupPassword2" required>
        </div>
        <button class="btn" type="submit">Daftar</button>
      </form>
      <div style="margin-top:1rem;font-size:0.96rem;">Sudah punya akun? <a href="#" onclick="showLoginForm();return false;" style="color:#2155cd;">Login</a></div>
    </div>
  </div>
  <script>
    // Folder/collapsible logic
    function toggleFolder(id) {
      var section = document.getElementById(id);
      section.classList.toggle('open');
    }
    // Digital Clock
    function updateDigitalClock() {
      const now = new Date();
      let h = now.getHours().toString().padStart(2, '0');
      let m = now.getMinutes().toString().padStart(2, '0');
      let s = now.getSeconds().toString().padStart(2, '0');
      document.getElementById('digitalClock').textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateDigitalClock, 1000);
    updateDigitalClock();

    // ========== BUDGET DATA LOCAL STORAGE & CHART ==========
    let budgetData = localStorage.getItem('budgetData')
      ? JSON.parse(localStorage.getItem('budgetData'))
      : [];
    let inputDataChart;

    function getMonthlySummary() {
      let summary = {};
      budgetData.forEach(item => {
        let month = item.tanggal.slice(0, 7);
        if (!summary[month]) summary[month] = { Budget: 0, Pengeluaran: 0 };
        summary[month][item.tipe] += parseInt(item.jumlah);
      });
      let months = Object.keys(summary).sort();
      let budgets = months.map(m => summary[m].Budget);
      let pengeluaran = months.map(m => summary[m].Pengeluaran);
      return { months, budgets, pengeluaran };
    }

    function renderInputDataChart() {
      let { months, budgets, pengeluaran } = getMonthlySummary();
      let ctx = document.getElementById('inputDataChart').getContext('2d');
      if (inputDataChart) inputDataChart.destroy();
      inputDataChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Budget',
              data: budgets,
              backgroundColor: 'rgba(54, 162, 235, 0.7)'
            },
            {
              label: 'Pengeluaran',
              data: pengeluaran,
              backgroundColor: 'rgba(255, 99, 132, 0.7)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return 'Rp ' + value.toLocaleString('id-ID');
                }
              }
            }
          }
        }
      });
    }

    function renderDataTable() {
      const tbody = document.getElementById('dataTable').querySelector('tbody');
      tbody.innerHTML = '';
      budgetData.forEach(function(item) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td style="padding:8px;border-bottom:1px solid #eee;">${item.tanggal}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${item.kategori}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${item.tipe}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">Rp ${parseInt(item.jumlah).toLocaleString('id-ID')}</td>
        `;
        tbody.appendChild(row);
      });
      renderInputDataChart();
    }

    function addDataRow(event) {
      event.preventDefault();
      const tanggal = document.getElementById('tanggal').value;
      const kategori = document.getElementById('kategori').value.trim();
      const tipe = document.getElementById('tipe').value;
      const jumlah = document.getElementById('jumlah').value;
      if (!tanggal || !kategori || !tipe || !jumlah) return false;
      budgetData.push({ tanggal, kategori, tipe, jumlah });
      localStorage.setItem('budgetData', JSON.stringify(budgetData));
      renderDataTable();
      document.getElementById('dataForm').reset();
      return false;
    }
    // ========== END BUDGET DATA LOCAL STORAGE & CHART ==========

    // Chart.js Budget vs Expenses (dummy data untuk chart utama)
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('budgetFolder').classList.add('open');
      renderDataTable();
      renderCalendar();
    });
    const ctx = document.getElementById('budgetExpensesChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Januari', 'Februari', 'Maret', 'April'],
        datasets: [
          {
            label: 'Budget',
            data: [4000000, 4200000, 4100000, 4300000],
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          },
          {
            label: 'Expenses',
            data: [3800000, 4500000, 4000000, 4200000],
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'Rp ' + value.toLocaleString('id-ID');
              }
            }
          }
        }
      }
    });

    // Sidebar: Kalender Widget Sederhana
    function renderCalendar() {
      const now = new Date();
      const month = now.toLocaleString('id-ID', { month: 'long' });
      const year = now.getFullYear();
      document.getElementById('calendarWidget').innerHTML = `<span style="font-weight:bold;">${month}</span> ${year}`;
    }

    // Cookie Consent
    function acceptCookies() {
      document.getElementById('cookieConsent').style.display = 'none';
      localStorage.setItem('cookieConsent', 'true');
    }
    window.onload = function() {
      if (!localStorage.getItem('cookieConsent')) {
        document.getElementById('cookieConsent').style.display = 'block';
      }
      renderFileManager();
    };

    // Login/Signup Modal
    function showLoginForm() {
      document.getElementById('loginModal').style.display = 'flex';
      document.getElementById('signupModal').style.display = 'none';
    }
    function closeLoginForm() {
      document.getElementById('loginModal').style.display = 'none';
    }
    function showSignupForm() {
      document.getElementById('signupModal').style.display = 'flex';
      document.getElementById('loginModal').style.display = 'none';
    }
    function closeSignupForm() {
      document.getElementById('signupModal').style.display = 'none';
    }
    // Validasi Login
    function validateLoginForm() {
      let email = document.getElementById('loginEmail').value.trim();
      let pass = document.getElementById('loginPassword').value;
      let error = '';
      if (!email || !pass) error = 'Semua field wajib diisi!';
      else if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) error = 'Email tidak valid!';
      if (error) {
        document.getElementById('loginError').textContent = error;
        return false;
      }
      document.getElementById('loginError').textContent = '';
      alert('Login berhasil (simulasi)');
      closeLoginForm();
      return false;
    }
    // Validasi Signup
    function validateSignupForm() {
      let nama = document.getElementById('signupName').value.trim();
      let email = document.getElementById('signupEmail').value.trim();
      let pass = document.getElementById('signupPassword').value;
      let pass2 = document.getElementById('signupPassword2').value;
      let error = '';
      if (!nama || !email || !pass || !pass2) error = 'Semua field wajib diisi!';
      else if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) error = 'Email tidak valid!';
      else if (pass.length < 6) error = 'Password minimal 6 karakter!';
      else if (pass !== pass2) error = 'Konfirmasi password tidak sama!';
      if (error) {
        document.getElementById('signupError').textContent = error;
        return false;
      }
      document.getElementById('signupError').textContent = '';
      alert('Pendaftaran berhasil (simulasi)');
      closeSignupForm();
      return false;
    }
    // Validasi Form Kontak
    function validateContactForm() {
      let nama = document.getElementById('contactName').value.trim();
      let email = document.getElementById('contactEmail').value.trim();
      let msg = document.getElementById('contactMsg').value.trim();
      let error = '';
      if (!nama || !email || !msg) error = 'Semua field wajib diisi!';
      else if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) error = 'Email tidak valid!';
      if (error) {
        document.getElementById('contactError').textContent = error;
        return false;
      }
      document.getElementById('contactError').textContent = '';
      alert('Pesan Anda terkirim! (simulasi)');
      document.getElementById('contactForm').reset();
      return false;
    }
    // Newsletter
    function subscribeNewsletter(e) {
      e.preventDefault();
      let email = document.getElementById('newsletterEmail').value.trim();
      if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        alert('Email tidak valid!');
        return false;
      }
      alert('Terima kasih telah berlangganan!');
      document.getElementById('newsletterEmail').value = '';
      return false;
    }

    // ========================== FILE MANAGER SCRIPT ==========================
    let fileSystem;
    if (localStorage.getItem('fileSystem')) {
      fileSystem = JSON.parse(localStorage.getItem('fileSystem'));
    } else {
      fileSystem = [
        { name: 'Root', isDirectory: true, items: [] }
      ];
    }
    let currentPath = ['Root'];
    function saveFileSystem() {
      function stripFileObj(node) {
        if (Array.isArray(node)) {
          node.forEach(stripFileObj);
        } else if (node && typeof node === 'object') {
          delete node.fileObj;
          if (node.items) stripFileObj(node.items);
        }
      }
      let temp = JSON.parse(JSON.stringify(fileSystem));
      stripFileObj(temp);
      localStorage.setItem('fileSystem', JSON.stringify(temp));
    }
    function renderFileManager() {
      const tree = document.getElementById('fileManagerTree');
      let node = fileSystem[0];
      for (let i = 1; i < currentPath.length; i++) {
        node = node.items.find(item => item.isDirectory && item.name === currentPath[i]);
        if (!node) break;
      }
      tree.innerHTML = `
        <div style="margin-bottom:0.5rem;">
          <b>Path:</b> ${currentPath.join(' / ')}
          ${currentPath.length > 1 ? `<button class="btn" style="margin-left:1rem;padding:0.2rem 0.8rem;" onclick="goUp()">⬆️ Naik</button>` : ''}
        </div>
        <form onsubmit="event.preventDefault();filterFolder();" style="margin-bottom:1rem;">
          <input type="search" id="folderSearch" placeholder="Cari di folder ini..." style="padding:0.3rem 0.7rem;border-radius:8px;border:1px solid #ccc;width:220px;">
          <button type="button" class="btn" onclick="filterFolder()">Cari</button>
          <button type="button" class="btn" style="background:#eee;color:#2155cd;" onclick="resetFolderSearch()">Reset</button>
        </form>
        <ul id="folderList" style="list-style:none;padding-left:0;"></ul>
      `;
      renderFolderList(node);
    }
    function renderFolderList(node, filterText = '') {
      const ul = document.getElementById('folderList');
      if (!ul) return;
      let items = node.items || [];
      if (filterText) {
        const q = filterText.toLowerCase();
        items = items.filter(item => item.name.toLowerCase().includes(q));
      }
      ul.innerHTML = items.map((item, idx) =>
        item.isDirectory
          ? `<li><span style="color:#2155cd;cursor:pointer;" onclick="openFolder('${item.name}')">📁 ${item.name}</span></li>`
          : item.name.match(/\.(xlsx|xls|csv)$/i)
            ? `<li><span style="color:#2b9348;cursor:pointer;text-decoration:underline;" onclick="openExcelFile(${idx})">📄 ${item.name}</span> <span style="color:#888;font-size:0.9em;">(${item.size ? item.size + ' bytes' : ''})</span></li>`
            : `<li>📄 ${item.name} <span style="color:#888;font-size:0.9em;">(${item.size ? item.size + ' bytes' : ''})</span></li>`
      ).join('');
    }
    function filterFolder() {
      let q = document.getElementById('folderSearch').value.trim().toLowerCase();
      let node = fileSystem[0];
      for (let i = 1; i < currentPath.length; i++) {
        node = node.items.find(item => item.isDirectory && item.name === currentPath[i]);
        if (!node) return;
      }
      renderFolderList(node, q);
    }
    function resetFolderSearch() {
      document.getElementById('folderSearch').value = '';
      filterFolder();
    }
    document.addEventListener('input', function(e){
      if(e.target && e.target.id === 'folderSearch'){
        filterFolder();
      }
    });
    function goUp() {
      if (currentPath.length > 1) {
        currentPath.pop();
        renderFileManager();
      }
    }
    function openFolder(name) {
      let node = fileSystem[0];
      for (let i = 1; i < currentPath.length; i++) {
        node = node.items.find(item => item.isDirectory && item.name === currentPath[i]);
        if (!node) return;
      }
      let next = node.items.find(item => item.isDirectory && item.name === name);
      if (next) {
        currentPath.push(name);
        renderFileManager();
      } else {
        alert("Folder tidak ditemukan!");
      }
    }
    function createFolder() {
      let folderName = prompt('Nama folder baru:');
      if (!folderName) return;
      let node = fileSystem[0];
      for (let i = 1; i < currentPath.length; i++) {
        node = node.items.find(item => item.isDirectory && item.name === currentPath[i]);
        if (!node) return;
      }
      if (node.items.some(item => item.isDirectory && item.name === folderName)) {
        alert('Folder sudah ada!');
        return;
      }
      node.items.push({ name: folderName, isDirectory: true, items: [] });
      saveFileSystem();
      renderFileManager();
    }
    function uploadFiles(event) {
      let files = event.target.files;
      let node = fileSystem[0];
      for (let i = 1; i < currentPath.length; i++) {
        node = node.items.find(item => item.isDirectory && item.name === currentPath[i]);
        if (!node) return;
      }
      for (let file of files) {
        node.items.push({ name: file.name, isDirectory: false, size: file.size, type: file.type, fileObj: file });
      }
      saveFileSystem();
      renderFileManager();
      event.target.value = '';
    }
    function uploadFolder(event) {
      let files = event.target.files;
      let node = fileSystem[0];
      for (let file of files) {
        let relPath = file.webkitRelativePath || file.relativePath || file.name;
        let parts = relPath.split('/');
        let curr = node;
        for (let i = 1; i < parts.length - 1; i++) {
          let folder = curr.items.find(item => item.isDirectory && item.name === parts[i]);
          if (!folder) {
            folder = { name: parts[i], isDirectory: true, items: [] };
            curr.items.push(folder);
          }
          curr = folder;
        }
        if (parts[parts.length - 1]) {
          curr.items.push({ name: parts[parts.length - 1], isDirectory: false, size: file.size, type: file.type, fileObj: file });
        }
      }
      saveFileSystem();
      renderFileManager();
      event.target.value = '';
    }
    function openExcelFile(idx) {
      let node = fileSystem[0];
      for (let i = 1; i < currentPath.length; i++) {
        node = node.items.find(item => item.isDirectory && item.name === currentPath[i]);
        if (!node) return;
      }
      let fileItem = node.items[idx];
      if (!fileItem || !fileItem.fileObj) {
        alert('File tidak ditemukan di memori!\nSilakan upload ulang file untuk preview.');
        return;
      }
      let reader = new FileReader();
      reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});
        let html = '';
        workbook.SheetNames.forEach(function(sheetName) {
          let sheet = workbook.Sheets[sheetName];
          html += `<h4>${sheetName}</h4>`;
          html += XLSX.utils.sheet_to_html(sheet);
        });
        showModal('Preview Excel', html);
      };
      reader.readAsArrayBuffer(fileItem.fileObj);
    }
    function showModal(title, content) {
      let modal = document.createElement('div');
      modal.className = 'modal-excel-preview';
      modal.innerHTML = `
        <div class="modal-excel-preview-content">
          <button onclick="this.parentNode.parentNode.remove()">&times;</button>
          <h3>${title}</h3>
          <div>${content}</div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    // ======================== END FILE MANAGER SCRIPT ========================
  </script>
</body>
</html>






