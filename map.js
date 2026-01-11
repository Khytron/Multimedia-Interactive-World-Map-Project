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
        class: 'north-america',
        transform: 'translate(100, 0)'
    },
    
    // South America
    southAmerica: {
        path: `M 200 290 L 235 285 L 265 295 L 290 320 L 310 355 L 320 400 
               L 318 450 L 305 500 L 280 545 L 250 575 L 220 590 L 190 585 
               L 165 565 L 150 530 L 145 485 L 150 435 L 162 385 L 178 340 
               L 192 305 Z`,
        name: 'South America',
        class: 'south-america',
        transform: 'translate(100, 0)'
    },
    
    // Europe
    europe: {
        path: `M 430 95 L 445 88 L 465 85 L 490 82 L 515 80 L 540 85 L 560 95 
               L 570 110 L 572 130 L 565 150 L 552 165 L 535 175 L 515 182 
               L 492 188 L 470 190 L 450 185 L 435 175 L 425 160 L 420 142 
               L 418 122 L 422 105 Z
               M 400 100 L 418 95 L 425 108 L 420 125 L 408 130 L 395 122 L 395 108 Z
               M 355 70 Q 365 65 375 70 Q 378 78 370 82 Q 360 85 355 78 Q 352 74 355 70 Z`,
        name: 'Europe',
        class: 'europe',
        transform: 'translate(200, 0)'
    },
    
    // Africa  
    africa: {
        path: `M618.63,430.43l-0.06,-0.79l-1.06,0.01l-1.33,0.97l-1.49,0.29l-1.29,0.42l-0.9,0.06l-1.6,0.1l-1,0.52l-1.39,0.19l-2.47,0.88l-3.05,0.34l-2.64,0.73l-1.39,-0.01l-1.26,-1.19l-0.55,-1.17l-0.91,-0.52l-1.2,-0.78l1.6,-0.68l0.09,-1.18l-0.66,-0.88l-1.38,-0.86l-0.88,-0.98l-1.52,-1.65l-1.56,-1.64l-3.83,-2.72l-1.54,-1.41l-0.77,-2.67l-1.63,-3.38l-1.53,-1.08l-1.07,-0.72l-1.03,-3.52l-0.41,-3.06l0.61,-0.54l-0.9,-2.94l-0.49,-0.62l-3.27,-2.71l-0.09,-1.97l0.56,-0.53l-2.52,-3.39l-0.9,-1.74l-1.04,-1.69l-2.12,-4.87l-1.72,-3.18l-1.16,-3.37l0.29,-0.29l2,4.58l1.27,1.41l0.93,1.02l0.65,-0.55l0.76,-1.65l0.6,-2.4l0.79,-1.29l-1.84,-5.56l-1.38,0.82l-2.19,-0.18l-2.25,-0.77l-0.65,1.06l-0.76,-1.62l-1.99,-0.41l-2.47,0.27l-1.15,0.94l-2.16,1.03l-1.3,-0.51l-2.78,-0.96l-2.7,-0.86l-3.73,0.05l-0.68,-1.08l-2.79,-0.39l-0.89,-0.56l-1.04,-0.01l-0.96,-1.48l-3.79,-0.68l-1.93,0.45l-2.02,1.55l-0.88,1.6l0.65,2.5l-1.34,1.49l-1.37,0.84l-2.99,-1.61l-3.95,-1.36l-2.52,-0.63l-1.31,-2.92l-3.72,-1.48l-2.34,-0.55l-1.18,0.29l-3.29,-1.15l-1.07,-0.52l-0.71,-1.59l-1.45,-0.06l-0.53,-1.84l1.85,-1.7l0.37,-2.96l-0.97,-0.86l0.02,-1.6l1.4,-1.71l-0.2,-0.67l-2.38,1.29l0.08,-1.77l-1.96,-0.42l-3.05,1.41l-1.92,0.21l-1.14,-0.81l-3,0.03l-2.64,1.38l-1.41,-0.52l-4.64,0.28l-4.75,0.62l-2.7,1.06l-1.77,1.43l-3.03,0.6l-2.7,1.87l-1.22,-0.04l-2.9,-0.75l-2.67,0.24l-1.69,-1.46l-2.06,-0.02l-0.88,2.1l-1.87,3.51l-2.08,1.39l-2.81,1.53l-1.8,2.25l-0.38,1.74l-1.07,2.82l0.7,4.03l-2.34,2.68l-1.41,0.85l-2.21,2.17l-2.61,0.35l-1.41,1.21l-0.05,0.04l-1.78,3.2l-1.87,1.14l-1.01,1.92l-0.07,1.64l-0.74,1.79l-0.94,0.49l-1.56,1.94l-0.96,2.14l0.18,1.02l-0.92,1.57l-1.08,0.82l-0.13,1.39l-0.12,1.26l1.48,1.29l0.72,1.41l-0.28,1.48l0.34,1.47l0.31,2.91l-0.35,2.75l-0.78,1.44l0.24,1.57l-0.67,1.49l-1.36,2.03l-1.23,0.55l1.4,1.02l1.16,2.24l-0.36,1.27l0.46,2.19l0.18,0.61l0.85,0.6l-0.02,0.43l0.64,0.8l1.18,0.19l1.5,1.19l0.82,0.47l0.41,0.62l0.32,1.25l0.7,0.56l0.72,0.37l1.09,1.11l1.23,1.67l0.34,2.08l0.49,1.03l1.46,1.5l2.02,1.13l0.76,0.21l1.89,1.81l2.39,1.53l2.55,2.13l2.89,1.33l0.73,-0.02l0.54,0.07l2.78,-1.02l1.95,-0.81l3.32,-0.49l1.8,-0.03l1.96,0.55l1.28,-0.03l2.5,0.79l2.53,-0.81l1.56,-0.96l4.4,-1.64l2.26,-0.6l2.32,-0.33l2.47,0l2.11,-0.03l1.98,1.85l0.92,2.02l1.5,1.75l2.24,0.06l1.08,-0.63l1.06,0.15l2.91,-1.01l-0.03,0.77l0.72,0.4l0.57,1.25l1.28,0.47l1.1,1.84l-0.41,2.2l-0.96,3.13l0.52,0.42l-0.56,2.06l-0.68,2.03l-0.61,0.89l-0.09,0.93l1.7,2.88l1.85,2.3l2.88,2.82l2.3,2.96l0.75,2.1l0.39,0.87l-0.27,0.54l1.4,1.77l0.57,1.88l0.85,2.72l-0.86,1.12l-0.15,0.59l0.69,1.69l0.75,1.72l0.84,1.01l0.15,1.61l-0.29,2.11l-0.9,1.27l-1.61,1.87l-0.67,1.17l-0.91,2.59l-0.15,1.24l-0.97,2.65l-0.39,2.55l0.26,1.83l0.17,2.24l2.28,2.87l0.61,1.85l1.47,3.56l1.45,2.47l1.09,1.24l0.36,1.64l0.06,3.63l0.94,4.72l0.69,2.24l0.62,3.04l1.1,2.3l2.08,2.39l2.01,4.15l0,0.01l1.41,2.74l1.84,3.05l0.07,2.53l-0.9,0.6l0.91,2.23l-0.02,1.96l0.37,0.91l0.13,-0.47l1.21,1.51l0.95,0.06l1.19,1.21l1.28,-0.08l1.73,-1.28l2.39,-0.54l2.89,-1.33l1.16,0.18l1.7,-0.41l3.04,0.65l1.39,-0.64l1.7,0.5l0.36,-0.93l1.43,-0.17l2.93,-1.3l2.12,-1.51l1.98,-1.98l3.17,-3.38l1.59,-2.33l0.78,-1.66l1.19,-1.63l0.55,-0.46l1.91,-1.61l0.73,-1.43l0.33,-2.62l0.7,-2.28l0.24,-1.64l-0.72,-0.21l-0.24,-1.31l1.23,-1.14l3.37,-1.67l2.31,-1.04l1.17,-1.09l0.42,-1.27l-0.66,-0.52l0.45,-1.41l0.08,-2.96l-0.5,0.15l-0.04,-0.9l-0.55,-1.76l-1.33,-2.26l0.24,-2.12l1.16,-0.68l1.96,-2.1l1.08,-0.54l3.17,-3.15l3.16,-1.42l2.56,-1.11l1.79,-1.8l1.09,-2.01l0.84,-2.06l-0.49,-1.41l-0.11,-4.48l-0.35,-2.5l0.12,-2.83l-0.45,-1.27l-1.03,-0.62l-1.16,-2.79l-0.98,-1.77l0.18,-1.34l-0.16,-0.85l0.77,-1.7l-0.08,-0.73l-1.79,-1.02l-0.17,-1.59l1.29,-3.45l1.13,-0.92l0.55,-1.86l0.9,-1.13l0.4,-1.96l1.05,-0.2l0.69,-1.16l1.96,-1.11l0.63,-0.66l0.65,-1.47l3.07,-3.37l2.61,-2.12l4.19,-2.77l2.81,-2.26l3.3,-3.81l2.39,-3.13l2.41,-4.11l1.73,-3.59l1.35,-3.15l0.79,-3.06l0.59,-1.02l-0.01,-1.49L618.63,430.43zM616.06,504.96l0.73,1.35l-0.28,1.39l-0.5,0.85l-0.95,-1.7l-0.53,0.86l0.54,2.15l-0.25,1.23l-0.77,0.67l-0.18,2.48l-1.1,3.43l-1.38,4.08l-1.73,5.67l-1.07,4.21l-1.27,3.55l-2.28,0.73l-2.45,1.31l-1.61,-0.79l-2.23,-1.1l-0.77,-1.62l-0.19,-2.71l-0.99,-2.42l-0.26,-2.17l0.5,-2.16l1.29,-0.52l0.01,-0.99l1.34,-2.26l0.25,-1.89l-0.65,-1.4l-0.53,-1.85l-0.22,-2.7l0.98,-1.63l0.38,-1.84l1.4,-0.11l1.56,-0.59l1.04,-0.52l1.23,-0.04l1.6,-1.65l2.31,-1.78l0.84,-1.45l-0.38,-1.23l1.19,0.34l1.55,-1.99l0.05,-1.72l0.93,-1.28l0.98,1.22l0.74,1.21l0.69,1.89L616.06,504.96z`,
        name: 'Africa',
        class: 'africa',
        // No transform for Africa, it's the anchor
    },
    
    // Asia (includes Middle East and Southeast Asia)
    asia: {
        path: `M 570 45 L 630 40 L 700 42 L 780 48 L 860 58 L 930 72 L 985 92 
               Q 1010 100 1025 110 Q 1035 130 1025 155 
               L 1018 190 L 990 220 L 950 245 L 905 265 
               L 855 280 L 800 290 L 745 295 L 695 292 
               Q 675 300 670 330 L 660 340 L 650 320 
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
        class: 'asia',
        transform: 'translate(200, 0)'
    },
    
    // Oceania (Australia + surrounding)
    oceania: {
        path: `M 860 400 Q 920 390 960 410 Q 975 430 970 470 Q 960 520 920 530 Q 880 540 850 510 Q 830 460 840 430 Q 850 410 860 400 Z
               M 890 395 Q 900 410 890 420 Q 880 410 890 395 Z
               M 940 360 Q 980 355 1000 370 Q 990 385 950 380 Q 930 370 940 360 Z
               M 1040 530 Q 1055 520 1065 545 Q 1050 560 1035 550 Q 1030 540 1040 530 Z
               M 1025 560 Q 1050 555 1060 585 Q 1040 600 1020 590 Q 1015 575 1025 560 Z`,
        name: 'Oceania',
        class: 'australia',
        transform: 'translate(200, 0)'
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
        
        // Apply coordinate transform if specified
        if (region.transform) {
            path.setAttribute('transform', region.transform);
        }
        
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