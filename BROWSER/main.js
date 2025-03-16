const data = [
    {
      partNo: "CGS-00010-001",
      oldPartNo: "CO-COM-L-WH1-0028",
      partName: "ARGON GAS",
      partSize: "KAPASITAS 7 ,10 M",
      colour: "-",
      uomConsumption: "CYLINDER",
      warehouse: "WH2",
      location: "WH2-GUDANG GAS-2",
      stockWh: "5.00",
      status: "Continued"
    },
    {
      partNo: "CGS-00011-001",
      oldPartNo: "CO-COM-L-WH1-0276",
      partName: "LPG GAS",
      partSize: "50 KG",
      colour: "-",
      uomConsumption: "CYLINDER",
      warehouse: "WH2",
      location: "WH2-GUDANG GAS-5",
      stockWh: "0.00",
      status: "Continued"
    }
    // Tambahkan data lainnya di sini
  ];

  const tableBody = document.getElementById("dataTable");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

let currentPage = 1;
const rowsPerPage = 10;

// Render tabel
function renderTable(page) {
  tableBody.innerHTML = "";
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  
  const filteredData = data.slice(startIndex, endIndex);
  
  filteredData.forEach(item => {
    const row = `
      <tr>
        <td>${item.partNo}</td>
        <td>${item.oldPartNo}</td>
        <td>${item.partName}</td>
        <td>${item.partSize}</td>
        <td>${item.colour}</td>
        <td>${item.uomConsumption}</td>
        <td>${item.warehouse}</td>
        <td>${item.location}</td>
        <td>${item.stockWh}</td>
        <td>${item.status}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

// Render pagination
function renderPagination() {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(data.length / rowsPerPage);
  
  for (let i = 1; i <= pageCount; i++) {
    const li = `<li class="page-item ${i === currentPage ? 'active' : ''}">
                  <button class="page-link" onclick="changePage(${i})">${i}</button>
                </li>`;
    pagination.innerHTML += li;
  }
}

// Change page
function changePage(page) {
  currentPage = page;
  renderTable(page);
}

// Pencarian
searchInput.addEventListener("input", function() {
  const searchValue = this.value.toLowerCase();
  
  const filteredData = data.filter(item => 
    Object.values(item).some(val => val.toLowerCase().includes(searchValue))
  );
  
  tableBody.innerHTML = "";
  
  filteredData.forEach(item => {
    const row = `
      <tr>
        <td>${item.partNo}</td>
        <td>${item.oldPartNo}</td>
        <td>${item.partName}</td>
        <td>${item.partSize}</td>
        <td>${item.colour}</td>
        <td>${item.uomConsumption}</td>
        <td>${item.warehouse}</td>
        <td>${item.location}</td>
        <td>${item.stockWh}</td>
        <td>${item.status}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
});

// Inisialisasi
renderTable(currentPage);
renderPagination();
// Inisialisasi
renderTable(currentPage);
renderPagination();
// Fungsi untuk memperbarui jam digital setiap detik
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (!clockElement) return; // Pastikan elemen ada

  const now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');

  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Jalankan fungsi setiap detik
setInterval(updateClock, 1000);
