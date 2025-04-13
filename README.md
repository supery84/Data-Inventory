
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Excel File Manager Pro</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    />
    <style>
      :root {
        --gradient-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --primary-color: #667eea;
        --secondary-color: #764ba2;
        --accent-color: #6a11cb;
        --light-color: #f8f9fa;
        --dark-color: #343a40;
      }

      body {
        background: var(--gradient-bg);
        min-height: 100vh;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: var(--dark-color);
      }

      .main-container {
        background: rgba(255, 255, 255, 0.97);
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        margin-top: 2rem;
        padding: 2rem;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
      }

      .main-container:hover {
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
      }

      .folder-sidebar {
        border-right: 2px solid rgba(0, 0, 0, 0.05);
        min-height: 80vh;
        padding-right: 1.5rem;
        position: relative;
      }

      .folder-item {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        cursor: pointer;
        position: relative;
        padding: 12px 15px;
        margin-bottom: 8px;
        border-radius: 10px;
        background-color: rgba(248, 249, 250, 0.7);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      .folder-item:hover {
        background-color: rgba(102, 126, 234, 0.1);
        transform: translateX(5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .active-file {
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--secondary-color)
        ) !important;
        color: white !important;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4) !important;
      }

      .search-box {
        border-radius: 30px;
        padding: 12px 25px;
        transition: all 0.3s ease;
        border: 2px solid rgba(0, 0, 0, 0.1);
        background-color: rgba(248, 249, 250, 0.8);
      }

      .search-box:focus {
        box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
        border-color: var(--primary-color);
        background-color: white;
      }

      #excelTable {
        display: none;
        margin-top: 1.5rem;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      #excelTable thead th {
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--secondary-color)
        );
        color: white;
        border: none;
        padding: 15px;
      }

      #excelTable tbody tr {
        transition: all 0.2s ease;
      }

      #excelTable tbody tr:hover {
        background-color: rgba(102, 126, 234, 0.05);
        transform: translateY(-1px);
      }

      .delete-folder-btn {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0;
        transition: all 0.3s ease;
        padding: 5px 10px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .folder-item:hover .delete-folder-btn {
        opacity: 0.7;
      }

      .folder-item:hover .delete-folder-btn:hover {
        opacity: 1;
        background-color: rgba(220, 53, 69, 0.2);
      }

      .close-folder-btn {
        margin-left: 15px;
        padding: 8px 20px;
        border-radius: 30px;
        transition: all 0.3s ease;
        font-weight: 500;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .close-folder-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      .upload-section {
        position: relative;
        overflow: hidden;
        border-radius: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }

      .upload-section:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .upload-section label {
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--secondary-color)
        );
        border: none;
        font-weight: 500;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .upload-section label:hover {
        background: linear-gradient(
          90deg,
          var(--secondary-color),
          var(--primary-color)
        );
      }

      .badge-count {
        background-color: rgba(255, 255, 255, 0.2);
        color: white;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 20px;
      }

      .active-file .badge-count {
        background-color: rgba(255, 255, 255, 0.3);
      }

      /* Modal styling */
      .modal-content {
        border-radius: 15px;
        overflow: hidden;
        border: none;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      .modal-header {
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--secondary-color)
        );
        color: white;
        border: none;
      }

      .modal-footer {
        border: none;
        background-color: #f8f9fa;
      }

      /* Floating action button */
      #newFolderBtn {
        background: linear-gradient(
          45deg,
          var(--primary-color),
          var(--secondary-color)
        );
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
      }

      #newFolderBtn:hover {
        transform: rotate(90deg) scale(1.1);
        box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
      }

      /* Title styling */
      h4 {
        color: var(--secondary-color);
        font-weight: 600;
        position: relative;
        display: inline-block;
      }

      h4:after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 50px;
        height: 3px;
        background: linear-gradient(
          90deg,
          var(--primary-color),
          var(--secondary-color)
        );
        border-radius: 3px;
      }

      /* Empty state */
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 0;
        text-align: center;
        color: #6c757d;
      }

      .empty-state i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #dee2e6;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .folder-sidebar {
          border-right: none;
          border-bottom: 2px solid rgba(0, 0, 0, 0.05);
          min-height: auto;
          padding-right: 0;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
        }

        .main-container {
          padding: 1.5rem;
        }
      }

      /* Animation */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .folder-item,
      #excelTable {
        animation: fadeIn 0.4s ease forwards;
      }

      /* Scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(102, 126, 234, 0.5);
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--primary-color);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="main-container row">
        <!-- Folder Sidebar -->
        <div class="folder-sidebar col-md-3">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4>File Manager</h4>
            <button
              class="btn btn-sm btn-primary"
              id="newFolderBtn"
              title="New Folder"
            >
              <i class="fas fa-folder-plus"></i>
            </button>
          </div>
          <div id="folderList">
            <!-- Folders will be rendered here -->
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-9">
          <!-- Upload Section -->
          <div class="upload-section mb-5">
            <input type="file" id="excelFile" accept=".xlsx, .xls" hidden />
            <label for="excelFile" class="btn btn-primary w-100 py-3">
              <i class="fas fa-cloud-upload-alt me-2"></i>Upload Excel File
            </label>
          </div>

          <!-- Search and Table -->
          <div class="search-container mb-4 d-flex align-items-center">
            <div class="position-relative flex-grow-1">
              <input
                type="text"
                id="searchInput"
                class="form-control search-box"
                placeholder="Search data..."
              />
              <i
                class="fas fa-search position-absolute"
                style="
                  right: 20px;
                  top: 50%;
                  transform: translateY(-50%);
                  color: #6c757d;
                "
              ></i>
            </div>
            <button class="btn btn-danger close-folder-btn" id="closeFolderBtn">
              <i class="fas fa-times me-1"></i>Close Folder
            </button>
          </div>

          <div class="table-responsive">
            <table class="table table-hover" id="excelTable">
              <thead class="table-primary"></thead>
              <tbody></tbody>
            </table>
          </div>

          <!-- Empty state (hidden by default) -->
          <div id="emptyState" class="empty-state" style="display: none">
            <i class="fas fa-folder-open"></i>
            <h5>No Folder Selected</h5>
            <p class="text-muted">
              Select a folder from the sidebar or create a new one to get
              started
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Folder Modal -->
    <div class="modal fade" id="folderModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create New Folder</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              id="folderName"
              class="form-control"
              placeholder="Folder name"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-primary" id="saveFolderBtn">
              Create Folder
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js"></script>

    <script>
      let db;
      let activeFolderId = null;
      const DB_NAME = "ExcelFileManager";
      const DB_VERSION = 4;

      // Initialize Database
      const initDB = () => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
          db = e.target.result;

          if (!db.objectStoreNames.contains("folders")) {
            const folderStore = db.createObjectStore("folders", {
              keyPath: "id",
              autoIncrement: true,
            });
            folderStore.createIndex("name", "name", { unique: true });
          }

          if (!db.objectStoreNames.contains("files")) {
            const fileStore = db.createObjectStore("files", {
              keyPath: "id",
              autoIncrement: true,
            });
            fileStore.createIndex("folderId", "folderId");
          }
        };

        request.onsuccess = (e) => {
          db = e.target.result;
          loadFolders();
          updateEmptyState();
        };
      };

      // Folder Functions
      const createFolder = (name) => {
        const transaction = db.transaction(["folders"], "readwrite");
        const store = transaction.objectStore("folders");
        store.add({ name });
        transaction.oncomplete = () => {
          loadFolders();
          document.getElementById("folderName").value = "";
          bootstrap.Modal.getInstance(
            document.getElementById("folderModal")
          ).hide();
        };
      };

      const loadFolders = async () => {
        const transaction = db.transaction(["folders"], "readonly");
        const store = transaction.objectStore("folders");
        const request = store.getAll();

        request.onsuccess = async (e) => {
          const folders = e.target.result;
          renderFolders(folders);
          updateEmptyState();
        };
      };

      const renderFolders = async (folders) => {
        const container = document.getElementById("folderList");
        container.innerHTML = await Promise.all(
          folders.map(async (folder) => {
            const fileCount = await countFilesInFolder(folder.id);
            return `
                    <div class="folder-item p-2 mb-2 rounded d-flex justify-content-between align-items-center 
                        ${activeFolderId === folder.id ? "active-file" : ""}"
                         data-id="${folder.id}"
                         style="cursor: pointer; position: relative">
                        <div>
                            <i class="fas fa-folder me-2"></i>
                            ${folder.name}
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="badge badge-count me-2">${fileCount}</span>
                            <button class="btn btn-sm btn-danger delete-folder-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
          })
        );

        document.querySelectorAll(".folder-item").forEach((item) => {
          item.addEventListener("click", async () => {
            activeFolderId = Number(item.dataset.id);
            await loadFiles(activeFolderId);
            loadFolders();
            updateEmptyState();
          });
        });

        document.querySelectorAll(".delete-folder-btn").forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const folderId = Number(btn.closest(".folder-item").dataset.id);
            if (confirm("Delete this folder and all its contents?")) {
              await deleteFolder(folderId);
              updateEmptyState();
            }
          });
        });
      };

      const deleteFolder = async (folderId) => {
        return new Promise((resolve) => {
          const transaction = db.transaction(["folders", "files"], "readwrite");

          // Delete folder
          const folderStore = transaction.objectStore("folders");
          folderStore.delete(folderId);

          // Delete related files
          const fileStore = transaction.objectStore("files");
          const index = fileStore.index("folderId");
          const request = index.openCursor(IDBKeyRange.only(folderId));

          request.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
              fileStore.delete(cursor.primaryKey);
              cursor.continue();
            }
          };

          transaction.oncomplete = () => {
            if (activeFolderId === folderId) {
              activeFolderId = null;
              document.getElementById("excelTable").style.display = "none";
            }
            loadFolders();
            updateEmptyState();
            resolve();
          };
        });
      };

      // File Functions
      const countFilesInFolder = (folderId) => {
        return new Promise((resolve) => {
          const transaction = db.transaction(["files"], "readonly");
          const store = transaction.objectStore("files");
          const index = store.index("folderId");
          const request = index.count(folderId);

          request.onsuccess = (e) => resolve(e.target.result);
        });
      };

      const loadFiles = async (folderId) => {
        return new Promise((resolve) => {
          const transaction = db.transaction(["files"], "readonly");
          const store = transaction.objectStore("files");
          const index = store.index("folderId");
          const request = index.getAll(folderId);

          request.onsuccess = (e) => {
            const files = e.target.result;
            if (files.length > 0) {
              displayData(files[files.length - 1].data);
              document.getElementById("excelTable").style.display = "table";
            } else {
              document.getElementById("excelTable").style.display = "none";
            }
            updateEmptyState();
            resolve(files);
          };
        });
      };

      const saveFile = async (fileData, folderId) => {
        return new Promise((resolve) => {
          const transaction = db.transaction(["files"], "readwrite");
          const store = transaction.objectStore("files");
          const request = store.add({
            fileName: fileData.fileName,
            data: fileData.data,
            folderId,
            uploadedAt: new Date(),
          });

          request.onsuccess = async () => {
            await loadFiles(folderId);
            loadFolders();
            updateEmptyState();
            resolve();
          };
        });
      };

      // Data Display
      function displayData(data) {
        const table = document.getElementById("excelTable");
        const thead = table.querySelector("thead");
        const tbody = table.querySelector("tbody");

        thead.innerHTML = "";
        tbody.innerHTML = "";

        // Create headers
        const headerRow = document.createElement("tr");
        data[0].forEach((headerText) => {
          const th = document.createElement("th");
          th.textContent = headerText;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create body rows
        for (let i = 1; i < data.length; i++) {
          const tr = document.createElement("tr");
          let searchString = "";

          data[i].forEach((cellData) => {
            const td = document.createElement("td");
            td.textContent = cellData;
            searchString += cellData.toString().toLowerCase() + " ";
            tr.appendChild(td);
          });

          tr.setAttribute("data-search", searchString.trim());
          tbody.appendChild(tr);
        }

        table.style.display = "table";
        updateEmptyState();
      }

      // Update empty state visibility
      function updateEmptyState() {
        const emptyState = document.getElementById("emptyState");
        const excelTable = document.getElementById("excelTable");

        if (!activeFolderId) {
          emptyState.style.display = "flex";
          excelTable.style.display = "none";
        } else {
          emptyState.style.display = "none";
          if (excelTable.querySelector("tbody").children.length > 0) {
            excelTable.style.display = "table";
          }
        }
      }

      // Event Listeners
      document.getElementById("newFolderBtn").addEventListener("click", () => {
        new bootstrap.Modal("#folderModal").show();
      });

      document.getElementById("saveFolderBtn").addEventListener("click", () => {
        const name = document.getElementById("folderName").value;
        if (name) createFolder(name);
      });

      document
        .getElementById("excelFile")
        .addEventListener("change", async function (e) {
          if (!activeFolderId) {
            alert("Please select a folder first!");
            return;
          }

          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
              header: 1,
            });

            await saveFile(
              {
                fileName: file.name,
                data: jsonData,
              },
              activeFolderId
            );
          };

          reader.readAsArrayBuffer(file);
          this.value = ""; // Reset file input
        });

      // Search Functionality
      document
        .getElementById("searchInput")
        .addEventListener("input", function (e) {
          const searchTerm = e.target.value.toLowerCase();
          const rows = document.querySelectorAll("#excelTable tbody tr");

          rows.forEach((row) => {
            const rowText = row.getAttribute("data-search");
            row.style.display = rowText.includes(searchTerm) ? "" : "none";
          });
        });

      // Close Folder
      document
        .getElementById("closeFolderBtn")
        .addEventListener("click", () => {
          activeFolderId = null;
          document.getElementById("excelTable").style.display = "none";
          document.getElementById("searchInput").value = "";
          loadFolders();
          updateEmptyState();
        });

      // Initialize
      initDB();
    </script>
  </body>
</html>






