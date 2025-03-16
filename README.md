<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Inventory</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .table-responsive {
            max-height: 500px;
            overflow-y: auto;
        }
        .search-bar {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container mt-4">
        <h1 class="text-center">Data Inventory</h1>

        <!-- Pencarian -->
        <div class="search-bar">
            <input type="text" id="searchInput" class="form-control" placeholder="Cari data...">
        </div>

        <!-- Form Upload Excel -->
        <div class="mb-3">
            <label for="uploadExcel" class="form-label">Unggah File Excel:</label>
            <input type="file" id="uploadExcel" class="form-control" accept=".xlsx, .xls">
        </div>

        <!-- Tabel Data -->
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead class="table-dark">
                    <tr id="tableHeader">
                        <!-- Header kolom akan diisi secara dinamis -->
                    </tr>
                </thead>
                <tbody id="dataTable">
                    <!-- Data akan dimasukkan di sini -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- Script -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const searchInput = document.getElementById('searchInput');
        const dataTable = document.getElementById('dataTable');
        const tableHeader = document.getElementById('tableHeader');

        // Fungsi untuk membaca file Excel
        document.getElementById('uploadExcel').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

                renderTable(sheetData);
                saveToLocalStorage(sheetData); // Simpan ke localStorage
            };

            reader.readAsArrayBuffer(file);
        });

        // Fungsi untuk menampilkan tabel berdasarkan data Excel
        function renderTable(sheetData) {
            // Kosongkan tabel sebelumnya
            tableHeader.innerHTML = '';
            dataTable.innerHTML = '';

            // Tambahkan header tabel
            sheetData[0].forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                tableHeader.appendChild(th);
            });

            // Tambahkan kolom aksi (Edit dan Hapus)
            const actionHeader = document.createElement('th');
            actionHeader.textContent = 'Aksi';
            tableHeader.appendChild(actionHeader);

            // Tambahkan data ke tabel
            sheetData.slice(1).forEach((row, index) => {
                const tr = document.createElement('tr');
                row.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell || '';
                    tr.appendChild(td);
                });

                // Tambahkan tombol aksi
                const actionTd = document.createElement('td');
                actionTd.innerHTML = `
                    <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Hapus</button>
                `;
                tr.appendChild(actionTd);

                dataTable.appendChild(tr);
            });

            addActionListeners(sheetData);
        }

        // Fungsi untuk menambahkan event listener pada tombol Edit dan Hapus
        function addActionListeners(sheetData) {
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    sheetData.splice(parseInt(index) + 1, 1); // Hapus baris dari data
                    renderTable(sheetData); // Render ulang tabel
                    saveToLocalStorage(sheetData); // Simpan perubahan ke localStorage
                });
            });

            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    const rowData = sheetData[parseInt(index) + 1];
                    const editedRow = prompt(`Edit baris (pisahkan dengan koma):`, rowData.join(','));
                    if (editedRow) {
                        sheetData[parseInt(index) + 1] = editedRow.split(',');
                        renderTable(sheetData); // Render ulang tabel
                        saveToLocalStorage(sheetData); // Simpan perubahan ke localStorage
                    }
                });
            });
        }

        // Fungsi untuk menyimpan data ke localStorage
        function saveToLocalStorage(data) {
            localStorage.setItem('inventoryData', JSON.stringify(data));
        }

        // Fungsi untuk memuat data dari localStorage
        function loadFromLocalStorage() {
            const savedData = localStorage.getItem('inventoryData');
            if (savedData) {
                const sheetData = JSON.parse(savedData);
                renderTable(sheetData);
            }
        }

        // Fungsi untuk filter data berdasarkan input pencarian
        function filterData() {
            const searchTerm = searchInput.value.toLowerCase();
            Array.from(dataTable.rows).forEach(row => {
                const rowText = Array.from(row.cells).map(cell => cell.textContent.toLowerCase()).join(' ');
                row.style.display = rowText.includes(searchTerm) ? '' : 'none';
            });
        }

        // Event listener untuk pencarian
        searchInput.addEventListener('input', filterData);

        // Muat data dari localStorage saat halaman dimuat
        window.onload = loadFromLocalStorage;
    </script>
</body>
</html>


