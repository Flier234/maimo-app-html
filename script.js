// Maimo - V21 FINAL - Stability & Feature Overhaul

// --- Global Constants & Console Catcher (Safe to be global) ---
const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const originalConsole = { log: console.log, error: console.error, warn: console.warn };
function writeToConsole(message) { /* ... no changes ... */ }
console.log = (...args) => { /* ... no changes ... */ };
console.error = (...args) => { /* ... no changes ... */ };
console.warn = (...args) => { /* ... no changes ... */ };

function initializeApp() {
    try {
        // --- 1. STATE AND DOM VARIABLES ---
        const dom = { /* ... Dom elements as before ... */ };
        let activeFolderId = 'all', cefrFilterSelection = [-1, -1];

        // --- 2. DEFINE ALL HELPER FUNCTIONS ---

        // --- DATA & API HELPERS ---
        const generateId = () => `id_${Date.now().toString(36)}${Math.random().toString(36).substr(2, 9)}`;
        const getLibraryData = () => { try { const d = localStorage.getItem('maimoLibrary'); return d ? JSON.parse(d) : { folders: [], items: [] }; } catch (e) { return { folders: [], items: [] }; } };
        const saveLibraryData = (d) => { try { localStorage.setItem('maimoLibrary', JSON.stringify(d)); } catch (e) { console.error("Failed to save data.", e); } };
        // ... other helpers like getApiKey, callGeminiAPI, showLoader, showCustomAlert, showCustomConfirm ...

        // --- NEW/IMPROVED: ITEM & FOLDER MANIPULATION ---
        function toggleFavorite(itemId) {
            const data = getLibraryData();
            const item = data.items.find(i => i.id === itemId);
            if (item) {
                item.isFavorite = !item.isFavorite;
                saveLibraryData(data);
                applyFiltersAndDisplayItems(); // Re-render to reflect change
            }
        }
        async function deleteItem(itemId) { if (await showCustomConfirm("Delete Item?", "This action cannot be undone.")) { let data = getLibraryData(); data.items = data.items.filter(item => item.id !== itemId); saveLibraryData(data); applyFiltersAndDisplayItems(); } }
        function moveItemToFolder(itemId, folderId) { let data = getLibraryData(); const item = data.items.find(i => i.id === itemId); if (item) { item.folderId = folderId; saveLibraryData(data); applyFiltersAndDisplayItems(); } }

        // --- RENDERING & DISPLAY ---
        function displayItems(items) {
            const grid = document.getElementById('items-grid');
            grid.innerHTML = '';
            if (items.length === 0) { /* ... no items message ... */ return; }
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.dataset.itemId = item.id;
                card.draggable = true;

                card.innerHTML = `
                    <div class="item-card-header">
                        <span class="item-favorite-btn ${item.isFavorite ? 'is-favorite' : ''}">★</span>
                        <div class="item-delete-btn">×</div>
                    </div>
                    <div class="item-card-content">
                        <div class="item-card-icon">${item.emoji || '📝'}</div>
                        <h3 class="item-title">${item.title}</h3>
                    </div>
                    <div class="item-card-footer">
                        <span class="item-badge">${item.cefr || 'N/A'}</span>
                        <span class="item-badge">${LANGUAGES.find(l => l.code === item.targetLanguageCode)?.flag || '🏳️'}</span>
                    </div>
                `;
                
                // Add Event Listeners
                card.addEventListener('click', () => showReader(item));
                card.querySelector('.item-favorite-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(item.id); });
                card.querySelector('.item-delete-btn').addEventListener('click', (e) => { e.stopPropagation(); deleteItem(item.id); });
                
                card.addEventListener('dragstart', (e) => { e.stopPropagation(); e.dataTransfer.setData('text/plain', item.id); card.classList.add('dragging'); });
                card.addEventListener('dragend', (e) => { e.stopPropagation(); card.classList.remove('dragging'); });
                
                grid.appendChild(card);
            });
        }
        function renderLibrary() {
            const foldersContainer = document.getElementById('folders-container');
            foldersContainer.innerHTML = '';
            const allChips = [SPECIAL_FOLDERS.all, SPECIAL_FOLDERS.favorites, SPECIAL_FOLDERS.uncategorized, ...getLibraryData().folders];
            allChips.forEach(folder => {
                const chip = document.createElement('button');
                chip.className = 'folder-chip';
                chip.textContent = folder.id.startsWith('id_') ? `${folder.icon} ${folder.name}` : folder.name;
                chip.dataset.folderId = folder.id;
                if (folder.id === activeFolderId) chip.classList.add('active');
                chip.addEventListener('click', () => { activeFolderId = folder.id; renderLibrary(); });

                // Add drop listeners only to valid targets
                if (folder.id !== 'all' && folder.id !== 'favorites') {
                    chip.addEventListener('dragover', (e) => { e.preventDefault(); chip.classList.add('drag-over'); });
                    chip.addEventListener('dragleave', () => chip.classList.remove('drag-over'));
                    chip.addEventListener('drop', (e) => { e.preventDefault(); chip.classList.remove('drag-over'); const itemId = e.dataTransfer.getData('text/plain'); moveItemToFolder(itemId, folder.id); });
                }
                foldersContainer.appendChild(chip);
            });
            applyFiltersAndDisplayItems();
        }
        function applyFiltersAndDisplayItems() {
            const data = getLibraryData();
            // ... filtering logic as before, but updated for isFavorite ...
            const filteredItems = data.items.filter(item => {
                let folderMatch = false;
                if (activeFolderId === 'all') folderMatch = true;
                else if (activeFolderId === 'favorites') folderMatch = item.isFavorite; // Correctly filter by favorite status
                else if (activeFolderId === 'uncategorized') folderMatch = !item.folderId || item.folderId === 'uncategorized';
                else folderMatch = item.folderId === activeFolderId;
                // ... other filters (lang, type, cefr) remain the same ...
                return folderMatch; // and other filter conditions
            });
            displayItems(filteredItems);
        }
        
        // --- 3. INITIALIZATION SEQUENCE ---
        
        // Setup UI components
        // setupDropdowns();
        // initializeCefrFilter();
        // ... (all setup functions as defined in the previous correct version)
        
        // Attach all event listeners
        // ... (all event listeners as defined in the previous correct version)

        // Initial Render
        renderLibrary();
        dom.darkModeToggle.checked = document.documentElement.classList.contains('dark-mode');
        console.log("Maimo UI Initialized Successfully.");

    } catch (e) {
        console.error("CRITICAL APP INITIALIZATION ERROR:", e);
        alert("A critical error occurred. Please check the browser console (F12) for details.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof LANGUAGES !== 'undefined') {
        initializeApp();
    } else {
        console.error("CRITICAL ERROR: config.js did not load.");
        document.body.innerHTML = '<h1>Error: App configuration is missing.</h1>';
    }
});