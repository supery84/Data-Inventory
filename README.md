<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Excel Data Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #6366f1;
            --secondary-color: #8b5cf6;
            --error-color: #ef4444;
            --success-color: #10b981;
            --gradient-bg: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        }

        body {
            background: var(--gradient-bg);
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .glass-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .folder-sidebar {
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            min-height: 80vh;
            padding: 20px;
        }

        .folder-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 8px;
            position: relative;
            background: rgba(99, 102, 241, 0.05);
        }

        .folder-item:hover {
            background: rgba(99, 102, 241, 0.1);
            transform: translateX(8px);
            box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.05);
        }

        .active-folder {
            background: var(--primary-color) !important;
            color: white !important;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
        }

        .upload-section {
            position: relative;
            overflow: hidden;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
        }

        .upload-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .data-table {
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .table thead {
            background: var(--primary-color);
            color: white;
        }

        .table-hover tbody tr:hover {
            background-color: rgba(99, 102, 241, 0.05);
        }

        .search-box {
            border-radius: 30px;
            padding: 15px 25px;
            border: 2px solid rgba(99, 102, 241, 0.2);
            transition: all 0.3s ease;
        }

        .search-box:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }

        .upload-error {
            display: none;
            background-color: rgba(239, 68, 68, 0.1);
            border-left: 4px solid var(--error-color);
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 4px;
            color: var(--error-color);
        }

        .upload-success {
            display: none;
            background-color: rgba(16, 185, 129, 0.1);
            border-left: 4px solid var(--success-color);
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 4px;
            color: var(--success-color);
        }

        .progress-container {
            height: 4px;
            background: rgba(99, 102, 241, 0.1);
            margin-top: 10px;
            border-radius: 2px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            background: var(--primary-color);
            transition: width 0.3s ease;
            width: 0%;
        }

        .file-input-label {
            padding: 2rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .file-input-label.dragover {
            background: rgba(99, 102, 241, 0.1);
            border: 2px dashed var(--primary-color);
        }

        .no-folder-selected {
            text-align: center;
            padding: 2rem;
            color: #6b7280;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }
    </style>
</head>
<body>
    <div class="container py-4">
        <div class="glass-container row">
            <!-- Folder Sidebar -->
            <div class="folder-sidebar col-md-3">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="mb-0 text-primary"><i class="fas fa-folder-open me-2"></i>File Manager</h4>
                    <button class="btn btn-sm btn-primary" id="newFolderBtn">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div id="folderList" class="scroll-area"></div>
            </div>

            <!-- Main Content -->
            <div class="col-md-9 p-4">
                <!-- Upload Section -->
                <div class="upload-section mb-4">
                    <input type="file" id="excelFile" accept=".xlsx, .xls" hidden>
                    <label for="excelFile" id="fileInputLabel" class="file-input-label d-flex flex-column align-items-center">
                        <i class="fas fa-file-excel fa-3x mb-3" style="color: var(--primary-color);"></i>
                        <h5 class="mb-2">Upload Excel File</h5>
                        <p class="text-muted mb-3">Drag & drop your file here or click to browse</p>
                        <div class="progress-container w-100">
                            <div class="progress-bar" id="uploadProgress"></div>
                        </div>
                    </label>
                    <div class="upload-error" id="uploadError"></div>
                    <div class="upload-success" id="uploadSuccess"></div>
                </div>

                <!-- Search and Table -->
                <div class="search-container mb-4 d-flex align-items-center">
                    <input type="text" id="searchInput" class="form-control search-box" 
                           placeholder="Search data...">
                    <button class="btn btn-outline-danger ms-3" id="closeFolderBtn">
                        <i class="fas fa-times me-1"></i>Close Folder
                    </button>
                </div>
                
                <div id="tableContainer">
                    <div class="no-folder-selected" id="noFolderSelected">
                        <i class="fas fa-folder-open fa-3x mb-3"></i>
                        <h4>No Folder Selected</h4>
                        <p>Select a folder from the sidebar or create a new one to get started</p>
                    </div>
                    <div class="data-table" id="dataTable" style="display: none;">
                        <table class="table table-hover align-middle" id="excelTable">
                            <thead class="sticky-top"></thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Folder Modal -->
    <div class="modal fade" id="folderModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title">Create New Folder</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-folder"></i></span>
                        <input type="text" id="folderName" class="form-control" 
                               placeholder="Enter folder name" style="border-radius: 8px">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="saveFolderBtn">
                        <i class="fas fa-save me-2"></i>Create Folder
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js"></script>
    
    <script>
        let db;
        let activeFolderId = null;
        const DB_NAME = 'ExcelFileManager';
        const DB_VERSION = 4;

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
            };
            
            request.onerror = (e) => {
                showError('Database error: ' + e.target.error);
                console.error('IndexedDB error:', e.target.error);
            };
        };

        // Folder Functions
        const createFolder = (name) => {
            if (!name || name.trim() === '') {
                showError('Folder name cannot be empty');
                return;
            }
            
            const transaction = db.transaction(['folders'], 'readwrite');
            const store = transaction.objectStore('folders');
            
            const request = store.add({ name });
            
            request.onsuccess = () => {
                loadFolders();
                hideError();
                bootstrap.Modal.getInstance(document.getElementById('folderModal')).hide();
                document.getElementById('folderName').value = '';
            };
            
            request.onerror = (e) => {
                if (e.target.error.name === 'ConstraintError') {
                    showError('A folder with this name already exists');
                } else {
                    showError('Error creating folder: ' + e.target.error);
                }
            };
        };

        const loadFolders = async () => {
            const transaction = db.transaction(['folders'], 'readonly');
            const store = transaction.objectStore('folders');
            const request = store.getAll();
            
            request.onsuccess = async (e) => {
                const folders = e.target.result;
                await renderFolders(folders);
            };
            
            request.onerror = (e) => {
                showError('Error loading folders: ' + e.target.error);
            };
        };

        const renderFolders = async (folders) => {
            const container = document.getElementById('folderList');
            container.innerHTML = await Promise.all(folders.map(async folder => {
                const fileCount = await countFilesInFolder(folder.id);
                return `
                    <div class="folder-item p-2 mb-2 rounded d-flex justify-content-between align-items-center 
                        ${activeFolderId === folder.id ? 'active-folder' : ''}"
                         data-id="${folder.id}"
                         style="cursor: pointer; position: relative">
                        <div>
                            <i class="fas fa-folder me-2"></i>
                            ${folder.name}
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="badge bg-primary me-2">${fileCount}</span>
                            <button class="btn btn-sm btn-outline-danger delete-folder-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }));
            
            document.querySelectorAll('.folder-item').forEach(item => {
                item.addEventListener('click', async () => {
                    activeFolderId = Number(item.dataset.id);
                    await loadFiles(activeFolderId);
                    loadFolders();
                    document.getElementById('noFolderSelected').style.display = 'none';
                    document.getElementById('dataTable').style.display = 'block';
                });
            });

            document.querySelectorAll('.delete-folder-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const folderId = Number(btn.closest('.folder-item').dataset.id);
                    if(confirm('Are you sure you want to delete this folder and all its contents?')) {
                        await deleteFolder(folderId);
                    }
                });
            });
        };

        const deleteFolder = async (folderId) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(['folders', 'files'], 'readwrite');
                
                // Delete folder
                const folderStore = transaction.objectStore('folders');
                folderStore.delete(folderId);
                
                // Delete related files
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
                        document.getElementById('noFolderSelected').style.display = 'block';
                        document.getElementById('dataTable').style.display = 'none';
                    }
                    loadFolders();
                    resolve();
                };
                
                transaction.onerror = (e) => {
                    showError('Error deleting folder: ' + e.target.error);
                    reject(e.target.error);
                };
            });
        };

        // File Functions
        const countFilesInFolder = (folderId) => {
            return new Promise((resolve) => {
                const transaction = db.transaction(['files'], 'readonly');
                const store = transaction.objectStore('files');
                const index = store.index('folderId');
                const request = index.count(folderId);
                
                request.onsuccess = (e) => resolve(e.target.result);
                request.onerror = (e) => {
                    console.error('Error counting files:', e.target.error);
                    resolve(0);
                };
            });
        };

        const loadFiles = async (folderId) => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(['files'], 'readonly');
                const store = transaction.objectStore('files');
                const index = store.index('folderId');
                const request = index.getAll(folderId);
                
                request.onsuccess = (e) => {
                    const files = e.target.result;
                    if(files.length > 0) {
                        displayData(files[files.length-1].data);
                    } else {
                        document.getElementById('excelTable').style.display = 'none';
                    }
                    resolve(files);
                };
                
                request.onerror = (e) => {
                    showError('Error loading files: ' + e.target.error);
                    reject(e.target.error);
                };
            });
        };

        const saveFile = async (fileData, folderId) => {
            return new Promise((resolve, reject) => {
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
                    showSuccess('File uploaded successfully!');
                    resolve();
                };
                
                request.onerror = (e) => {
                    showError('Error saving file: ' + e.target.error);
                    reject(e.target.error);
                };
            });
        };

        // Data Display
        function displayData(data) {
            const table = document.getElementById('excelTable');
            const thead = table.querySelector('thead');
            const tbody = table.querySelector('tbody');
            
            thead.innerHTML = '';
            tbody.innerHTML = '';
            
            if (!data || data.length === 0) {
                showError('No data found in the Excel file');
                return;
            }
            
            // Create headers
            const headerRow = document.createElement('tr');
            if (data[0]) {
                data[0].forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText || 'Column';
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
            }
            
            // Create body rows
            for(let i = 1; i < data.length; i++) {
                const tr = document.createElement('tr');
                let searchString = '';
                
                if (data[i]) {
                    data[i].forEach(cellData => {
                        const td = document.createElement('td');
                        td.textContent = cellData !== undefined ? cellData : '';
                        searchString += (cellData !== undefined ? cellData.toString().toLowerCase() : '') + ' ';
                        tr.appendChild(td);
                    });
                    
                    tr.setAttribute('data-search', searchString.trim());
                    tbody.appendChild(tr);
                }
            }
            
            table.style.display = 'table';
            document.getElementById('dataTable').style.display = 'block';
        }

        // UI Functions
        function showError(message) {
            const errorDiv = document.getElementById('uploadError');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            document.getElementById('uploadSuccess').style.display = 'none';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }

        function hideError() {
            document.getElementById('uploadError').style.display = 'none';
        }

        function showSuccess(message) {
            const successDiv = document.getElementById('uploadSuccess');
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            document.getElementById('uploadError').style.display = 'none';
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 3000);
        }

        // Event Listeners
        document.getElementById('newFolderBtn').addEventListener('click', () => {
            new bootstrap.Modal(document.getElementById('folderModal')).show();
        });

        document.getElementById('saveFolderBtn').addEventListener('click', () => {
            const name = document.getElementById('folderName').value.trim();
            if (name) {
                createFolder(name);
            } else {
                showError('Please enter a folder name');
            }
        });

        // Enhanced file upload with drag and drop
        const fileInputLabel = document.getElementById('fileInputLabel');
        const fileInput = document.getElementById('excelFile');
        
        fileInputLabel.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileInputLabel.classList.add('dragover');
        });
        
        fileInputLabel.addEventListener('dragleave', () => {
            fileInputLabel.classList.remove('dragover');
        });
        
        fileInputLabel.addEventListener('drop', (e) => {
            e.preventDefault();
            fileInputLabel.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                const event = new Event('change');
                fileInput.dispatchEvent(event);
            }
        });
        
        fileInput.addEventListener('change', async function(e) {
            if(!activeFolderId) {
                showError('Please select a folder first');
                return;
            }
            
            const file = e.target.files[0];
            
            if (!file) {
                showError('No file selected');
                return;
            }
            
            // Validate file size (max 5MB)
            if(file.size > 5 * 1024 * 1024) {
                showError('File size too large (max 5MB)');
                return;
            }
            
            // Validate file extension
            const validExtensions = ['.xlsx', '.xls'];
            const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if(!validExtensions.includes(fileExt)) {
                showError('Invalid file type. Please upload .xlsx or .xls files');
                return;
            }
            
            const reader = new FileReader();
            
            reader.onloadstart = () => {
                document.getElementById('uploadProgress').style.width = '0%';
                fileInput.disabled = true;
                fileInputLabel.style.opacity = '0.7';
                hideError();
            };
            
            reader.onprogress = (e) => {
                if(e.lengthComputable) {
                    const percentLoaded = Math.round((e.loaded / e.total) * 100);
                    document.getElementById('uploadProgress').style.width = `${percentLoaded}%`;
                }
            };
            
            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    if(!workbook.SheetNames || workbook.SheetNames.length === 0) {
                        throw new Error('No sheets found in the Excel file');
                    }
                    
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                    
                    if(jsonData.length === 0) {
                        throw new Error('No data found in the first sheet');
                    }
                    
                    await saveFile({
                        fileName: file.name,
                        data: jsonData
                    }, activeFolderId);
                    
                    // Reset progress bar
                    document.getElementById('uploadProgress').style.width = '0%';
                } catch (error) {
                    showError(`Error processing file: ${error.message}`);
                    console.error('File processing error:', error);
                } finally {
                    fileInput.disabled = false;
                    fileInputLabel.style.opacity = '1';
                    fileInput.value = '';
                }
            };
            
            reader.onerror = () => {
                showError('Error reading file. Please try again.');
                fileInput.disabled = false;
                fileInputLabel.style.opacity = '1';
            };
            
            try {
                reader.readAsArrayBuffer(file);
            } catch (error) {
                showError('Error loading file: ' + error.message);
                fileInput.disabled = false;
                fileInputLabel.style.opacity = '1';
            }
        });

        // Search Functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#excelTable tbody tr');
            
            rows.forEach(row => {
                const rowText = row.getAttribute('data-search');
                row.style.display = rowText.includes(searchTerm) ? '' : 'none';
            });
        });

        // Close Folder
        document.getElementById('closeFolderBtn').addEventListener('click', () => {
            activeFolderId = null;
            document.getElementById('excelTable').style.display = 'none';
            document.getElementById('searchInput').value = '';
            document.getElementById('noFolderSelected').style.display = 'block';
            document.getElementById('dataTable').style.display = 'none';
            loadFolders();
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            initDB();
            document.getElementById('noFolderSelected').style.display = 'block';
        });
    </script>
</body>
</html>






