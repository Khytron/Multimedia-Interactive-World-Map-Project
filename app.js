/**
 * Interactive World Map: Culture & History
 * Main Application Module
 */

// Application State
const appState = {
    currentView: 'world',
    currentYear: 1500,
    currentEra: 'medieval',
    zoomLevel: 1,
    selectedMarker: null,
    markersVisible: true,
    panelOpen: false,
    modalOpen: false,
    currentEventIndex: 0,
    filteredEvents: []
};

// DOM Elements cache
let elements = {};

/**
 * Initialize the application
 */
function initApp() {
    // Cache DOM elements
    cacheElements();
    
    // Initialize map
    initializeMap();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize timeline
    initTimeline();
    
    // Render initial markers
    renderMarkers();
    
    // Hide loading screen after initialization
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 2500);
    
    console.log('Interactive World Map initialized successfully!');
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    elements = {
        // Navigation
        navButtons: document.querySelectorAll('.nav-btn'),
        
        // Timeline
        yearSlider: document.getElementById('year-slider'),
        currentYearDisplay: document.getElementById('current-year'),
        eraLabel: document.getElementById('era-label'),
        timelineMarks: document.querySelectorAll('.timeline-marks span'),
        
        // Map controls
        zoomIn: document.getElementById('zoom-in'),
        zoomOut: document.getElementById('zoom-out'),
        resetView: document.getElementById('reset-view'),
        
        // Panels
        infoPanel: document.getElementById('info-panel'),
        panelTitle: document.getElementById('panel-title'),
        panelImage: document.getElementById('panel-image'),
        panelDescription: document.getElementById('panel-description'),
        panelDetails: document.getElementById('panel-details'),
        closePanel: document.getElementById('close-panel'),
        
        // Modal
        modalOverlay: document.getElementById('modal-overlay'),
        modalTitle: document.getElementById('modal-title'),
        modalEra: document.getElementById('modal-era'),
        modalMedia: document.getElementById('modal-media'),
        modalText: document.getElementById('modal-text'),
        closeModal: document.getElementById('close-modal'),
        modalPrev: document.getElementById('modal-prev'),
        modalNext: document.getElementById('modal-next'),
        
        // About
        infoBtn: document.getElementById('info-btn'),
        aboutModal: document.getElementById('about-modal'),
        closeAbout: document.getElementById('close-about'),
        
        // Markers container
        markersContainer: document.getElementById('markers-container')
    };
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Navigation buttons
    elements.navButtons.forEach(btn => {
        btn.addEventListener('click', () => handleNavigation(btn.dataset.view));
    });
    
    // Timeline slider
    elements.yearSlider.addEventListener('input', handleYearChange);
    elements.yearSlider.addEventListener('change', handleYearChange);
    
    // Timeline marks (quick navigation)
    elements.timelineMarks.forEach(mark => {
        mark.addEventListener('click', () => {
            const year = parseInt(mark.dataset.year);
            elements.yearSlider.value = year;
            handleYearChange({ target: { value: year } });
        });
    });
    
    // Map controls
    elements.zoomIn.addEventListener('click', () => handleZoom(1));
    elements.zoomOut.addEventListener('click', () => handleZoom(-1));
    elements.resetView.addEventListener('click', handleResetView);
    
    // Panel close
    elements.closePanel.addEventListener('click', closeInfoPanel);
    
    // Modal controls
    elements.closeModal.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) closeModal();
    });
    elements.modalPrev.addEventListener('click', navigateModal(-1));
    elements.modalNext.addEventListener('click', navigateModal(1));
    
    // About modal
    elements.infoBtn.addEventListener('click', () => {
        elements.aboutModal.classList.remove('hidden');
    });
    elements.closeAbout.addEventListener('click', () => {
        elements.aboutModal.classList.add('hidden');
    });
    elements.aboutModal.addEventListener('click', (e) => {
        if (e.target === elements.aboutModal) {
            elements.aboutModal.classList.add('hidden');
        }
    });
    
    // Custom region selection event from map.js
    document.addEventListener('regionSelected', (e) => {
        handleNavigation(e.detail.region);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

/**
 * Handle navigation between regions
 */
function handleNavigation(view) {
    appState.currentView = view;
    
    // Update active nav button
    elements.navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    if (view === 'world') {
        resetMapView();
        closeInfoPanel();
    } else {
        const regionData = regionsData[view];
        if (regionData) {
            highlightRegion(view);
            zoomToRegion(view, regionData.viewBox);
            showInfoPanel(regionData);
        }
    }
    
    // Update markers for current view
    renderMarkers();
}

/**
 * Handle timeline year change
 */
function handleYearChange(e) {
    const year = parseInt(e.target.value);
    appState.currentYear = year;
    
    // Update year display
    const yearText = year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
    elements.currentYearDisplay.textContent = yearText;
    
    // Update era
    const era = getEra(year);
    appState.currentEra = era.id;
    elements.eraLabel.textContent = era.name;
    
    // Update markers based on year
    renderMarkers();
    
    // Update map styling based on era
    updateMapStyling(era.id);
}

/**
 * Get era based on year
 */
function getEra(year) {
    if (year < -500) return { id: 'ancient', name: 'Ancient Era' };
    if (year < 500) return { id: 'classical', name: 'Classical Era' };
    if (year < 1500) return { id: 'medieval', name: 'Medieval Era' };
    if (year < 1800) return { id: 'earlyModern', name: 'Early Modern Era' };
    return { id: 'modern', name: 'Modern Era' };
}

/**
 * Initialize timeline with current year
 */
function initTimeline() {
    handleYearChange({ target: { value: appState.currentYear } });
}

/**
 * Render cultural markers on the map
 */
function renderMarkers() {
    // Get SVG markers group
    const svgMarkersGroup = document.getElementById('svg-markers-group');
    if (!svgMarkersGroup) return;
    
    // Clear existing markers
    svgMarkersGroup.innerHTML = '';
    
    // Get events for current era
    const era = getEra(appState.currentYear);
    const eraData = historicalEvents[era.id];
    
    if (!eraData) return;
    
    // Get all events, filter by region if not in world view
    let events = eraData.events;
    if (appState.currentView !== 'world') {
        events = events.filter(event => event.region === appState.currentView);
    }
    
    // Filter events that exist during current year
    events = events.filter(event => {
        return Math.abs(event.year - appState.currentYear) <= 300;
    });
    
    appState.filteredEvents = events;
    
    // Create SVG markers
    events.forEach((event, index) => {
        const marker = createSVGMarker(event, index);
        svgMarkersGroup.appendChild(marker);
    });
}

/**
 * Create an SVG marker element that stays with the map
 */
function createSVGMarker(event, index) {
    // Convert percentage to SVG coordinates (1200x600 viewBox)
    const svgX = (event.position.x / 100) * 1200;
    const svgY = (event.position.y / 100) * 600;
    
    // Create marker group
    const markerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    markerGroup.setAttribute('class', 'svg-marker');
    markerGroup.setAttribute('transform', `translate(${svgX}, ${svgY})`);
    markerGroup.setAttribute('data-event-id', event.id);
    markerGroup.setAttribute('data-index', index);
    markerGroup.style.cursor = 'pointer';
    
    // Marker circle background
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '15');
    circle.setAttribute('fill', '#F4E4BC');
    circle.setAttribute('stroke', '#C9A227');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('class', 'marker-circle');
    markerGroup.appendChild(circle);
    
    // Icon text
    const iconText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    iconText.setAttribute('text-anchor', 'middle');
    iconText.setAttribute('dominant-baseline', 'central');
    iconText.setAttribute('font-size', '12');
    iconText.textContent = event.icon;
    markerGroup.appendChild(iconText);
    
    // Tooltip background
    const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tooltipBg.setAttribute('x', -55);
    tooltipBg.setAttribute('y', -38);
    tooltipBg.setAttribute('width', '110');
    tooltipBg.setAttribute('height', '18');
    tooltipBg.setAttribute('rx', '3');
    tooltipBg.setAttribute('fill', '#3E2723');
    tooltipBg.setAttribute('class', 'marker-tooltip-bg');
    tooltipBg.setAttribute('opacity', '0');
    markerGroup.appendChild(tooltipBg);
    
    // Tooltip text
    const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    tooltipText.setAttribute('x', '0');
    tooltipText.setAttribute('y', '-27');
    tooltipText.setAttribute('text-anchor', 'middle');
    tooltipText.setAttribute('font-size', '9');
    tooltipText.setAttribute('fill', '#F5F0E8');
    tooltipText.setAttribute('class', 'marker-tooltip-text');
    tooltipText.setAttribute('opacity', '0');
    tooltipText.textContent = event.title.length > 16 ? event.title.substring(0, 14) + '...' : event.title;
    markerGroup.appendChild(tooltipText);
    
    // Simple hover - just show tooltip
    markerGroup.addEventListener('mouseenter', () => {
        tooltipBg.setAttribute('opacity', '0.9');
        tooltipText.setAttribute('opacity', '1');
    });
    
    markerGroup.addEventListener('mouseleave', () => {
        tooltipBg.setAttribute('opacity', '0');
        tooltipText.setAttribute('opacity', '0');
    });
    
    // Click handler
    markerGroup.addEventListener('click', () => openEventModal(event, index));
    
    return markerGroup;
}

/**
 * Show info panel with region data
 */
function showInfoPanel(regionData) {
    appState.panelOpen = true;
    
    elements.panelTitle.textContent = regionData.name;
    elements.panelImage.innerHTML = `<span style="font-size: 4rem;">${regionData.icon}</span>`;
    elements.panelDescription.textContent = regionData.description;
    
    // Build key facts list
    let factsHTML = '<h3>Key Facts</h3><ul>';
    regionData.keyFacts.forEach(fact => {
        factsHTML += `<li><span class="detail-icon">${fact.icon}</span> ${fact.text}</li>`;
    });
    factsHTML += '</ul>';
    
    // Add cultural achievements
    const achievements = culturalAchievements[regionData.id];
    if (achievements) {
        factsHTML += '<h3 style="margin-top: 20px;">Cultural Achievements</h3><ul>';
        achievements.forEach(achievement => {
            factsHTML += `<li><span class="detail-icon">${achievement.icon}</span> <strong>${achievement.name}</strong> - ${achievement.description}</li>`;
        });
        factsHTML += '</ul>';
    }
    
    elements.panelDetails.innerHTML = factsHTML;
    
    elements.infoPanel.classList.remove('hidden');
}

/**
 * Close info panel
 */
function closeInfoPanel() {
    appState.panelOpen = false;
    elements.infoPanel.classList.add('hidden');
}

/**
 * Open event modal with detailed information
 */
function openEventModal(event, index) {
    appState.modalOpen = true;
    appState.currentEventIndex = index;
    
    // Set modal content
    elements.modalTitle.textContent = event.title;
    
    const yearText = event.year < 0 ? `${Math.abs(event.year)} BCE` : `${event.year} CE`;
    elements.modalEra.textContent = yearText;
    
    // Set media (image from images folder, fallback to icon)
    const imageName = event.title.toLowerCase().replace(/['']/g, "'").replace(/\s+/g, '-');
    const imagePath = `images/${imageName}.png`;
    elements.modalMedia.innerHTML = `<img src="${imagePath}" alt="${event.title}" onerror="this.parentElement.innerHTML='<span>${event.icon}</span>';">`;
    
    // Set text content
    let textHTML = `
        <p>${event.description}</p>
        <h3>Historical Details</h3>
        <p>${event.details}</p>
    `;
    
    if (event.keyFigures && event.keyFigures.length > 0) {
        textHTML += `<h3>Key Figures</h3><p>${event.keyFigures.join(', ')}</p>`;
    }
    
    if (event.culturalSignificance) {
        textHTML += `<h3>Cultural Significance</h3><p>${event.culturalSignificance}</p>`;
    }
    
    elements.modalText.innerHTML = textHTML;
    
    // Update navigation buttons
    updateModalNavigation();
    
    elements.modalOverlay.classList.remove('hidden');
}

/**
 * Close modal
 */
function closeModal() {
    appState.modalOpen = false;
    elements.modalOverlay.classList.add('hidden');
}

/**
 * Navigate through events in modal
 */
function navigateModal(direction) {
    return () => {
        const newIndex = appState.currentEventIndex + direction;
        if (newIndex >= 0 && newIndex < appState.filteredEvents.length) {
            appState.currentEventIndex = newIndex;
            openEventModal(appState.filteredEvents[newIndex], newIndex);
        }
    };
}

/**
 * Update modal navigation buttons state
 */
function updateModalNavigation() {
    elements.modalPrev.disabled = appState.currentEventIndex === 0;
    elements.modalNext.disabled = appState.currentEventIndex >= appState.filteredEvents.length - 1;
}

/**
 * Handle zoom in/out
 */
function handleZoom(direction) {
    const step = 0.25;
    const minZoom = 0.5;
    const maxZoom = 3;
    
    appState.zoomLevel += direction * step;
    appState.zoomLevel = Math.max(minZoom, Math.min(maxZoom, appState.zoomLevel));
    
    applyZoom(appState.zoomLevel);
}

/**
 * Handle reset view
 */
function handleResetView() {
    appState.zoomLevel = 1;
    appState.currentView = 'world';
    
    // Reset nav buttons
    elements.navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === 'world');
    });
    
    resetMapView();
    closeInfoPanel();
    renderMarkers();
}

/**
 * Update map styling based on era
 */
function updateMapStyling(eraId) {
    const mapContainer = document.getElementById('map-container');
    
    // Remove existing era classes
    mapContainer.classList.remove('era-ancient', 'era-classical', 'era-medieval', 'era-earlyModern', 'era-modern');
    
    // Add new era class
    mapContainer.classList.add(`era-${eraId}`);
    
    // Apply subtle visual changes based on era
    const eraStyles = {
        ancient: { filter: 'sepia(20%) saturate(90%)' },
        classical: { filter: 'sepia(15%) saturate(95%)' },
        medieval: { filter: 'sepia(10%) contrast(105%)' },
        earlyModern: { filter: 'saturate(105%)' },
        modern: { filter: 'none' }
    };
    
    const svg = document.getElementById('world-map');
    if (svg && eraStyles[eraId]) {
        svg.style.filter = eraStyles[eraId].filter;
    }
}

/**
 * Handle keyboard navigation
 */
function handleKeyboard(e) {
    // Close modals with Escape
    if (e.key === 'Escape') {
        if (appState.modalOpen) {
            closeModal();
        } else if (appState.panelOpen) {
            closeInfoPanel();
        }
        if (!elements.aboutModal.classList.contains('hidden')) {
            elements.aboutModal.classList.add('hidden');
        }
    }
    
    // Modal navigation with arrow keys
    if (appState.modalOpen) {
        if (e.key === 'ArrowLeft') {
            navigateModal(-1)();
        } else if (e.key === 'ArrowRight') {
            navigateModal(1)();
        }
    }
    
    // Timeline navigation with arrow keys (when modal closed)
    if (!appState.modalOpen && !appState.panelOpen) {
        if (e.key === 'ArrowLeft') {
            elements.yearSlider.value = Math.max(-3000, parseInt(elements.yearSlider.value) - 50);
            handleYearChange({ target: elements.yearSlider });
        } else if (e.key === 'ArrowRight') {
            elements.yearSlider.value = Math.min(2025, parseInt(elements.yearSlider.value) + 50);
            handleYearChange({ target: elements.yearSlider });
        }
    }
    
    // Number keys for quick region navigation
    const regionKeys = {
        '1': 'world',
        '2': 'north-america',
        '3': 'south-america',
        '4': 'europe',
        '5': 'africa',
        '6': 'asia',
        '7': 'australia'
    };
    
    if (regionKeys[e.key] && !appState.modalOpen) {
        handleNavigation(regionKeys[e.key]);
    }
}

/**
 * Utility: Format year for display
 */
function formatYear(year) {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

/**
 * Utility: Check if year is within range
 */
function isYearInRange(year, start, end) {
    return year >= start && year <= end;
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        appState,
        initApp,
        handleNavigation,
        handleYearChange,
        formatYear
    };
}
