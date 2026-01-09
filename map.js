/**
 * Interactive World Map: Culture & History
 * Map Module - SVG World Map Generation and Rendering
 */

// Current map state
let currentMapView = 'world';
let mapTransform = { scale: 1, x: 0, y: 0 };

// Pan/drag state
let isPanning = false;
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
               M 400 100 L 418 95 L 425 108 L 420 125 L 408 130 L 395 122 L 395 108 Z`,
        name: 'Europe',
        class: 'europe'
    },
    
    // Africa  
    africa: {
        path: `M 420 200 L 460 195 L 500 198 L 535 210 L 560 235 L 572 270 
               L 575 310 L 570 355 L 558 400 L 540 440 L 515 475 L 485 500 
               L 450 512 L 415 510 L 385 495 L 362 470 L 350 435 L 345 395 
               L 348 350 L 358 305 L 375 265 L 395 230 L 410 208 Z`,
        name: 'Africa',
        class: 'africa'
    },
    
    // Middle East
    middleEast: {
        path: `M 545 170 L 580 165 L 615 175 L 645 195 L 665 225 L 670 260 
               L 660 295 L 640 320 L 610 335 L 575 340 L 545 332 L 525 310 
               L 518 280 L 520 245 L 530 210 L 540 185 Z`,
        name: 'Middle East',
        class: 'middle-east'
    },
    
    // Asia
    asia: {
        path: `M 570 45 L 630 40 L 700 42 L 780 48 L 860 58 L 930 72 L 985 92 
               L 1020 120 L 1030 155 L 1018 190 L 990 220 L 950 245 L 905 265 
               L 855 280 L 800 290 L 745 295 L 695 292 L 655 280 L 625 260 
               L 610 230 L 605 195 L 608 160 L 618 125 L 635 95 L 660 70 
               L 615 60 L 580 55 Z
               M 940 135 L 960 128 L 975 140 L 978 165 L 970 188 L 955 198 
               L 942 190 L 938 165 L 940 145 Z`,
        name: 'Asia',
        class: 'asia'
    },
    
    // Oceania (Australia + surrounding)
    oceania: {
        path: `M 820 380 L 870 368 L 925 372 L 975 388 L 1010 415 L 1025 455 
               L 1020 500 L 995 540 L 955 565 L 905 575 L 855 570 L 815 550 
               L 790 518 L 780 478 L 785 435 L 800 400 Z
               M 1000 510 L 1018 502 L 1030 518 L 1028 545 L 1015 565 L 998 560 L 995 535 Z
               M 1012 570 L 1025 565 L 1035 580 L 1030 600 L 1015 605 L 1008 590 Z`,
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
    
    // Create ocean background
    const oceanBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    oceanBackground.setAttribute('x', '0');
    oceanBackground.setAttribute('y', '0');
    oceanBackground.setAttribute('width', '1200');
    oceanBackground.setAttribute('height', '600');
    oceanBackground.setAttribute('fill', 'url(#oceanGradient)');
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
    
    // Add grid lines for reference
    addMapGrid(svg);
    
    // Add compass rose
    addCompassRose(svg);
    
    // Initialize pan/drag functionality
    initPanDrag(svg);
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
        'asia': { x: 800, y: 170 },
        'middle-east': { x: 600, y: 260 },
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
 * Add decorative grid lines
 */
function addMapGrid(svg) {
    const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridGroup.setAttribute('id', 'grid-group');
    gridGroup.setAttribute('opacity', '0.15');
    
    // Latitude lines
    for (let y = 100; y < 600; y += 100) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', y);
        line.setAttribute('x2', '1200');
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#F5F0E8');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '5,10');
        gridGroup.appendChild(line);
    }
    
    // Longitude lines
    for (let x = 100; x < 1200; x += 100) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', '0');
        line.setAttribute('x2', x);
        line.setAttribute('y2', '600');
        line.setAttribute('stroke', '#F5F0E8');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '5,10');
        gridGroup.appendChild(line);
    }
    
    // Insert grid below regions
    const regionsGroup = svg.querySelector('#regions-group');
    svg.insertBefore(gridGroup, regionsGroup);
}

/**
 * Add compass rose decoration
 */
function addCompassRose(svg) {
    const compass = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    compass.setAttribute('id', 'compass-rose');
    compass.setAttribute('transform', 'translate(80, 520)');
    
    // Outer circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '35');
    circle.setAttribute('fill', '#F4E4BC');
    circle.setAttribute('stroke', '#C9A227');
    circle.setAttribute('stroke-width', '2');
    compass.appendChild(circle);
    
    // Compass directions
    const directions = [
        { text: 'N', x: 0, y: -22 },
        { text: 'S', x: 0, y: 28 },
        { text: 'E', x: 23, y: 5 },
        { text: 'W', x: -23, y: 5 }
    ];
    
    directions.forEach(dir => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', dir.x);
        text.setAttribute('y', dir.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Cinzel, serif');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#3E2723');
        text.textContent = dir.text;
        compass.appendChild(text);
    });
    
    // Compass needle
    const needle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    needle.setAttribute('points', '0,-15 4,0 0,15 -4,0');
    needle.setAttribute('fill', '#B7410E');
    compass.appendChild(needle);
    
    svg.appendChild(compass);
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
    
    svg.addEventListener('mousedown', handlePanStart);
    svg.addEventListener('mousemove', handlePanMove);
    svg.addEventListener('mouseup', handlePanEnd);
    svg.addEventListener('mouseleave', handlePanEnd);
    
    // Touch support for mobile
    svg.addEventListener('touchstart', handleTouchStart, { passive: false });
    svg.addEventListener('touchmove', handleTouchMove, { passive: false });
    svg.addEventListener('touchend', handlePanEnd);
}

/**
 * Handle pan start (mousedown)
 */
function handlePanStart(e) {
    // Don't pan if clicking on a marker or region
    if (e.target.closest('.svg-marker') || e.target.closest('.region')) {
        return;
    }
    
    isPanning = true;
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
    
    // Clamp to prevent panning outside the map
    const maxX = 1200 - viewBoxStart.width;
    const maxY = 600 - viewBoxStart.height;
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
        const touch = e.touches[0];
        // Create a fake mouse event
        handlePanStart({ 
            clientX: touch.clientX, 
            clientY: touch.clientY,
            target: e.target
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
