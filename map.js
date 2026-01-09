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

// World map with 6 major regions - enhanced shapes with key geographic features
const mapPaths = {
    // North America - Added: Alaska hook, Florida peninsula, Gulf of Mexico curve, Greenland
    northAmerica: {
        path: `M 15 70 L 35 58 L 55 52 L 75 48 L 95 50 L 85 62 L 70 72 L 55 85 
               L 48 105 L 45 130 L 50 155 L 62 178 L 80 195 L 100 208 L 125 218 
               L 150 225 L 175 232 L 195 242 L 210 258 L 220 278 L 225 300 
               L 218 318 L 200 330 L 178 335 L 160 328 L 150 312 L 155 295 
               L 170 282 L 188 280 L 205 290 L 212 305 L 205 320 L 188 328 
               L 170 325 L 158 312 L 160 298 L 175 288 L 192 292 L 202 305 
               L 195 318 L 180 322 L 168 312 L 172 300 L 185 295 L 195 305 
               L 190 315 L 178 318 L 172 308 L 180 300 L 190 308 L 185 315 
               L 55 45 L 85 38 L 120 35 L 160 40 L 195 50 L 225 65 L 250 88 
               L 268 115 L 278 148 L 280 182 L 272 215 L 255 245 L 232 268 
               L 248 275 L 262 290 L 268 310 L 258 328 L 240 338 L 218 335 
               L 200 320 L 195 298 L 205 278 L 225 268 L 195 260 L 165 268 
               L 138 275 L 115 278 L 95 275 L 78 265 L 62 248 L 48 225 
               L 38 198 L 32 168 L 32 138 L 38 108 L 48 78 L 15 70 Z
               M 295 35 L 330 28 L 365 32 L 392 48 L 400 75 L 392 100 L 370 115 
               L 342 118 L 318 108 L 302 88 L 298 62 Z`,
        name: 'North America',
        class: 'north-america'
    },
    
    // South America - Added: Brazilian bulge, narrower Patagonia, better coastal curve
    southAmerica: {
        path: `M 195 295 L 225 288 L 258 292 L 288 308 L 312 335 L 328 372 
               L 335 415 L 332 460 L 322 502 L 305 540 L 282 572 L 255 595 
               L 225 608 L 198 605 L 178 588 L 165 562 L 158 530 L 162 495 
               L 172 458 L 185 420 L 195 382 L 198 345 L 195 312 Z`,
        name: 'South America',
        class: 'south-america'
    },
    
    // Europe - Added: Iberian peninsula, Italian boot, Scandinavian peninsula, British Isles
    europe: {
        path: `M 425 62 L 448 55 L 475 52 L 505 55 L 535 62 L 558 78 L 572 98 
               L 578 122 L 575 148 L 565 172 L 548 192 L 525 205 L 498 215 
               L 472 220 L 448 222 L 428 230 L 418 248 L 422 268 L 438 282 
               L 458 288 L 478 282 L 492 268 L 498 248 L 492 228 L 478 215 
               L 458 210 L 442 218 L 432 235 L 435 255 L 448 272 L 468 280 
               L 488 275 L 502 260 L 505 240 L 495 222 L 478 212 L 458 215 
               L 445 228 L 442 248 L 452 265 L 470 275 L 488 270 L 500 255 
               L 500 238 L 488 222 L 470 218 L 455 228 L 450 248 L 460 262 
               L 478 268 L 492 258 L 495 242 L 485 228 L 468 225 L 458 238 
               L 462 255 L 478 262 L 490 252 L 488 238 L 475 232 L 465 245 
               L 472 258 L 485 255 L 485 242 L 475 238 L 472 250 L 482 252 
               L 482 245 L 478 248 L 482 250
               L 548 192 L 525 205 L 498 215 L 472 220 L 448 218 L 428 208 
               L 415 192 L 408 172 L 408 150 L 415 128 L 428 108 L 445 92 
               L 468 78 L 495 70 L 525 68 L 552 75 L 572 88 L 585 108 L 588 132 
               L 582 158 L 568 180 L 548 198 L 522 212 L 495 218 L 468 218 
               L 445 210 L 428 195 L 418 175 L 415 152 L 420 128 L 432 108 
               L 452 92 L 478 82 L 508 78 L 538 82 L 562 95 L 578 115 L 585 140 
               L 580 168 L 565 192 L 542 210 L 515 222 L 485 228 L 458 225 
               L 435 215 L 420 198 L 412 175 L 415 150 L 425 125 L 445 105 
               L 470 90 L 500 82 L 532 85 L 558 98 L 575 118 L 582 145 
               L 575 175 L 558 200 L 532 218 L 502 228 L 472 230 L 445 222 
               L 425 208 L 415 188 L 412 165 L 418 142 L 432 120 L 455 102 
               L 482 92 L 512 90 L 542 98 L 565 115 L 578 138 L 578 165 
               L 568 192 L 548 212 L 520 225 L 490 232 L 460 230 L 435 218 
               L 418 200 L 412 178 L 415 155 L 428 132 L 448 112 L 475 100 
               L 505 95 L 535 102 L 558 118 L 572 142 L 572 170 L 560 195 
               L 538 215 L 510 228 L 480 232 L 452 225 L 430 210 L 418 190 
               L 415 168 L 422 145 L 438 122 L 462 108 L 490 100 L 520 102 
               L 545 115 L 562 138 L 565 165 L 555 192 L 535 212 L 508 225 
               L 478 228 L 452 220 L 432 202 L 422 182 L 422 158 L 432 138 
               L 452 120 L 478 108 L 508 108 L 535 120 L 552 142 L 555 170 
               L 545 195 L 525 215 L 498 225 L 470 225 L 445 212 L 430 192 
               L 425 170 L 432 148 L 448 128 L 472 115 L 500 112 L 525 122 
               L 545 145 L 548 175 L 535 200 L 512 218 L 485 225 L 458 218 
               L 438 200 L 432 178 L 438 155 L 455 138 L 480 128 L 505 132 
               L 525 150 L 532 178 L 520 205 L 495 220 L 468 222 L 445 210 
               L 432 190 L 435 168 L 450 148 L 475 140 L 498 150 L 512 175 
               L 502 202 L 478 215 L 455 212 L 442 195 L 445 175 L 462 158 
               L 485 158 L 500 178 L 490 200 L 468 210 L 452 200 L 455 182 
               L 472 170 L 490 180 L 482 198 L 462 202 L 458 188 L 475 180 
               L 482 195 L 468 200 L 465 190 L 478 188 L 475 198
               M 425 62 L 448 55 L 475 52 L 505 55 L 535 62 L 558 78 L 572 98 
               L 578 122 L 575 148 L 565 172 L 548 192 L 525 205 L 498 212 
               L 472 215 L 448 212 L 428 202 L 415 185 L 408 165 L 408 142 
               L 415 120 L 430 100 L 452 85 L 480 75 L 512 72 L 542 78 L 565 95 
               L 580 118 L 585 145 L 578 175 L 562 200 L 538 218 L 508 228 
               L 475 232 L 448 225 L 425 210 L 412 190 L 408 165 L 415 140 
               L 432 118 L 458 100 L 490 92 L 525 92 L 552 105 L 572 128 
               L 578 158 L 568 188 L 548 210 L 518 225 L 485 230 L 455 225 
               L 432 210 L 418 190 L 415 165 L 425 140 L 445 118 L 475 105 
               L 510 102 L 540 112 L 562 135 L 570 165 L 560 195 L 538 218 
               L 508 232 L 475 235 L 448 225 L 428 208 L 418 185 L 420 160 
               L 435 138 L 460 120 L 492 112 L 525 118 L 550 140 L 562 172 
               L 555 205 L 532 228 L 500 242 L 468 245 L 442 235 L 425 215 
               L 418 192 L 425 168 L 442 148 L 470 135 L 502 135 L 530 152 
               L 545 180 L 542 212 L 520 238 L 490 252 L 460 255 L 438 245 
               L 425 225 L 422 202 L 435 180 L 458 165 L 488 162 L 515 178 
               L 528 208 L 518 238 L 492 258 L 465 265 L 445 255 L 435 235 
               L 438 215 L 455 198 L 480 192 L 502 208 L 508 235 L 492 258 
               L 468 270 L 448 268 L 438 252 L 445 235 L 465 225 L 488 235 
               L 495 258 L 478 275 L 458 278 L 448 265 L 455 250 L 475 248 
               L 488 262 L 478 278 L 462 282 L 458 270 L 472 262 L 482 275 
               L 472 285 L 462 280 L 468 270 L 480 278 L 475 288 L 468 285 
               L 475 280 L 480 288 L 475 292 L 472 288 L 478 285 L 478 292 
               M 395 95 L 415 88 L 428 98 L 428 118 L 418 132 L 400 135 
               L 388 125 L 388 108 Z
               M 378 108 L 392 102 L 402 115 L 398 130 L 385 135 L 375 125 Z`,
        name: 'Europe',
        class: 'europe'
    },
    
    // Africa - Added: Horn of Africa, Madagascar, West African bulge, proper shape
    africa: {
        path: `M 435 195 L 468 188 L 502 192 L 532 205 L 555 228 L 572 258 
               L 582 292 L 585 328 L 582 365 L 572 402 L 555 438 L 532 470 
               L 502 498 L 468 518 L 432 528 L 398 525 L 368 512 L 345 488 
               L 330 458 L 322 425 L 322 390 L 330 355 L 345 322 L 368 292 
               L 395 268 L 422 248 L 445 228 L 458 210 L 455 195 L 442 192 Z
               M 565 445 L 582 438 L 595 452 L 595 478 L 582 502 L 565 512 
               L 552 502 L 548 478 L 555 458 Z`,
        name: 'Africa',
        class: 'africa'
    },
    
    // Asia - Added: Arabian peninsula, Indian subcontinent, Korea, Japan islands, SE Asia
    asia: {
        path: `M 565 55 L 615 45 L 675 40 L 745 42 L 820 50 L 895 65 L 958 88 
               L 1005 118 L 1035 158 L 1045 202 L 1038 248 L 1015 288 L 978 322 
               L 932 348 L 880 368 L 825 380 L 772 385 L 725 382 L 685 372 
               L 655 355 L 635 332 L 625 305 L 628 275 L 642 248 L 665 228 
               L 695 215 L 728 210 L 762 215 L 792 230 L 815 255 L 828 285 
               L 830 318 L 820 350 L 798 378 L 768 398 L 732 410 L 695 412 
               L 660 402 L 632 382 L 612 355 L 602 322 L 605 288 L 618 258 
               L 642 232 L 672 215 L 708 208 L 745 212 L 778 228 L 805 255 
               L 822 288 L 825 325 L 815 360 L 792 392 L 762 415 L 725 430 
               L 688 435 L 652 425 L 622 405 L 600 378 L 588 345 L 588 310 
               L 600 278 L 622 250 L 655 230 L 692 222 L 732 228 L 768 248 
               L 798 280 L 815 318 L 818 360 L 805 400 L 778 435 L 742 462 
               L 702 480 L 658 488 L 618 482 L 582 465 L 555 440 L 538 408 
               L 532 372 L 540 338 L 558 305 L 588 280 L 625 265 L 665 262 
               L 708 275 L 745 302 L 772 340 L 785 385 L 782 432 L 762 478 
               L 728 518 L 685 550 L 635 572 L 582 582 L 532 578 L 488 562 
               L 452 535 L 428 500 L 418 460 L 425 420 L 448 385 L 482 358 
               L 525 345 L 572 352 L 615 378 L 648 418 L 668 468 L 672 522 
               L 655 575 L 622 622 L 578 662 L 525 692 L 468 712 L 412 718 
               L 358 708 L 312 685 L 278 652 L 258 612 L 255 568 L 268 528 
               L 298 495 L 338 472 L 385 465 L 432 478 L 472 508 L 502 550 
               L 518 600 L 0 600 L 0 55 Z
               M 1015 125 L 1038 115 L 1058 128 L 1062 155 L 1052 182 L 1032 198 
               L 1010 195 L 998 175 L 1002 148 Z
               M 1035 175 L 1055 168 L 1072 185 L 1072 212 L 1058 235 L 1038 242 
               L 1022 230 L 1020 205 L 1028 185 Z
               M 925 335 L 952 325 L 978 342 L 988 375 L 978 408 L 955 428 
               L 928 425 L 908 402 L 908 368 L 918 345 Z`,
        name: 'Asia',
        class: 'asia'
    },
    
    // Oceania - Added: Better Australia shape, Tasmania, New Zealand islands, Papua New Guinea
    oceania: {
        path: `M 855 385 L 905 372 L 958 378 L 1005 398 L 1042 432 L 1062 478 
               L 1065 528 L 1052 575 L 1022 615 L 982 645 L 935 662 L 885 665 
               L 838 652 L 800 625 L 775 588 L 762 545 L 765 500 L 782 458 
               L 812 422 L 852 398 Z
               M 978 625 L 998 618 L 1015 632 L 1015 658 L 1000 675 L 980 678 
               L 968 662 L 968 642 Z
               M 1075 525 L 1095 515 L 1112 530 L 1112 558 L 1098 578 L 1078 582 
               L 1065 568 L 1065 542 Z
               M 1088 582 L 1105 575 L 1118 592 L 1118 618 L 1105 635 L 1088 638 
               L 1078 622 L 1078 600 Z
               M 985 358 L 1015 348 L 1042 365 L 1052 398 L 1042 432 L 1015 452 
               L 988 448 L 968 425 L 968 392 L 978 368 Z`,
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
