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

// World map with 6 major regions - accurate continent shapes
const mapPaths = {
    // North America (including Central America, Caribbean, Greenland)
    northAmerica: {
        path: `M 135 25 L 150 20 L 175 18 L 200 22 L 218 35 L 225 28 L 240 25 L 248 35 L 242 48 L 230 52 L 220 48 L 205 55 L 195 50 L 180 55 L 168 50 L 155 55 L 145 48 L 135 52 L 125 45 L 130 35 Z
               M 40 55 L 65 48 L 95 42 L 130 38 L 160 42 L 185 52 L 205 68 L 220 58 L 240 62 L 255 75 L 248 88 L 232 95 L 245 105 L 260 98 L 275 108 L 285 125 L 278 140 L 265 148 L 275 162 L 288 175 L 295 195 L 288 212 L 275 225 L 258 235 L 268 248 L 278 265 L 285 285 L 278 298 L 265 305 L 255 295 L 248 308 L 258 322 L 268 335 L 272 352 L 265 365 L 252 372 L 242 362 L 235 348 L 225 358 L 212 365 L 198 358 L 188 345 L 178 355 L 168 348 L 162 335 L 155 322 L 148 308 L 142 295 L 148 280 L 158 268 L 168 255 L 162 242 L 148 235 L 135 248 L 122 258 L 108 265 L 95 258 L 85 245 L 78 228 L 72 212 L 68 195 L 65 175 L 62 155 L 58 135 L 52 118 L 45 102 L 38 88 L 35 72 L 38 60 Z
               M 170 285 L 185 278 L 200 282 L 212 295 L 208 308 L 195 315 L 182 310 L 172 298 Z
               M 225 305 L 238 298 L 252 305 L 258 318 L 252 332 L 238 338 L 225 332 L 220 318 Z`,
        name: 'North America',
        class: 'north-america'
    },
    
    // South America
    southAmerica: {
        path: `M 235 340 L 255 335 L 275 342 L 292 358 L 305 378 L 315 402 L 322 428 L 325 455 L 322 482 L 315 508 L 305 532 L 292 552 L 275 568 L 258 578 L 242 582 L 228 575 L 218 562 L 212 545 L 208 525 L 205 502 L 202 478 L 198 455 L 195 432 L 192 408 L 195 385 L 202 365 L 215 348 Z`,
        name: 'South America',
        class: 'south-america'
    },
    
    // Europe (including UK, Scandinavia, Mediterranean)
    europe: {
        path: `M 415 75 L 432 68 L 448 72 L 458 85 L 452 98 L 438 102 L 425 95 L 418 82 Z
               M 465 62 L 478 55 L 495 52 L 512 55 L 525 65 L 535 78 L 542 92 L 548 78 L 562 72 L 578 75 L 588 88 L 582 102 L 568 108 L 555 102 L 548 115 L 558 128 L 572 135 L 578 148 L 568 162 L 552 168 L 538 175 L 522 182 L 505 188 L 488 192 L 472 195 L 455 192 L 442 185 L 432 172 L 425 158 L 422 142 L 425 125 L 432 108 L 442 95 L 455 82 L 468 72 Z
               M 395 95 L 412 88 L 425 95 L 428 112 L 418 125 L 402 128 L 388 122 L 385 105 Z`,
        name: 'Europe',
        class: 'europe'
    },
    
    // Africa  
    africa: {
        path: `M 435 195 L 455 188 L 478 185 L 502 188 L 525 195 L 545 208 L 562 225 L 575 245 L 585 268 L 592 292 L 595 318 L 592 345 L 585 372 L 575 398 L 562 422 L 545 445 L 525 465 L 502 482 L 478 495 L 455 502 L 432 498 L 412 488 L 395 472 L 382 452 L 372 428 L 365 402 L 362 375 L 365 348 L 372 322 L 382 298 L 395 275 L 412 255 L 428 238 L 438 218 L 435 205 Z
               M 545 498 L 558 492 L 572 498 L 578 515 L 572 532 L 558 538 L 545 532 L 538 515 Z`,
        name: 'Africa',
        class: 'africa'
    },
    
    // Asia (includes Middle East, Russia, India, China, Japan, Southeast Asia)
    asia: {
        path: `M 575 45 L 605 38 L 645 32 L 695 28 L 755 25 L 818 28 L 878 35 L 932 45 L 978 58 L 1015 75 L 1042 95 L 1058 118 L 1068 142 L 1072 168 L 1068 195 L 1058 218 L 1042 238 L 1022 255 L 998 268 L 972 278 L 945 285 L 918 288 L 892 285 L 868 278 L 848 268 L 832 255 L 842 272 L 855 292 L 865 315 L 868 338 L 862 362 L 848 382 L 828 398 L 805 408 L 782 412 L 758 408 L 738 398 L 722 382 L 712 362 L 708 338 L 712 315 L 722 295 L 705 308 L 685 318 L 662 325 L 638 328 L 615 325 L 595 315 L 578 298 L 565 278 L 555 255 L 548 232 L 545 208 L 548 185 L 555 162 L 565 142 L 578 122 L 592 105 L 608 88 L 628 72 L 652 58 L 605 52 L 578 48 Z
               M 1005 125 L 1022 118 L 1038 125 L 1048 142 L 1055 162 L 1058 185 L 1052 205 L 1042 222 L 1028 235 L 1012 242 L 995 238 L 982 225 L 975 208 L 972 188 L 978 168 L 988 148 L 998 135 Z
               M 878 318 L 898 312 L 918 318 L 932 335 L 938 355 L 932 375 L 918 388 L 898 392 L 878 388 L 865 375 L 858 355 L 865 335 Z
               M 948 358 L 965 352 L 982 358 L 992 375 L 998 395 L 1002 418 L 998 438 L 988 455 L 972 465 L 955 462 L 942 448 L 932 428 L 928 405 L 932 382 L 942 365 Z`,
        name: 'Asia',
        class: 'asia'
    },
    
    // Oceania (Australia, New Zealand, Pacific Islands)
    oceania: {
        path: `M 858 408 L 882 398 L 912 395 L 945 398 L 975 408 L 1002 422 L 1025 442 L 1042 465 L 1052 492 L 1055 518 L 1048 545 L 1035 568 L 1015 585 L 988 598 L 958 605 L 925 608 L 892 605 L 862 595 L 838 578 L 822 555 L 812 528 L 808 498 L 815 468 L 828 442 L 845 422 Z
               M 1068 525 L 1085 518 L 1102 525 L 1112 545 L 1115 568 L 1108 588 L 1095 602 L 1078 608 L 1062 602 L 1052 585 L 1048 565 L 1055 545 Z
               M 1095 608 L 1108 602 L 1122 608 L 1128 622 L 1122 635 L 1108 642 L 1095 635 L 1088 622 Z`,
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
    // Labels for all 6 major regions
    const labelPositions = {
        'north-america': { x: 180, y: 180 },
        'south-america': { x: 265, y: 460 },
        'europe': { x: 500, y: 130 },
        'asia': { x: 820, y: 180 },
        'africa': { x: 485, y: 380 },
        'australia': { x: 940, y: 500 }
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
