/**
 * Interactive World Map: Culture & History
 * Map Module - SVG World Map Generation and Rendering
 * Clean continent shapes traced from reference image
 */

// Current map state
let currentMapView = 'world';
let mapTransform = { scale: 1, x: 0, y: 0 };

// Pan/drag state
let isPanning = false;
let hasDragged = false;
let panStart = { x: 0, y: 0 };
let viewBoxStart = { x: 0, y: 0 };

// World map with 6 major regions - clean accurate continent shapes
const mapPaths = {
    // North America - Greenland, mainland, Caribbean
    northAmerica: {
        path: "M 310 35 L 355 28 L 395 40 L 415 65 L 412 95 L 390 115 L 355 120 L 325 110 L 310 85 L 308 55 Z M 35 70 L 80 55 L 130 50 L 175 60 L 150 85 L 115 95 L 85 120 L 65 155 L 55 200 L 65 250 L 95 295 L 140 330 L 195 355 L 250 375 L 290 400 L 300 435 L 280 465 L 245 478 L 200 470 L 160 445 L 135 405 L 130 360 L 155 320 L 200 295 L 255 290 L 300 315 L 325 365 L 315 420 L 275 468 L 218 500 L 155 512 L 95 495 L 50 455 L 25 400 L 20 340 L 40 280 L 80 230 L 135 195 L 200 180 L 265 195 L 320 240 L 355 305 L 360 380 L 330 452 L 272 510 L 198 548 L 118 560 L 50 535 L 8 485 L 0 420 L 0 70 Z M 235 380 L 275 368 L 305 392 L 310 430 L 285 458 L 248 462 L 225 438 L 228 400 Z",
        name: 'North America',
        class: 'north-america'
    },

    // South America - triangular shape
    southAmerica: {
        path: "M 255 395 L 295 385 L 328 415 L 350 465 L 358 525 L 345 580 L 312 625 L 265 658 L 212 672 L 168 655 L 145 615 L 155 565 L 188 515 L 232 475 L 268 432 L 272 400 Z",
        name: 'South America',
        class: 'south-america'
    },

    // Europe - British Isles + mainland
    europe: {
        path: "M 418 95 L 445 82 L 470 92 L 478 120 L 462 145 L 432 150 L 412 132 L 412 105 Z M 395 105 L 418 98 L 432 115 L 425 135 L 405 142 L 388 128 Z M 495 60 L 545 52 L 595 68 L 632 105 L 648 158 L 638 215 L 605 262 L 555 298 L 498 322 L 448 338 L 418 372 L 415 418 L 442 458 L 492 485 L 555 492 L 618 468 L 668 425 L 700 368 L 708 305 L 688 248 L 645 202 L 585 172 L 525 168 L 475 195 L 442 245 L 435 308 L 458 372 L 505 425 L 568 462 L 642 478 L 0 478 L 0 60 Z",
        name: 'Europe',
        class: 'europe'
    },

    // Africa - large continent + Madagascar
    africa: {
        path: "M 455 238 L 512 225 L 568 248 L 615 295 L 645 362 L 652 435 L 635 505 L 595 562 L 538 602 L 472 622 L 405 615 L 348 585 L 308 535 L 290 475 L 295 412 L 325 355 L 375 308 L 435 275 L 478 245 L 485 225 L 465 218 Z M 595 515 L 625 502 L 648 528 L 645 572 L 618 605 L 582 612 L 562 585 L 568 542 Z",
        name: 'Africa',
        class: 'africa'
    },

    // Asia - massive continent including Middle East, Russia, India, China, Japan, SE Asia
    asia: {
        path: "M 605 65 L 688 50 L 788 48 L 885 68 L 972 112 L 1042 178 L 1088 265 L 1105 362 L 1095 455 L 1058 538 L 998 600 L 0 600 L 0 478 L 642 478 L 568 462 L 505 425 L 458 372 L 435 308 L 442 245 L 475 195 L 525 168 L 585 172 L 645 202 L 688 248 L 708 305 L 700 368 L 668 425 L 618 468 L 555 492 L 642 478 L 720 455 L 792 408 L 848 345 L 882 272 L 892 195 L 875 128 L 835 78 L 778 48 L 712 42 L 652 62 L 608 105 L 585 165 L 588 232 L 618 298 L 668 358 L 735 405 L 815 435 L 902 445 L 988 425 L 1062 378 L 1118 315 L 1152 242 L 1162 165 L 1145 95 L 1105 42 L 1048 8 L 982 -8 L 918 8 L 865 48 L 828 108 L 815 178 L 828 252 L 868 322 L 928 382 L 1002 428 L 1088 455 L 1175 455 L 1200 432 L 1200 600 L 998 600 L 1058 538 L 1095 455 L 1105 362 L 1088 265 L 1042 178 L 972 112 L 885 68 L 788 48 L 688 50 L 605 65 Z M 1042 152 L 1078 138 L 1108 162 L 1115 205 L 1098 248 L 1062 272 L 1025 268 L 1002 238 L 1002 195 L 1025 165 Z M 975 408 L 1018 392 L 1058 422 L 1068 475 L 1045 525 L 998 548 L 952 538 L 925 495 L 935 445 Z M 748 398 L 782 385 L 808 415 L 808 458 L 778 488 L 742 488 L 722 458 L 732 418 Z",
        name: 'Asia',
        class: 'asia'
    },

    // Oceania - Australia, New Zealand, Papua New Guinea (scaled to fit canvas)
    oceania: {
        path: "M 875 388 L 932 375 L 992 392 L 1042 432 L 1075 488 L 1082 548 L 1065 598 L 1028 640 L 978 668 L 922 678 L 868 665 L 822 632 L 792 585 L 785 532 L 798 482 L 832 440 L 872 408 Z M 1118 498 L 1145 488 L 1168 512 L 1168 552 L 1145 582 L 1115 588 L 1098 562 L 1105 522 Z M 1128 588 L 1152 578 L 1172 602 L 1172 642 L 1148 668 L 1118 672 L 1102 648 L 1112 608 Z M 1008 358 L 1048 345 L 1088 372 L 1095 418 L 1075 462 L 1035 482 L 995 468 L 975 425 L 988 382 Z",
        name: 'Oceania',
        class: 'australia'
    }
};

// Ocean and water features
const waterFeatures = {
    atlanticOcean: {
        path: "M 0 0 L 330 0 L 320 150 L 280 300 L 200 400 L 150 550 L 0 600 Z",
        name: 'Atlantic Ocean'
    },
    pacificOcean: {
        path: "M 950 0 L 1200 0 L 1200 600 L 1000 600 L 1050 400 L 1000 200 L 970 100 Z",
        name: 'Pacific Ocean'
    }
};

/**
 * Initialize the SVG world map
 */
function initializeMap() {
    const svg = document.getElementById('world-map');
    if (!svg) return;
    
    svg.innerHTML = '';
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    const oceanGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    oceanGradient.setAttribute('id', 'oceanGradient');
    oceanGradient.setAttribute('x1', '0%');
    oceanGradient.setAttribute('y1', '0%');
    oceanGradient.setAttribute('x2', '0%');
    oceanGradient.setAttribute('y2', '100%');
    oceanGradient.innerHTML = '<stop offset="0%" style="stop-color:#1A5276"/><stop offset="50%" style="stop-color:#2980B9"/><stop offset="100%" style="stop-color:#1A5276"/>';
    defs.appendChild(oceanGradient);
    
    svg.appendChild(defs);
    
    const oceanBackground = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    oceanBackground.setAttribute('x', '0');
    oceanBackground.setAttribute('y', '0');
    oceanBackground.setAttribute('width', '1200');
    oceanBackground.setAttribute('height', '600');
    oceanBackground.setAttribute('fill', 'url(#oceanGradient)');
    oceanBackground.setAttribute('class', 'water');
    svg.appendChild(oceanBackground);
    
    const regionsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    regionsGroup.setAttribute('id', 'regions-group');
    
    const labelsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelsGroup.setAttribute('id', 'labels-group');
    
    Object.keys(mapPaths).forEach(function(key) {
        const region = mapPaths[key];
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', region.path);
        path.setAttribute('class', 'region ' + region.class);
        path.setAttribute('data-region', region.class);
        path.setAttribute('id', 'region-' + key);
        
        path.addEventListener('mouseenter', handleRegionHover);
        path.addEventListener('mouseleave', handleRegionLeave);
        path.addEventListener('click', handleRegionClick);
        
        regionsGroup.appendChild(path);
        
        const label = createRegionLabel(region);
        if (label) {
            labelsGroup.appendChild(label);
        }
    });
    
    svg.appendChild(regionsGroup);
    svg.appendChild(labelsGroup);
    
    const markersGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    markersGroup.setAttribute('id', 'svg-markers-group');
    svg.appendChild(markersGroup);
    
    addMapGrid(svg);
    addCompassRose(svg);
    initPanDrag(svg);
}

function createRegionLabel(region) {
    const labelPositions = {
        'north-america': { x: 170, y: 200 },
        'south-america': { x: 270, y: 530 },
        'europe': { x: 520, y: 150 },
        'asia': { x: 850, y: 200 },
        'africa': { x: 490, y: 430 },
        'australia': { x: 980, y: 520 }
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

function addMapGrid(svg) {
    const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridGroup.setAttribute('id', 'grid-group');
    gridGroup.setAttribute('opacity', '0.15');
    
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
    
    const regionsGroup = svg.querySelector('#regions-group');
    svg.insertBefore(gridGroup, regionsGroup);
}

function addCompassRose(svg) {
    const compass = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    compass.setAttribute('id', 'compass-rose');
    compass.setAttribute('transform', 'translate(80, 520)');
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '35');
    circle.setAttribute('fill', '#F4E4BC');
    circle.setAttribute('stroke', '#C9A227');
    circle.setAttribute('stroke-width', '2');
    compass.appendChild(circle);
    
    const directions = [
        { text: 'N', x: 0, y: -22 },
        { text: 'S', x: 0, y: 28 },
        { text: 'E', x: 23, y: 5 },
        { text: 'W', x: -23, y: 5 }
    ];
    
    directions.forEach(function(dir) {
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
    
    const needle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    needle.setAttribute('points', '0,-15 4,0 0,15 -4,0');
    needle.setAttribute('fill', '#B7410E');
    compass.appendChild(needle);
    
    svg.appendChild(compass);
}

function handleRegionHover(e) {
    e.target.style.filter = 'brightness(1.1) drop-shadow(0 0 10px rgba(201, 162, 39, 0.5))';
}

function handleRegionLeave(e) {
    e.target.style.filter = '';
}

function handleRegionClick(e) {
    if (hasDragged) return;
    
    const regionClass = e.target.getAttribute('data-region');
    if (regionClass && regionClass !== 'other') {
        const event = new CustomEvent('regionSelected', { detail: { region: regionClass } });
        document.dispatchEvent(event);
    }
}

function highlightRegion(regionId) {
    document.querySelectorAll('.region.active').forEach(function(r) { r.classList.remove('active'); });
    const regionElement = document.querySelector('.region.' + regionId);
    if (regionElement) regionElement.classList.add('active');
}

function resetRegionHighlights() {
    document.querySelectorAll('.region.active').forEach(function(r) { r.classList.remove('active'); });
}

function zoomToRegion(regionId, viewBox) {
    const svg = document.getElementById('world-map');
    if (!svg || !viewBox) return;
    
    currentMapView = regionId;
    svg.setAttribute('viewBox', viewBox.x + ' ' + viewBox.y + ' ' + viewBox.width + ' ' + viewBox.height);
    mapTransform = { scale: 1200 / viewBox.width, x: viewBox.x, y: viewBox.y, width: viewBox.width, height: viewBox.height };
}

function resetMapView() {
    const svg = document.getElementById('world-map');
    if (!svg) return;
    
    currentMapView = 'world';
    svg.setAttribute('viewBox', '0 0 1200 600');
    mapTransform = { scale: 1, x: 0, y: 0, width: 1200, height: 600 };
    resetRegionHighlights();
}

function applyZoom(level) {
    if (currentMapView !== 'world') return;
    
    const svg = document.getElementById('world-map');
    if (!svg) return;
    
    const centerX = 600;
    const centerY = 300;
    const newWidth = 1200 / level;
    const newHeight = 600 / level;
    const newX = centerX - newWidth / 2;
    const newY = centerY - newHeight / 2;
    
    svg.setAttribute('viewBox', Math.max(0, newX) + ' ' + Math.max(0, newY) + ' ' + newWidth + ' ' + newHeight);
    mapTransform = { scale: level, x: Math.max(0, newX), y: Math.max(0, newY), width: newWidth, height: newHeight };
}

function getMapTransform() { return mapTransform; }
function getCurrentMapView() { return currentMapView; }

function initPanDrag(svg) {
    svg.style.cursor = 'grab';
    svg.addEventListener('mousedown', handlePanStart);
    document.addEventListener('mousemove', handlePanMove);
    document.addEventListener('mouseup', handlePanEnd);
    svg.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handlePanEnd);
}

function handlePanStart(e) {
    if (e.button !== 0) return;
    if (e.target.closest('.svg-marker')) return;
    
    e.preventDefault();
    isPanning = true;
    hasDragged = false;
    
    document.getElementById('world-map').style.cursor = 'grabbing';
    panStart = { x: e.clientX, y: e.clientY };
    
    const viewBox = document.getElementById('world-map').getAttribute('viewBox').split(' ').map(Number);
    viewBoxStart = { x: viewBox[0], y: viewBox[1], width: viewBox[2], height: viewBox[3] };
}

function handlePanMove(e) {
    if (!isPanning) return;
    e.preventDefault();
    
    if (Math.abs(e.clientX - panStart.x) > 5 || Math.abs(e.clientY - panStart.y) > 5) {
        hasDragged = true;
    }
    
    const svg = document.getElementById('world-map');
    const svgRect = svg.getBoundingClientRect();
    
    const scaleX = viewBoxStart.width / svgRect.width;
    const scaleY = viewBoxStart.height / svgRect.height;
    
    const dx = (panStart.x - e.clientX) * scaleX;
    const dy = (panStart.y - e.clientY) * scaleY;
    
    let newX = viewBoxStart.x + dx;
    let newY = viewBoxStart.y + dy;
    
    const maxX = Math.max(0, 1200 - viewBoxStart.width);
    const maxY = Math.max(0, 600 - viewBoxStart.height);
    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));
    
    svg.setAttribute('viewBox', newX + ' ' + newY + ' ' + viewBoxStart.width + ' ' + viewBoxStart.height);
    mapTransform.x = newX;
    mapTransform.y = newY;
}

function handlePanEnd() {
    if (!isPanning) return;
    isPanning = false;
    const svg = document.getElementById('world-map');
    if (svg) svg.style.cursor = 'grab';
}

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        handlePanStart({ button: 0, clientX: touch.clientX, clientY: touch.clientY, target: e.target, preventDefault: function(){} });
    }
}

function handleTouchMove(e) {
    if (e.touches.length === 1 && isPanning) {
        e.preventDefault();
        const touch = e.touches[0];
        handlePanMove({ clientX: touch.clientX, clientY: touch.clientY, preventDefault: function(){} });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMap, highlightRegion, resetRegionHighlights, zoomToRegion, resetMapView, applyZoom, getMapTransform, getCurrentMapView };
}