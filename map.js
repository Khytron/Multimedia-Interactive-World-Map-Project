/**
 * Interactive World Map: Culture & History
 * Map Module - SVG World Map Generation and Rendering
 */

// Current map state
let currentMapView = 'world';
let mapTransform = { scale: 1, x: 0, y: 0 };

// Pan/drag state
let isPanning = false;
let hasDragged = false;
let panStart = { x: 0, y: 0 };
let viewBoxStart = { x: 0, y: 0 };

// World map with 7 major regions only
const mapPaths = {
    // North America
    northAmerica: {
        path: `M 55 45 L 85 38 L 120 35 L 160 38 L 200 45 L 235 60 L 260 85 
               L 275 115 L 280 150 L 275 185 L 260 215 L 235 240 L 205 260 
               L 175 272 L 145 278 L 120 280 L 100 275 L 85 265 L 70 250 
               L 55 230 L 42 205 L 35 175 L 32 145 L 35 115 L 42 85 L 50 60 Z
               M 25 55 L 50 48 L 75 52 L 90 65 L 85 82 L 65 90 L 42 85 L 28 72 Z`,
        name: 'North America',
        class: 'north-america'
    },
    
    // South America
    southAmerica: {
        path: `M 200 290 L 235 285 L 265 295 L 290 320 L 310 355 L 320 400 
               L 318 450 L 305 500 L 280 545 L 250 575 L 220 590 L 190 585 
               L 165 565 L 150 530 L 145 485 L 150 435 L 162 385 L 178 340 
               L 192 305 Z`,
        name: 'South America',
        class: 'south-america'
    },
    
    // Europe
    europe: {
        path: `M 430 95 L 445 88 L 465 85 L 490 82 L 515 80 L 540 85 L 560 95 
               L 570 110 L 572 130 L 565 150 L 552 165 L 535 175 L 515 182 
               L 492 188 L 470 190 L 450 185 L 435 175 L 425 160 L 420 142 
               L 418 122 L 422 105 Z
               M 400 100 L 418 95 L 425 108 L 420 125 L 408 130 L 395 122 L 395 108 Z
               M 355 70 Q 365 65 375 70 Q 378 78 370 82 Q 360 85 355 78 Q 352 74 355 70 Z`, /* Refined Iceland */
        name: 'Europe',
        class: 'europe'
    },
    
    // Africa  
    africa: {
        path: `M 420 200 L 460 195 L 500 198 L 535 210 L 560 235 L 572 270 
               L 575 310 L 570 355 L 558 400 L 540 440 L 515 475 L 485 500 
               L 450 512 L 415 510 L 385 495 L 362 470 L 350 435 L 345 395 
               L 348 350 L 358 305 L 375 265 L 395 230 L 410 208 Z
               M 565 435 Q 575 430 580 440 Q 578 460 570 465 Q 560 460 562 445 Z`, /* Refined Madagascar */
        name: 'Africa',
        class: 'africa'
    },
    
    // Asia (includes Middle East and Southeast Asia)
    asia: {
        path: `M 570 45 L 630 40 L 700 42 L 780 48 L 860 58 L 930 72 L 985 92 
               Q 1010 100 1025 110 Q 1035 130 1025 155 /* Fixed "stick" - smoother Kamchatka */
               L 1018 190 L 990 220 L 950 245 L 905 265 
               L 855 280 L 800 290 L 745 295 L 695 292 
               Q 675 300 670 330 L 660 340 L 650 320 /* Refined Indochina/Malay Peninsula */
               L 625 260 
               L 610 230 L 605 195 L 608 160 L 618 125 L 635 95 L 660 70 
               L 615 60 L 580 55 Z
               M 940 135 L 960 128 L 975 140 L 978 165 L 970 188 L 955 198 
               L 942 190 L 938 165 L 940 145 Z
               M 545 170 L 580 165 L 615 175 L 645 195 L 665 225 L 670 260 
               L 660 295 L 640 320 L 610 335 L 575 340 L 545 332 L 525 310 
               L 518 280 L 520 245 L 530 210 L 540 185 Z
               M 855 280 L 870 295 L 875 320 L 865 350 L 850 365 
               L 830 355 L 835 325 L 845 300 L 852 285 Z
               M 665 308 Q 672 305 675 310 Q 673 320 668 322 Q 662 315 665 308 Z
               M 865 310 Q 885 305 895 320 Q 890 340 870 335 Q 855 330 865 310 Z
               M 790 315 Q 810 325 825 335 Q 815 345 795 340 Q 780 330 790 315 Z
               M 840 360 Q 870 358 890 365 Q 880 375 845 370 Q 835 365 840 360 Z
               M 910 240 Q 925 235 930 250 Q 925 270 915 265 Q 905 255 910 240 Z
               M 925 275 Q 940 270 945 285 Q 935 295 920 290 Q 915 280 925 275 Z`,
        name: 'Asia',
        class: 'asia'
    },
    
    // Oceania (Australia + surrounding)
    oceania: {
        path: `M 860 400 Q 920 390 960 410 Q 975 430 970 470 Q 960 520 920 530 Q 880 540 850 510 Q 830 460 840 430 Q 850 410 860 400 Z
               M 890 395 Q 900 410 890 420 Q 880 410 890 395 Z
               M 940 360 Q 980 355 1000 370 Q 990 385 950 380 Q 930 370 940 360 Z
               M 1040 530 Q 1055 520 1065 545 Q 1050 560 1035 550 Q 1030 540 1040 530 Z /* NZ North (Taller, West) */
               M 1025 560 Q 1050 555 1060 585 Q 1040 600 1020 590 Q 1015 575 1025 560 Z /* NZ South (Taller, West) */`,
        name: 'Oceania',
        class: 'australia'
    }
};

// No sub-regions needed - clean 7-region map

// Ocean and water features
const waterFeatures = {
    atlanticOcean: {
        path: `M 0 0 L 330 0 L 320 150 L 280 300 L 200 400 L 150 550 L 0 600 Z`,
        name: 'Atlantic Ocean'
    },
    pacificOcean: {
        path: `M 950 0 L 1200 0 L 1200 600 L 1000 600 L 1050 400 L 1000 200 L 970 100 Z`,
        name: 'Pacific Ocean'
    },
    indianOcean: {
        path: `M 500 300 L 600 280 L 750 320 L 800 400 L 750 500 L 600 520 L 500 480 L 480 400 Z`,
        name: 'Indian Ocean'
    },
    arcticOcean: {
        path: `M 200 0 L 900 0 L 900 40 L 200 40 Z`,
        name: 'Arctic Ocean'
    },
    mediterraneanSea: {
        path: `M 360 170 L 440 165 L 480 175 L 470 195 L 400 200 L 360 190 Z`,
        name: 'Mediterranean Sea'
    }
};

/**
 * Initialize the SVG world map
 */
function initializeMap() {
    const svg = document.getElementById('world-map');
    if (!svg) return;
    
    // Clear existing content
    svg.innerHTML = '';
    
    // Create defs for gradients and patterns
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Ocean gradient
    const oceanGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    oceanGradient.setAttribute('id', 'oceanGradient');
    oceanGradient.setAttribute('x1', '0%');
    oceanGradient.setAttribute('y1', '0%');
    oceanGradient.setAttribute('x2', '0%');
    oceanGradient.setAttribute('y2', '100%');
    oceanGradient.innerHTML = `
        <stop offset="0%" style="stop-color:#1A5276"/>
        <stop offset="50%" style="stop-color:#2980B9"/>
        <stop offset="100%" style="stop-color:#1A5276"/>
    `;
    defs.appendChild(oceanGradient);
    
    // Parchment pattern for land
    const parchmentPattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    parchmentPattern.setAttribute('id', 'parchmentPattern');
    parchmentPattern.setAttribute('patternUnits', 'userSpaceOnUse');
    parchmentPattern.setAttribute('width', '100');
    parchmentPattern.setAttribute('height', '100');
    parchmentPattern.innerHTML = `
        <rect width="100" height="100" fill="#E8D5B7"/>
        <circle cx="25" cy="25" r="1" fill="#D4C4B5" opacity="0.5"/>
        <circle cx="75" cy="75" r="1" fill="#D4C4B5" opacity="0.5"/>
        <circle cx="50" cy="50" r="1.5" fill="#D4C4B5" opacity="0.3"/>
    `;
    defs.appendChild(parchmentPattern);
    
    svg.appendChild(defs);
    
    // Create ocean background (transparent to let CSS background show through)
    const oceanBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    oceanBackground.setAttribute('x', '0');
    oceanBackground.setAttribute('y', '0');
    oceanBackground.setAttribute('width', '1200');
    oceanBackground.setAttribute('height', '600');
    oceanBackground.setAttribute('fill', 'transparent'); // Changed from url(#oceanGradient)
    oceanBackground.setAttribute('class', 'water');
    svg.appendChild(oceanBackground);
    
    // Create groups for layering
    const landGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    landGroup.setAttribute('id', 'land-group');
    
    const regionsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    regionsGroup.setAttribute('id', 'regions-group');
    
    const labelsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelsGroup.setAttribute('id', 'labels-group');
    
    // Draw main regions
    Object.keys(mapPaths).forEach(key => {
        const region = mapPaths[key];
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', region.path);
        path.setAttribute('class', `region ${region.class}`);
        path.setAttribute('data-region', region.class);
        path.setAttribute('id', `region-${key}`);
        
        // Add hover and click events
        path.addEventListener('mouseenter', handleRegionHover);
        path.addEventListener('mouseleave', handleRegionLeave);
        path.addEventListener('click', handleRegionClick);
        
        regionsGroup.appendChild(path);
        
        // Add region label
        const label = createRegionLabel(region);
        if (label) {
            labelsGroup.appendChild(label);
        }
    });
    
    svg.appendChild(landGroup);
    svg.appendChild(regionsGroup);
    svg.appendChild(labelsGroup);
    
    // Create markers group inside SVG for proper scaling
    const markersGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    markersGroup.setAttribute('id', 'svg-markers-group');
    svg.appendChild(markersGroup);
    
    // Initialize pan/drag functionality
    initPanDrag(svg);
    
    // Initialize wheel zoom
    initWheelZoom(svg);
}

/**
 * Initialize wheel zoom functionality
 */
function initWheelZoom(svg) {
    svg.addEventListener('wheel', (e) => {
        // Prevent default page scroll
        e.preventDefault();
        
        // Determine zoom direction (negative deltaY is zooming in)
        const direction = e.deltaY < 0 ? 1 : -1;
        
        // Dispatch custom event for app.js to handle state update
        const event = new CustomEvent('mapZoom', {
            detail: { direction: direction }
        });
        document.dispatchEvent(event);
    }, { passive: false });
}

/**
 * Create label for a region
 */
function createRegionLabel(region) {
    // Labels for all 7 major regions
    const labelPositions = {
        'north-america': { x: 160, y: 160 },
        'south-america': { x: 240, y: 440 },
        'europe': { x: 490, y: 140 },
        'asia': { x: 780, y: 180 },
        'africa': { x: 470, y: 360 },
        'australia': { x: 900, y: 480 }
    };
    
    const pos = labelPositions[region.class];
    if (!pos) return null;
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.x);
    text.setAttribute('y', pos.y);
    text.setAttribute('class', 'region-label');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-family', 'Cinzel, serif');
    text.setAttribute('font-size', '18');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#3E2723');
    text.setAttribute('stroke', '#F5F0E8');
    text.setAttribute('stroke-width', '3');
    text.setAttribute('paint-order', 'stroke');
    text.setAttribute('pointer-events', 'none');
    text.textContent = region.name;
    
    return text;
}





/**
 * Handle region hover
 */
function handleRegionHover(e) {
    const region = e.target;
    region.style.filter = 'brightness(1.1) drop-shadow(0 0 10px rgba(201, 162, 39, 0.5))';
}

/**
 * Handle region leave
 */
function handleRegionLeave(e) {
    const region = e.target;
    region.style.filter = '';
}

/**
 * Handle region click
 */
function handleRegionClick(e) {
    // Don't trigger click if user was dragging
    if (hasDragged) {
        return;
    }
    
    const regionClass = e.target.getAttribute('data-region');
    if (regionClass && regionClass !== 'other') {
        // Trigger custom event for app.js to handle
        const event = new CustomEvent('regionSelected', {
            detail: { region: regionClass }
        });
        document.dispatchEvent(event);
    }
}

/**
 * Highlight a specific region
 */
function highlightRegion(regionId) {
    // Remove previous highlights
    document.querySelectorAll('.region.active').forEach(r => {
        r.classList.remove('active');
    });
    
    // Add highlight to selected region
    const regionElement = document.querySelector(`.region.${regionId}`);
    if (regionElement) {
        regionElement.classList.add('active');
    }
}

/**
 * Reset all region highlights
 */
function resetRegionHighlights() {
    document.querySelectorAll('.region.active').forEach(r => {
        r.classList.remove('active');
    });
}

/**
 * Zoom to a specific region using viewBox
 */
function zoomToRegion(regionId, viewBox) {
    const svg = document.getElementById('world-map');
    if (!svg || !viewBox) return;
    
    currentMapView = regionId;
    const { x, y, width, height } = viewBox;
    
    // Animate viewBox change
    svg.style.transition = 'none';
    svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
    
    // Store transform for marker positioning
    mapTransform = { 
        scale: 1200 / width, 
        x: x, 
        y: y,
        width: width,
        height: height
    };
}

/**
 * Reset map to world view
 */
function resetMapView() {
    const svg = document.getElementById('world-map');
    if (!svg) return;
    
    currentMapView = 'world';
    svg.setAttribute('viewBox', '0 0 1200 600');
    mapTransform = { scale: 1, x: 0, y: 0, width: 1200, height: 600 };
    resetRegionHighlights();
}

/**
 * Apply zoom level to map (for zoom buttons)
 */
function applyZoom(level) {
    // Zoom buttons are disabled in region view
    if (currentMapView !== 'world') return;
    
    const svg = document.getElementById('world-map');
    if (!svg) return;
    
    const centerX = 600;
    const centerY = 300;
    const newWidth = 1200 / level;
    const newHeight = 600 / level;
    const newX = centerX - newWidth / 2;
    const newY = centerY - newHeight / 2;
    
    svg.setAttribute('viewBox', `${Math.max(0, newX)} ${Math.max(0, newY)} ${newWidth} ${newHeight}`);
    mapTransform = { scale: level, x: Math.max(0, newX), y: Math.max(0, newY), width: newWidth, height: newHeight };
}

/**
 * Get current map transform for marker positioning
 */
function getMapTransform() {
    return mapTransform;
}

/**
 * Get current map view
 */
function getCurrentMapView() {
    return currentMapView;
}

/**
 * Initialize pan/drag functionality for the map
 */
function initPanDrag(svg) {
    svg.style.cursor = 'grab';
    
    // Use document-level listeners for reliable tracking
    svg.addEventListener('mousedown', handlePanStart);
    document.addEventListener('mousemove', handlePanMove);
    document.addEventListener('mouseup', handlePanEnd);
    
    // Touch support for mobile
    svg.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handlePanEnd);
}

/**
 * Handle pan start (mousedown)
 */
function handlePanStart(e) {
    // Only left click (button 0)
    if (e.button !== 0) return;
    
    // Don't pan if clicking on a marker
    if (e.target.closest('.svg-marker')) {
        return;
    }
    
    e.preventDefault();
    isPanning = true;
    hasDragged = false;
    
    const svg = document.getElementById('world-map');
    svg.style.cursor = 'grabbing';
    
    panStart = { x: e.clientX, y: e.clientY };
    
    // Get current viewBox
    const viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
    viewBoxStart = { x: viewBox[0], y: viewBox[1], width: viewBox[2], height: viewBox[3] };
}

/**
 * Handle pan move (mousemove)
 */
function handlePanMove(e) {
    if (!isPanning) return;
    
    e.preventDefault();
    
    // Check if user moved enough to count as a drag
    const moveThreshold = 5;
    if (Math.abs(e.clientX - panStart.x) > moveThreshold || 
        Math.abs(e.clientY - panStart.y) > moveThreshold) {
        hasDragged = true;
    }
    
    const svg = document.getElementById('world-map');
    const svgRect = svg.getBoundingClientRect();
    
    // Calculate movement in SVG coordinates
    const scaleX = viewBoxStart.width / svgRect.width;
    const scaleY = viewBoxStart.height / svgRect.height;
    
    const dx = (panStart.x - e.clientX) * scaleX;
    const dy = (panStart.y - e.clientY) * scaleY;
    
    // Calculate new viewBox position with bounds
    let newX = viewBoxStart.x + dx;
    let newY = viewBoxStart.y + dy;
    
    // Clamp to prevent panning outside the map (allow some padding)
    const maxX = Math.max(0, 1200 - viewBoxStart.width);
    const maxY = Math.max(0, 600 - viewBoxStart.height);
    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));
    
    svg.setAttribute('viewBox', `${newX} ${newY} ${viewBoxStart.width} ${viewBoxStart.height}`);
    
    // Update mapTransform for marker positioning
    mapTransform.x = newX;
    mapTransform.y = newY;
}

/**
 * Handle pan end (mouseup/mouseleave)
 */
function handlePanEnd() {
    if (!isPanning) return;
    
    isPanning = false;
    const svg = document.getElementById('world-map');
    if (svg) {
        svg.style.cursor = 'grab';
    }
}

/**
 * Handle touch start for mobile
 */
function handleTouchStart(e) {
    if (e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        // Create a fake mouse event with button 0 (left click)
        handlePanStart({ 
            button: 0,
            clientX: touch.clientX, 
            clientY: touch.clientY,
            target: e.target,
            preventDefault: () => {}
        });
    }
}

/**
 * Handle touch move for mobile
 */
function handleTouchMove(e) {
    if (e.touches.length === 1 && isPanning) {
        e.preventDefault();
        const touch = e.touches[0];
        handlePanMove({ 
            clientX: touch.clientX, 
            clientY: touch.clientY,
            preventDefault: () => {}
        });
    }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMap,
        highlightRegion,
        resetRegionHighlights,
        zoomToRegion,
        resetMapView,
        applyZoom,
        getMapTransform,
        getCurrentMapView
    };
}
