<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excel File Manager Pro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: var(--dark-color);
        }
        .navbar {
            box-shadow: 0 2px 8px rgba(102,126,234,0.07);
        }
        .hero-section {
            min-height: 55vh;
            background: linear-gradient(90deg,#667eea,#764ba2);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        .hero-section h1 {
            font-size: 2.5rem;
            font-weight: 700;
        }
        .main-container {
            background: rgba(255, 255, 255, 0.97);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            margin-top: 2rem;
            padding: 2rem;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255,255,255,0.2);
            transition: all 0.3s ease;
        }
        .main-container:hover {
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .folder-sidebar {
            border-right: 2px solid rgba(0,0,0,0.05);
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
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .folder-item:hover {
            background-color: rgba(102, 126, 234, 0.1);
            transform: translateX(5px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .active-file {
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color))!important;
            color: white!important;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4)!important;
        }
        .search-box {
            border-radius: 30px;
            padding: 12px 25px;
            transition: all 0.3s ease;
            border: 2px solid rgba(0,0,0,0.1);
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
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        #excelTable thead th {
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
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
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .close-folder-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .upload-section {
            position: relative;
            overflow: hidden;
            border-radius: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .upload-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .upload-section label {
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            border: none;
            font-weight: 500;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .upload-section label:hover {
            background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
        }
        .badge-count {
            background-color: rgba(255,255,255,0.2);
            color: white;
            font-weight: 500;
            padding: 5px 10px;
            border-radius: 20px;
        }
        .active-file .badge-count {
            background-color: rgba(255,255,255,0.3);
        }
        .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .action-btn {
            padding: 8px 15px;
            border-radius: 5px;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        .modal-content {
            border-radius: 15px;
            overflow: hidden;
            border: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .modal-header {
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
        }
        .modal-footer {
            border: none;
            background-color: #f8f9fa;
        }
        #progressModal .progress {
            height: 25px;
            border-radius: 12px;
        }
        #progressModal .progress-bar {
            transition: width 0.3s ease;
        }
        #newFolderBtn {
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
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
        h4 {
            color: var(--secondary-color);
            font-weight: 600;
            position: relative;
            display: inline-block;
        }
        h4:after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            border-radius: 3px;
        }
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
        .features-section .fa-2x {
            font-size: 2.5rem;
        }
        .footer {
            background: #232526;
            color: #fff;
        }
        .footer a {
            color: #bfc1c3;
            text-decoration: none;
        }
        .footer a:hover {
            color: #fff;
            text-decoration: underline;
        }
        @media (max-width: 768px) {
            .hero-section h1 {
                font-size: 2rem;
            }
            .main-container {
                padding: 1.5rem;
            }
            .action-buttons {
                flex-direction: column;
                gap: 5px;
            }

            
        }
    </style>
</head>
<body>
<!-- Header/Navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-2">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#"><i class="fas fa-compass text-primary me-2"></i>ExcelFilePro</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>


    <div class="collapse navbar-collapse" id="mainNavbar">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        
        
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
        <li class="nav-item"><a class="nav-link" href="#filemanager">File Manager</a></li>
      </ul>
      
      <a href="#" class="btn btn-outline-primary btn-sm ms-2">Login</a>
      <a href="#" class="btn btn-primary btn-sm ms-2">Sign Up</a>
    </div>
  </div>
</nav>



<!-- Hero Section -->
<section class="hero-section" id="hero">
      <div>
        <!-- Digital Clock -->
<div id="digitalClock"></div>
    <h1 class="display-4 fw-bold mb-3">Manage Your Excel Files Easily</h1>
    <p class="lead mb-4">Upload, organize, and edit your Excel data in one modern dashboard.</p>
    <a href="#filemanager" class="btn btn-lg btn-light fw-bold px-4 py-2 me-2">Get Started</a>
    <a href="#features" class="btn btn-outline-light btn-lg px-4 py-2">Learn More</a>
  </div>


</div>
</div>
</nav>

</section>

<!-- Features Section -->
<section id="features" class="features-section py-5 bg-light">
  <div class="container">
    <div class="row text-center">
      <div class="col-md-4 mb-4">
        <i class="fas fa-folder-open fa-2x text-primary mb-3"></i>
        <h5>Folder Management</h5>
        <p>Buat dan kelola folder untuk mengorganisasi file Excel Anda.</p>
      </div>
      <div class="col-md-4 mb-4">
        <i class="fas fa-edit fa-2x text-primary mb-3"></i>
        <h5>Edit Excel Online</h5>
        <p>Edit data langsung di browser dengan tampilan modern.</p>
      </div>
      <div class="col-md-4 mb-4">
        <i class="fas fa-cloud-upload-alt fa-2x text-primary mb-3"></i>
        <h5>Secure Upload</h5>
        <p>Upload file Excel dengan progress bar dan keamanan data.</p>
      </div>
    </div>
  </div>
</section>

<!-- File Manager Section -->
<div class="container" id="filemanager">
    <div class="main-container row">
        <!-- Folder Sidebar -->
        <div class="folder-sidebar col-md-3">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4>File Manager</h4>
                <button class="btn btn-sm btn-primary" id="newFolderBtn" title="New Folder">
                    <i class="fas fa-folder-plus"></i>
                </button>
            </div>
            <div id="folderList"></div>
        </div>
        <!-- Main Content -->
        <div class="col-md-9">
            <div class="upload-section mb-5">
                <input type="file" id="excelFile" accept=".xlsx, .xls" hidden>
                <label for="excelFile" class="btn btn-primary w-100 py-3">
                    <i class="fas fa-cloud-upload-alt me-2"></i>Upload Excel File
                </label>
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary action-btn" id="editFileBtn" disabled>
                    <i class="fas fa-edit me-1"></i>Edit File
                </button>
                <button class="btn btn-success action-btn" id="saveChangesBtn" disabled>
                    <i class="fas fa-save me-1"></i>Save Changes
                </button>
                <button class="btn btn-danger action-btn" id="cancelEditBtn" disabled>
                    <i class="fas fa-times me-1"></i>Cancel Edit
                </button>
            </div>
            <div class="search-container mb-4 d-flex align-items-center">
                <div class="position-relative flex-grow-1">
                    <input type="text" id="searchInput" class="form-control search-box" placeholder="Search data...">
                    <i class="fas fa-search position-absolute" style="right: 20px; top: 50%; transform: translateY(-50%); color: #6c757d;"></i>
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
            <div id="emptyState" class="empty-state" style="display: none;">
                <i class="fas fa-folder-open"></i>
                <h5>No Folder Selected</h5>
                <p class="text-muted">Select a folder from the sidebar or create a new one to get started</p>
            </div>
        </div>
    </div>
</div>
<!-- Footer -->
<footer class="footer py-4 mt-5">
  <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
    <div>
      <span class="fw-bold">ExcelFilePro</span> &copy; 2025
      <span class="ms-3">
        <a href="#">About</a>
        <a href="#" class="ms-3">Privacy Policy</a>
        <a href="#" class="ms-3">Contact</a>
      </span>
    </div>
    <div class="mt-3 mt-md-0">
      <a href="https://www.facebook.com/supriyanto.supriyanto.167" class="text-white me-2"><i class="fab fa-facebook"></i></a>
      <a href="#" class="text-white me-2"><i class="fab fa-twitter"></i></a>
      <a href="https://www.instagram.com/" class="text-white"><i class="fab fa-instagram"></i></a>
    </div>
  </div>
</footer>
<!-- Folder Modal -->
<div class="modal fade" id="folderModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Create New Folder</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <input type="text" id="folderName" class="form-control" placeholder="Folder name">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" id="saveFolderBtn">Create Folder</button>
            </div>
        </div>
    </div>
</div>
<!-- Edit Cell Modal -->
<div class="modal fade" id="editCellModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Cell Value</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Column: <span id="editColumnName"></span></label>
                    <input type="text" class="form-control edit-cell-input" id="editCellValue">
                </div>
                <div class="edit-buttons">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveCellEditBtn">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js"></script>
<script>
/* All JS from paste.txt, unchanged except for placement at the end for correct event attachment */
let db;
let activeFolderId = null;
let currentFileData = null;
let currentFileId = null;
let isEditMode = false;
let editedData = null;
const DB_NAME = 'ExcelFileManager';
const DB_VERSION = 5;
// Initialize Database
const initDB = () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
        db = e.target.result;
        if (!db.objectStoreNames.contains('folders')) {
            const folderStore = db.createObjectStore('folders', {
                keyPath: 'id',
                autoIncrement: true
            });
            folderStore.createIndex('name', 'name', { unique: true });
        }
        if (!db.objectStoreNames.contains('files')) {
            const fileStore = db.createObjectStore('files', {
                keyPath: 'id',
                autoIncrement: true
            });
            fileStore.createIndex('folderId', 'folderId');
        }
    };
    request.onsuccess = (e) => {
        db = e.target.result;
        loadFolders();
        updateEmptyState();
        // Add progress modal to DOM
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal fade" id="progressModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Processing Excel File</h5>
                        </div>
                        <div class="modal-body">
                            <div class="progress mb-3">
                                <div id="uploadProgress" class="progress-bar progress-bar-striped progress-bar-animated" 
                                     role="progressbar" style="width: 0%"></div>
                            </div>
                            <p id="progressText">Reading file...</p>
                            <p id="fileStats" class="small text-muted"></p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    };
};
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
const createFolder = (name) => {
    const transaction = db.transaction(['folders'], 'readwrite');
    const store = transaction.objectStore('folders');
    const checkRequest = store.index('name').get(name);
    checkRequest.onsuccess = (e) => {
        if (e.target.result) {
            alert('Folder with this name already exists!');
            return;
        }
        const addRequest = store.add({ name });
        addRequest.onsuccess = () => {
            loadFolders();
            document.getElementById('folderName').value = '';
            bootstrap.Modal.getInstance(document.getElementById('folderModal')).hide();
        };
        addRequest.onerror = (e) => {
            console.error('Error creating folder:', e.target.error);
            alert('Error creating folder. Please try a different name.');
        };
    };
};
const loadFolders = () => {
    const transaction = db.transaction(['folders'], 'readonly');
    const store = transaction.objectStore('folders');
    const request = store.getAll();
    request.onsuccess = (e) => {
        const folders = e.target.result;
        renderFolders(folders);
        updateEmptyState();
    };
};
const renderFolders = async (folders) => {
    const container = document.getElementById('folderList');
    container.innerHTML = '';
    for (const folder of folders) {
        const fileCount = await countFilesInFolder(folder.id);
        const folderElement = document.createElement('div');
        folderElement.className = `folder-item p-2 mb-2 rounded d-flex justify-content-between align-items-center 
            ${activeFolderId === folder.id ? 'active-file' : ''}`;
        folderElement.dataset.id = folder.id;
        folderElement.style.cssText = 'cursor: pointer; position: relative';
        folderElement.innerHTML = `
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
        `;
        folderElement.addEventListener('click', async () => {
            activeFolderId = Number(folder.id);
            await loadFiles(activeFolderId);
            loadFolders();
            updateEmptyState();
        });
        const deleteBtn = folderElement.querySelector('.delete-folder-btn');
        deleteBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if(confirm('Delete this folder and all its contents?')) {
                await deleteFolder(folder.id);
                updateEmptyState();
            }
        });
        container.appendChild(folderElement);
    }
};
const deleteFolder = async (folderId) => {
    return new Promise((resolve) => {
        const transaction = db.transaction(['folders', 'files'], 'readwrite');
        const folderStore = transaction.objectStore('folders');
        folderStore.delete(folderId);
        const fileStore = transaction.objectStore('files');
        const index = fileStore.index('folderId');
        const request = index.openCursor(IDBKeyRange.only(folderId));
        request.onsuccess = (e) => {
            const cursor = e.target.result;
            if(cursor) {
                fileStore.delete(cursor.primaryKey);
                cursor.continue();
            }
        };
        transaction.oncomplete = () => {
            if(activeFolderId === folderId) {
                activeFolderId = null;
                document.getElementById('excelTable').style.display = 'none';
                disableEditButtons();
            }
            loadFolders();
            updateEmptyState();
            resolve();
        };
    });
};
const countFilesInFolder = (folderId) => {
    return new Promise((resolve) => {
        const transaction = db.transaction(['files'], 'readonly');
        const store = transaction.objectStore('files');
        const index = store.index('folderId');
        const request = index.count(folderId);
        request.onsuccess = (e) => resolve(e.target.result);
    });
};
const loadFiles = async (folderId) => {
    return new Promise((resolve) => {
        const transaction = db.transaction(['files'], 'readonly');
        const store = transaction.objectStore('files');
        const index = store.index('folderId');
        const request = index.getAll(folderId);
        request.onsuccess = (e) => {
            const files = e.target.result;
            if(files.length > 0) {
                const latestFile = files[files.length-1];
                currentFileData = latestFile.data;
                currentFileId = latestFile.id;
                displayData(currentFileData);
                document.getElementById('excelTable').style.display = 'table';
                enableEditButtons();
            } else {
                document.getElementById('excelTable').style.display = 'none';
                currentFileData = null;
                currentFileId = null;
                disableEditButtons();
            }
            updateEmptyState();
            resolve(files);
        };
    });
};
const saveFile = async (fileData, folderId) => {
    return new Promise((resolve) => {
        const transaction = db.transaction(['files'], 'readwrite');
        const store = transaction.objectStore('files');
        const request = store.add({
            fileName: fileData.fileName,
            data: fileData.data,
            folderId,
            uploadedAt: new Date()
        });
        request.onsuccess = async () => {
            await loadFiles(folderId);
            loadFolders();
            updateEmptyState();
            resolve();
        };
    });
};
const updateFile = async (fileId, newData) => {
    return new Promise((resolve) => {
        const transaction = db.transaction(['files'], 'readwrite');
        const store = transaction.objectStore('files');
        const getRequest = store.get(fileId);
        getRequest.onsuccess = (e) => {
            const file = e.target.result;
            if (file) {
                file.data = newData;
                const updateRequest = store.put(file);
                updateRequest.onsuccess = () => {
                    currentFileData = newData;
                    resolve(true);
                };
                updateRequest.onerror = () => {
                    resolve(false);
                };
            } else {
                resolve(false);
            }
        };
    });
};
function displayData(data, isEditable = false) {
    const table = document.getElementById('excelTable');
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    thead.innerHTML = '';
    tbody.innerHTML = '';
    const headerRow = document.createElement('tr');
    data[0].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    for(let i = 1; i < data.length; i++) {
        const tr = document.createElement('tr');
        let searchString = '';
        data[i].forEach((cellData, cellIndex) => {
            const td = document.createElement('td');
            if (isEditable) {
                td.style.cursor = 'pointer';
                td.addEventListener('click', () => {
                    openEditModal(i, cellIndex, data[0][cellIndex], cellData);
                });
            }
            td.textContent = cellData;
            searchString += cellData.toString().toLowerCase() + ' ';
            tr.appendChild(td);
        });
        tr.setAttribute('data-search', searchString.trim());
        tbody.appendChild(tr);
    }
    table.style.display = 'table';
    updateEmptyState();
}
function enableEditButtons() {
    document.getElementById('editFileBtn').disabled = false;
    document.getElementById('saveChangesBtn').disabled = true;
    document.getElementById('cancelEditBtn').disabled = true;
}
function disableEditButtons() {
    document.getElementById('editFileBtn').disabled = true;
    document.getElementById('saveChangesBtn').disabled = true;
    document.getElementById('cancelEditBtn').disabled = true;
}
function openEditModal(rowIndex, colIndex, colName, currentValue) {
    const editModal = new bootstrap.Modal(document.getElementById('editCellModal'));
    document.getElementById('editColumnName').textContent = colName;
    document.getElementById('editCellValue').value = currentValue;
    document.getElementById('saveCellEditBtn').onclick = () => {
        const newValue = document.getElementById('editCellValue').value;
        editedData[rowIndex][colIndex] = newValue;
        const tbody = document.getElementById('excelTable').querySelector('tbody');
        const row = tbody.children[rowIndex - 1];
        if (row) {
            const cell = row.children[colIndex];
            if (cell) {
                cell.textContent = newValue;
            }
        }
        editModal.hide();
    };
    editModal.show();
}
function updateEmptyState() {
    const emptyState = document.getElementById('emptyState');
    const excelTable = document.getElementById('excelTable');
    if (!activeFolderId) {
        emptyState.style.display = 'flex';
        excelTable.style.display = 'none';
        disableEditButtons();
    } else {
        emptyState.style.display = 'none';
        if (excelTable.querySelector('tbody').children.length > 0) {
            excelTable.style.display = 'table';
        }
    }
}
document.getElementById('excelFile').addEventListener('change', async function(e) {
    if(!activeFolderId) {
        alert('Please select a folder first!');
        return;
    }
    const file = e.target.files[0];
    if (!file) return;
    const modal = new bootstrap.Modal(document.getElementById('progressModal'));
    modal.show();
    const progressBar = document.getElementById('uploadProgress');
    const progressText = document.getElementById('progressText');
    const fileStats = document.getElementById('fileStats');
    fileStats.textContent = `File: ${file.name} (${formatFileSize(file.size)})`;
    try {
        const reader = new FileReader();
        progressText.textContent = "Processing (this may take a while for large files)...";
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = [];
            const chunkSize = 5000;
            let rowCount = 0;
            const range = XLSX.utils.decode_range(firstSheet['!ref']);
            const totalRows = range.e.r;
            for (let R = range.s.r; R <= range.e.r; R += chunkSize) {
                const endR = Math.min(R + chunkSize - 1, range.e.r);
                const newRange = XLSX.utils.encode_range({
                    s: { c: range.s.c, r: R },
                    e: { c: range.e.c, r: endR }
                });
                firstSheet['!ref'] = newRange;
                const chunk = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                if (R === range.s.r) {
                    jsonData.push(...chunk);
                } else {
                    jsonData.push(...chunk.slice(1));
                }
                rowCount += chunk.length - (R === range.s.r ? 0 : 1);
                const progress = Math.min(100, Math.round((rowCount / totalRows) * 100));
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `Processed ${rowCount} of ${totalRows} rows...`;
                await new Promise(resolve => setTimeout(resolve, 0));
            }
            await saveFile({
                fileName: file.name,
                data: jsonData
            }, activeFolderId);
            modal.hide();
        };
        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.error("Error processing file:", error);
        progressText.textContent = `Error: ${error.message}`;
        progressBar.classList.remove('progress-bar-animated');
        progressBar.classList.add('bg-danger');
    }
});
document.getElementById('newFolderBtn').addEventListener('click', function() {
    var modal = new bootstrap.Modal(document.getElementById('folderModal'));
    modal.show();
});
document.getElementById('saveFolderBtn').addEventListener('click', function() {
    var name = document.getElementById('folderName').value.trim();
    if (name) {
        createFolder(name);
    } else {
        alert('Please enter a folder name');
    }
});
document.getElementById('editFileBtn').addEventListener('click', function() {
    if (!currentFileData) return;
    isEditMode = true;
    editedData = JSON.parse(JSON.stringify(currentFileData));
    displayData(editedData, true);
    document.getElementById('editFileBtn').disabled = true;
    document.getElementById('saveChangesBtn').disabled = false;
    document.getElementById('cancelEditBtn').disabled = false;
});
document.getElementById('saveChangesBtn').addEventListener('click', async function() {
    if (!editedData || !currentFileId) return;
    const success = await updateFile(currentFileId, editedData);
    if (success) {
        alert('Changes saved successfully!');
        isEditMode = false;
        displayData(editedData);
        document.getElementById('editFileBtn').disabled = false;
        document.getElementById('saveChangesBtn').disabled = true;
        document.getElementById('cancelEditBtn').disabled = true;
    } else {
        alert('Failed to save changes. Please try again.');
    }
});
document.getElementById('cancelEditBtn').addEventListener('click', function() {
    isEditMode = false;
    displayData(currentFileData);
    document.getElementById('editFileBtn').disabled = false;
    document.getElementById('saveChangesBtn').disabled = true;
    document.getElementById('cancelEditBtn').disabled = true;
});
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#excelTable tbody tr');
    rows.forEach(row => {
        const rowText = row.getAttribute('data-search');
        row.style.display = rowText.includes(searchTerm) ? '' : 'none';
    });
});
document.getElementById('closeFolderBtn').addEventListener('click', function() {
    activeFolderId = null;
    currentFileData = null;
    currentFileId = null;
    isEditMode = false;
    document.getElementById('excelTable').style.display = 'none';
    document.getElementById('searchInput').value = '';
    disableEditButtons();
    loadFolders();
    updateEmptyState();
});
initDB();

// Digital Clock Script
function updateDigitalClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    const clock = document.getElementById('digitalClock');
    if (clock) {
        clock.textContent = timeString;
    }
}
setInterval(updateDigitalClock, 1000);
updateDigitalClock(); // initial call

</script>
</body>
</html>







