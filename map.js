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
        path: `M813.81,400.62l-1.48,-2.55l-0.32,-2.25l1.65,-3l2.24,-2.33l1.28,0.92l-0.49,1.85l-1.69,4.88L813.81,400.62zM830.35,486.86l-1.96,0.1l-2.41,0.63l-0.33,0.67l-2.77,1.12l-1.21,1.72l-0.25,0.96l0.34,0.34l2.4,-0.62l1.83,-2.11l2.35,-0.81l2.92,-1.23l1.03,-0.76l-1.06,-0.35L830.35,486.86zM870.07,151.56l-2.66,3.92l0.49,0.52l5.75,1.08l4.25,-0.07l-0.34,-2.57l-3.98,-3.81L870.07,151.56zM769.87,98.34l0.83,-5.72l-7.11,-8.34l-2.11,-0.98l-2.3,1.7l-5.12,18.6L769.87,98.34zM736.89,82.07l4.65,5.73l7.81,4.2l6.12,-1.8l0.69,-13.62l-6.46,-16.04l-5.45,-9.02l-6.07,4.11l-7.28,11.83l3.83,3.27L736.89,82.07zM1002.78,209.19l-7.61,-1.07l0.65,5.15l-1.89,-1.74l0.24,-4.44l-7.35,-7.34l-6.87,-5.86l-3.92,-3.44l-8.06,-3.84l-5.83,0.49l-8.95,-2.29l-1.25,3.62l2.27,5.07l-3.47,2.48l-4.88,-6.99l-5.31,0.89l-5.29,-1.57l-4.97,0.21l-3.75,1.64l-3.45,-2.29l0.34,-6.02l-2.33,-3.5l-5.58,-1.41l-11.32,1.62l-7.34,-6.65l-2.39,-5.35l-25.32,-6.06l-3.7,4.07l2.02,8.4l-4.59,-1.24l-2.07,2.47l-5.43,-2.72l-4.78,2.38l-4.5,-4l-2.71,9.18l-4.41,-3.49l-3.52,-6.98l1.66,-3.84l-1.29,-6.04l-4.53,-5.14l-4.48,0.05l-5.95,-1.74l-0.16,7.47l-11.72,-1.43l-0.68,-4.58l-9,-1.65l-4.48,1.57l-1.23,2.56l-1.43,-6.39l-2.52,1.91l-4.15,-2.55l-3.48,-1.43l2.11,-3.08l7.37,-5.92l3.1,-3.24l0.7,-5.85l-2.25,-4.35l-6.32,-5.84l-8.2,-0.16l-2.56,2.94l-0.76,-6.03l-6.35,-1.92l3.82,-3.13l-4.81,-4.21l-6.62,5.31l-2.68,5.33l-0.77,5.24l-5.15,-0.2l-6.29,6.24l-2.29,-2.61l-7.36,1.08l-0.94,3.15l-7.4,1.51l-5.45,5.51l-3.22,0.3l-3.25,7.02l2.28,5.38l-6.08,1.32l-6.74,-0.44l-4.88,2.02l0.28,10.28l2.49,7.62l-5.18,-5.18l-5.82,0.49l-4.69,3.58l1.28,6.37l-3,-1.59l1.11,-8.67l-1.47,-5.19l-1.4,0.22l0.65,6.62l-5.02,6.04l3.64,7.03l-2.24,8.28l0.67,4.42l3.07,0.64l-1.31,5.08l1.63,4.26l-2.43,3.49l-0.74,3.55l-3.08,1.82l-1.12,2.51l-3.21,-1.02l5.49,-10.2l1.2,-5.01l-3.09,-4.73l0.64,-11.07l-0.9,-5.94l-1.74,-2.78l2.66,-7.28l-0.58,-5.18l-7.42,-2.51l-2.08,1.88l-1.84,8.42l-5.17,7.99l0.08,2.74l1.5,6.49l-0.92,3.83l3.38,0.78l0.08,1.68l2.85,4.11l-1.88,3.97l-1.6,-1.39l0.92,7.34l-2.03,4.04l-3.76,3.86l-3.93,3.13l-4.82,5.44l-5.23,4.07l-1.89,19.97l-1.34,8.84l-1.77,5l-1.78,3.54l-2.17,2.73l-0.56,2.42l2.11,1.76l0.31,2.15l-1.66,2.67l-2.57,0.64l-3.08,0.37l1.3,2.44l1.2,1.83l1.81,2.32l1.9,-1.5l1.84,-1.12l1.89,1.07l0.71,1.75l-1.33,1.39l-1.13,2.2l0.09,2.65l1.88,0.67l0.8,1.88l0.3,0.11l-0.37,0.3l4.54,3.1l-0.7,2.11l-3.94,-0.19l-0.81,1.31l-3.59,-2.29l-4.44,0.09l-2.98,1.87l-3.32,-1.79l-6.18,-3.1l-4.38,0.12l-5.79,4.85l-0.35,3.19l-2.88,-2.53l-2.24,4.77l0.82,0.87l-1.62,3.21l2.38,2.84l2.08,-0.12l1.79,2.76l-0.28,2.1l1.42,0.66l2.62,-0.85l3.25,-1.8l2.38,1l2.81,-0.2l0.5,2.51l-0.5,3.91l-2.45,-0.59l-2.38,0.65l-0.11,2.88l-2.73,-0.37l0.09,1.28l1.55,0.99l1.27,3.46l3.25,1.3l0.54,1.32l-0.69,1.57l0.16,0.92l0.88,2.42l0.29,-2.73l2.26,-0.96l0.8,2.14l2.04,2.23l-2.46,1.18l-2.64,-0.91l-0.62,3.09l1.86,0.21l-0.72,2.48l2.19,1.22l-0.41,3.73l0.52,2.49l2.46,-0.68l1.99,-2.02l1.88,0.1l1.23,-0.66l1.99,0.33l3.1,1.79l2.24,0.38l3.2,3.09l2.09,0.12l0.25,2.91l-1.14,4.25l-0.77,2.45l1.22,0.49l-1.2,1.83l0.92,2.64l0.22,2.09l2.12,0.55l0.23,2.1l-2.54,2.93l1.39,1.69l1.13,1.93l2.68,1.4l0.08,2.78l1.34,0.51l0.23,1.44l-4.04,1.61l-1.06,3.59l3.95,-0.43l4.56,-0.06l5.17,-0.58l2.17,2.34l0.84,2.2l2.05,0.77l3.29,2.58l0.83,1.19l-1.35,1.09l3.66,3.63l1.98,0.36l4.08,-1.79l0.54,2.79l-0.01,3.59l0.84,3.76l1.16,5.65l2.55,3.97l0.48,1.8l0.7,3.58l1.49,2.74l0.98,1.35l1.08,2.86l1.3,3.96l2.65,2.63l1.13,-0.81l0.94,-1.92l2.56,-0.8l-0.85,-0.93l1.28,-2.16l1.45,-0.14l0.01,-4.83l1.19,-2.71l-0.15,-2.38l-0.58,-3.74l0.84,-2.21l1.31,-0.15l2.53,-1.04l1.4,-0.72l0,-1.34l2.79,-1.91l2.11,-1.85l3.14,-3.47l4.04,-1.99l1.5,-1.76l-0.16,-2.25l3.46,-0.62l1.91,0.04l0.4,-1.1l1.08,0.27l0.79,0.33l0.41,-0.55l1.19,0.61l0.88,-1.67l-0.25,-1.25l2.58,0.12l1.17,1.76l0.53,1.45l0.16,1.53l0.8,1.56l1.99,2.42l1.64,0.38l-0.34,1.07l2.2,3.39l0.58,2.74l-0.97,3.6l1.74,0.68l1.57,0.26l3.19,-2.07l1.85,-1.46l1.21,2.41l0.51,3.65l0.91,3.44l1.14,1.48l-0.23,3.11l0.94,1.68l-0.86,2.17l0.27,2.1l-0.83,2.71l-0.31,1.76l0.53,1.56l0.46,-1.65l1.36,1.33l1.49,1.59l0.48,1.39l1.11,1.08l0.62,1.19l-0.31,2.04l1.01,1.52l0.39,2.31l1.62,1.87l0.33,1.42l3.32,2.21l2.65,2.06l1.99,-0.19l0.05,-0.94l-1.1,-2.46l-0.99,-0.77l-0.21,-1.65l-0.27,-0.96l0.3,-1.27l-0.16,-1.88l-1.18,-1.87l-1.66,-1.69l-0.64,-0.26l-1.45,-1.46l-1.7,-0.33l-1.56,-1.61l-0.5,-2.43l-1.14,-2.57l-1.83,-0.09l-0.19,-2.04l0.91,-2.5l1.51,-4.15l0.22,-3.14l2.47,-0.02l-0.41,2.25l2.4,-0.05l2.52,1.31l1.42,2.94l1.14,1.48l2.35,0.41l2.08,1.61l-0.79,1.91l1.02,1.81l3.5,-2.63l2.29,-2.36l3.21,-1.83l2.34,-1.87l0.38,-5.02l-1.28,-5.32l-1.7,-2.32l-2.54,-1.79l-2.62,-3.81l-2.14,-3.1l0.62,-2.05l2.34,-2.81l3.74,-2.56l1.33,-0.49l3.76,0.96l-0.66,1.16l0.74,2.16l1.55,-0.17l0.96,-3.15l2.97,-0.46l3.92,-1.5l1.59,-1.5l0.97,0.98l1.71,-1.34l3.16,-0.35l3.9,-2.55l3.86,-2.82l2.6,-3.68l2.27,-4.09l2.05,-3.41l1.57,-0.28l0.71,-2.52l0.43,-2.61l-1.65,-1l-0.67,-1.73l1.76,-0.89l0.05,-2.43l-1.9,-2.53l-1.71,-3.05l-1.1,-3.31l-3.02,-1.86l1.44,-2.39l2.73,-1.73l1.31,-1.87l3.97,-0.97l-0.46,-1.84l-1.81,-0.09l-2.49,-1.37l-3.14,2.51l-2.22,-1.02l-0.09,-1.58l-2.29,-0.58l-1.48,-2.41l1.43,-1.68l2.75,-0.17l1.73,-2.34l3.17,-2.54l2.44,-1.3l1.48,1.93l-2.22,2.45l0.59,1.41l-1.49,1.67l3.02,-0.98l2.06,-1.69l3.92,-1.06l1.32,0.98l1.64,0.39l0.18,0.59l-0.71,1.94l0.25,0.65l-0.66,0.42l-0.77,1.57l0.75,0.57l0.73,0.32l0.1,0.67l0.82,-0.29l0.34,-0.66l1.36,0.67l1.92,3l-2.08,0.59l1.24,3.6l-0.52,2.57l0.31,1.85l2.53,-0.29l2.24,-1.41l2.54,-0.65l1.06,-1.88l-0.02,-3.99l-0.69,-2.27l-2.42,-4.18l-1.59,-1.57l-1.12,-0.58l0.33,-0.4l0.09,-1.57l1.22,-0.98l1.87,-0.6l1.06,-1.08l0.5,-0.65l1.45,-0.82l-0.11,-2.67l0.84,-1.27l1.22,-1.28l1.07,0.23l0.44,-1.26l3.76,-2.79l1.76,1.86l1.77,-0.05l3.74,-2.25l1.81,-2.28l3.78,-4.53l3.81,-4.66l0.94,-2.82l4.23,-6.01l1.26,-6.85l0.24,-5.27l2.19,-4.51l-0.09,-3.92l-4.05,-5.19l-3.08,-0.31l-1.79,2.38l-2.72,-1.05l-1.38,-3l-4.42,-0.61l10.75,-11.78l9.08,-10.33l9.22,-1.62l8.57,0.94l3.47,-2.7l4.36,0.84l-0.2,3.95l4.33,-0.56l6.26,-1.42l-2.32,-3.38l7.02,-9.56l7.24,-2l2.3,7.14l7.11,-6.36l1.68,-4.92l3.41,-0.51l-2.25,8.37l-5.04,4.57l-4.83,5.73l-5.01,6.78l-4.36,1.18l-0.15,2.44l-2.37,3.07l-1.35,6.95l1.56,10.65l1.2,6.69l1.04,3.08l4.04,-4.18l0.84,-4.66l4.18,-1.14l0.97,-5.4l4.9,-2.47l-1.17,-2.1l1.2,-4.15l2.6,-0.19l0.38,-7.46l-3.19,-1.17l-0.1,-2.14l3.36,-5.22l0.9,-3.63l3.75,0.76l2.7,-2.39l1.28,2.08l7.31,-4.42l4.01,3.9l1.03,-2.55l4.07,-3.5l4.29,-4.1l2.49,-0.69l7.84,-4.51l5.23,1.32l0.72,-1.6l-0.33,-2.53l-1.29,-1.67l-1.67,-5.2l-2.53,-3.44l3.63,0.48l3.6,-2.89l0.02,-0.04l1.59,-2.83l-1.26,-3.19l3.36,-1.64l-0.61,2.55l1.52,2.37l3.19,-0.87l2.85,1.1l0.63,2.89l3.73,1.92l2.14,2.26l2.63,0.19l1.12,-1.35l0.07,-6.46l4.6,-0.7l2.78,-2.97L1002.78,209.19zM872.26,293.25l1.64,4.41l-0.12,5.85l-0.65,3.24l0.32,4.54l-0.31,4.01l0.52,3.4l1.84,-3.13l2.13,2.44l0.08,-2.84l-2.73,-4.23l1.72,-6.11l4.15,1.41l-2.82,-7.68l-1.16,-4.51l0.07,-4.5l-0.97,-4.5l-0.73,-3.15l-1.25,0.67l1.11,2.21l-2.59,2.17L872.26,293.25zM979.95,178.65l3.66,-0.52l2.89,-2.06l0.24,-1.19l-4.06,-2.51l-2.38,-0.02l-0.36,0.37l-3.57,3.64l0.5,2.73L979.95,178.65zM869.51,140.34l10.33,0.3l2.21,-8.14l-10.13,-6.07l-7.4,-0.51l-3.7,2.18l-1.51,7.75l5.55,7.01L869.51,140.34zM894.64,142.03l3.24,-4.25l-7.04,-2.88l-5.23,-1.68l-0.67,3.59l5.21,4.27L894.64,142.03zM827.14,429.25l-0.77,-1.06l-2.69,-0.06l1.71,2.18l0.04,1.08l-1.65,-0.23l0.44,1.72l0.84,0.15l0.12,1.99l1.33,-0.63l-0.69,-1.75l-0.06,-0.95l2.16,0.75L827.14,429.25zM821.49,439.08l-1.53,1.06l-1.77,0.79l-1.1,2.37l0.46,0.82l2.08,-1.57l1.32,0.11l0.88,-1.17l1.78,1.33l-0.86,1.33l0.79,2.03l3.3,1.63l0.8,-1.31l-0.9,-2.06l1.31,-1.42l1.02,2.86l0.96,-2.57l-0.17,-1.58l-0.29,-1.87l-0.2,-1.04l-0.24,-1.42l-2.27,-1.34l0.17,2.18l-1.98,0.08l-0.46,1.26l-2.13,0.77L821.49,439.08zM811.49,419.94l0.42,1.26l1.38,1.65l0.36,-1.04l0.84,0.67l-0.88,0.73l-0.14,1.19l1.4,0.63l2.55,-0.42l1.79,1.72l0.72,-1.05l1.04,1.5l2.18,1.4l0.29,-1.32l-0.92,-0.69l0.27,-1.56l-3.5,-1.59l-1.24,0.34l-1.49,-0.32l-0.63,-2.29l0.44,-2.33l1.65,-0.96l0.74,-2.42l-0.96,-2.09l0.46,-1.22l-0.25,-0.75l-0.86,0.76l-1.73,-0.84l-1.7,0l-0.91,2.66l-0.29,4.55l-1.13,-0.96L811.49,419.94zM808.99,435.38l1.85,-1.56l-0.5,-2.31l-1.47,2.82l-1.68,1.96l-2.03,1.74l-1.38,1.97l3.73,-2.67L808.99,435.38zM814.05,427.7l1.2,1.42l0.74,-2.47l-0.97,-1.03l-2.4,-0.1L814.05,427.7zM817,430.02l0.43,1.35l-0.2,1.45l0.1,1.32l1.78,-0.85l1.3,-1.2l0.05,-1.19l-1.78,0L817,430.02zM819.98,432.89l-0.31,1.76l-0.7,0.79l-0.58,0.76l1.73,1.95l0.88,-0.84l0.88,-1.79l1.01,-0.93l0.27,-2.71l-2.08,2.74l0.45,-1.91L819.98,432.89zM701.91,437.46l-1.94,-1.57l-1.27,4.58l0.5,4.04l1.33,2.23l2.44,-0.64l1.18,-0.8l0.42,-2.92l-1.36,-2.93L701.91,437.46zM868.65,337.12l-1.18,2.33l0.48,4.1l-1.76,4.38l-1.59,1.38l-4.11,3.51l-1.87,-1.67l-2.93,6.17l-3,-0.7l-5.58,1.02l-2.06,2.33l-2.82,1.75l-1.47,2.11l-2.65,1.03l1.14,2.28l1.77,0.96l-0.69,2.96l1.36,1.27l1.81,-1.37l1.87,-5.61l-2.84,-2.46l3.28,-0.06l3.32,-1.59l4.88,-0.75l0.12,2.52l1.88,1.29l4,-3.84l4.93,-0.21l3.58,-1.6l1.46,-2.42l-0.49,-1.73l1.06,-2.78l-0.05,-3.64l2.59,-3.6l0.08,-2.94l-1.53,-5.11L868.65,337.12zM848.95,364.89l1.44,-0.78l1.15,1.07l1.58,-2.03l-0.36,-1.15l-2.06,-0.73l-1.15,1.42l-1.59,-0.39l-1.55,2l-0.02,1.58l1.83,0.95L848.95,364.89zM880.73,326.62l-1.97,-0.83l-2.15,-1.31l-3.29,-4.12l-0.83,3.09l-0.82,5.38l-3,0.21l-1.39,2.94l0.39,3.74l3.12,-0.06l1.53,-4.12l4.41,2.58l2.46,-3.76l4.16,-1.05l-0.62,-4.35L880.73,326.62zM837.99,471.19l-3.46,0.12l-0.67,1.53l1.94,0.1l1.58,-0.18l2.34,0.23l2.37,1.15l-1.02,-2.13L837.99,471.19zM829.05,473.44l1.94,0.51l1.05,-0.93l-0.7,-0.92l-2.84,0.13L829.05,473.44zM870.6,470.63l-3.01,-0.53l-2.08,-1l-2.4,-0.97l-2.49,0l-3.22,1.68l-2.34,2.96l-2.9,-1.67l-0.78,-4.51l-0.44,-1.04l-4.5,-1.14l-1.44,0.91l-3.78,0.67l1.19,1.38l2.5,0.51l1.11,1.66l4.1,0.01l0.24,0.74l-2,-0.05l-3.02,1l2.14,1.37l0.01,1.21l0.64,1.02l1.08,-0.25l0.83,-1.36l4.21,2.58l2.31,0.23l5.44,2.37l1.35,2.35l0.73,3.05l-1.77,0.78l-1.19,2.29l3.55,-0.09l0.69,-0.8l2.85,0.57l2.5,2.31l-0.05,-9.16L870.6,470.63zM851.78,479.52l-0.5,1.01l0.27,2.11l1.44,-1.91l0.01,-1.34l-0.64,-0.82L851.78,479.52zM772.06,475.39l0.7,-3.47l-1.36,-1.76l-2.06,-0.25l-0.98,-1.56l-0.48,-1.94l-1.01,-0.07l-1.61,-0.97l1.12,-2.27l-2.13,-1.27l-1.62,-2.33l-2.36,-1.91l-2.85,-0.04l-2.66,-3l-1.55,-1.16l-2.17,-1.89l-2.48,-2.73l-4.34,-0.54l-1.81,-0.11l0.25,1.42l2.92,3.08l2.11,1.56l1.47,2.39l2.53,1.75l1.03,2.17l0.82,2.39l2.46,2.32l2.13,3.9l1.39,2.09l2.12,2.27l1.2,1.69l3.6,2.28l2.36,2.34l3.1,-0.06L772.06,475.39zM811.44,489.58l-2.61,0.56l3.72,1.98l1.18,-0.05l0.17,-0.76l-0.98,-0.86L811.44,489.58zM815.48,487.25l-1.76,-0.84l-2.23,0.59l0.01,1.03l3.73,0.35l4.21,-0.8l0.41,-1.56l-2.51,1.03L815.48,487.25zM792.03,484.6l-1.02,-1.82l-5.2,-1.35l-0.62,1.16l-5.37,-0.28l-0.38,-1l-1.16,-0.21l-2.26,-1.09l-3.4,-0.17l-1.92,2.68l2.57,0.21l0.49,1.21l5.11,1.16l1.17,-0.35l2.06,0.28l3.25,1.07l2.62,0.51l2.91,0.21l2.54,-0.08l3.08,1.13l3.2,-1.07l-3.44,-1.67L792.03,484.6zM814.34,467.31l-2.51,-2.48l0.4,-2.11l2.45,-0.4l4.67,-0.14l2.7,0.54l2.11,-0.54l2.25,-2.76l-0.49,-0.62l-2.77,2.02l-3.22,0.12l-3.54,-0.39l-2.19,-0.82l-2.38,2.07l-0.59,1.15l-1.41,4.2l-0.4,2.21l-1.16,1.83l0.87,1.91l1.18,0.02l0.43,2.69l-0.8,2.57l1.2,0.82l1.78,-0.41l-0.11,-4l-0.24,-3.25l1.87,-0.85l-0.21,2.72l2.02,1.64l-0.36,1.08l0.7,0.77l2.75,-1.08l-1.36,2.29l1.1,0.98l1.5,-0.82l0.02,-1.84l-2.52,-3.22l0.51,-0.96l-2.65,-3.57l2.47,-1.08l1.22,-1.63l1.22,0.4l0.23,-1.28l-5.23,0.95L814.34,467.31zM808.57,486.53l-1.73,0.23l-1.01,-0.75l-0.75,1l-1.54,0.02l-0.96,1.62l1.51,0.02l1.94,-0.38l3.24,-0.57L808.57,486.53zM804.64,463.1l0.94,-1.9l3.32,-0.33l-3.14,-2.58l0.48,-1.28l-2.06,-2.64l1.59,-2.52l2.06,-0.95l-0.5,-1.36l1.88,-0.14l0.2,-1.1l-2.34,-0.84l-1.85,-0.78l-0.13,-1.22l-1.44,-1.42l-1.13,0.01l-1.41,2.19l-2.16,1.95l-2.39,1.53l-1.11,1.05l-1.38,1.77l-2.01,2.21l-3.36,0.6l-1.2,0.53l-0.56,2.36l-2.17,0.52l-2.05,-0.96l-1.67,1.85l-0.33,2.58l0.39,2.44l1.35,2.38l1.4,0.77l0.43,3.74l2.31,0.32l1.84,-0.15l1.02,1.35l3.33,-1l1.4,0.89l2,0.16l1.11,1.71l3.19,-1.26l0.41,0.99l1.08,-4.27l0.07,-2.78l2.7,-1.91L804.64,463.1zM835.21,465.56l-1.16,-1.47l0.43,-1.69l1.45,0.27l0.15,-2.43l-0.26,-1.14l-1.66,-0.24l-0.2,-1.52l-0.93,1.01l-0.56,2.23l0.83,3.56l1.13,1.76L835.21,465.56zM785.28,408.7l1.23,-1.3l-0.63,-1.13l-1.61,-0.07l-3.06,0.83l-1.38,1.34l0.08,2.53l2.3,0.91l2.42,-1.41L785.28,408.7zM652.55,384.52L651.21,384.01L651.13,381.24L648.45,379.84L647.32,377.91L645.94,376.23L648.48,373.3L648.25,371.2L646.13,370.65L645.91,368.56L644.99,365.92L646.19,364.09L644.97,363.6L645.74,361.15L646.88,356.9L646.63,353.99L644.54,353.87L641.34,350.78L639.1,350.39L636,348.6L634,348.27L632.77,348.93L630.9,348.83L628.91,350.85L626.44,351.53L626.17,352.35L621.79,353.27L617.81,352.67L615.86,350.91L613.2,350.18L612.31,347.57L611.62,347.74L609.87,345.88L610.83,344.1L610.01,343.03L608.96,343.3L605.65,345.96L604.63,346.06L602.71,345.59L601.29,343.93L600.85,342.56L598.93,343.59L599.8,347.71L599.26,348.8L600.79,351.63L600.79,351.63L599.45,352.22L598.46,351.33L595.2,350.87L594,351.42L590.81,351.96L589.29,351.9L586.07,353.21L583.76,353.22L582.27,352.57L579.18,353.54L578.27,352.86L578.11,354.8L577.36,355.56L576.61,356.31L575.93,357.72L576.19,360.33L576.13,360.45L574.74,362.83L573.74,365.56L573.66,365.59L573.26,366.43L572.69,368.93L571.95,370.46L572.14,370.65L571.33,371.73L573.17,377.28L573.26,377.74L572.92,379.02L572.79,380.13L572.36,381.87L573.75,381.86L575.18,384.02L576.89,386.54L577.98,388.86L578.8,389.55L579.58,391.15L579.43,391.84L580.35,393.6L581.87,394.23L583.18,395.42L584.79,398.78L584.67,400.57L584.99,402.65L586.85,405.5L588.1,405.98L590.04,408.02L590.83,410.43L592.33,412.89L593.77,413.93L593.99,415.1L594.84,415.98L595.2,417.22L595.32,418.48L594.98,419.04L595.27,420.36L594.71,420.5L595.52,421.69L596.07,423.81L596.52,424.66L596.44,426.23L597.17,427.9L599.11,428.04L600.01,427.66L601.4,427.72L601.83,426.99L602.57,426.78L603.18,426.03L603.89,425.87L606.24,425.72L608.03,425.17L609.67,423.97L610.51,424.14L611.74,423.99L614.25,421.96L618.73,420.61L621.52,419.39L621.59,418.4L622.13,417.12L624.16,416.33L625.46,416.17L627.33,415.19L628.88,415.46L630.24,414.65L630.22,413.47L631.32,412.74L633.06,412.76L633.71,412.14L633.98,410.71L635.73,409.61L637.02,409.62L637.28,409.26L636.94,407.28L637.39,405.78L637.97,405.07L639.24,405.23L640.29,403.18L641.47,402.23L641.92,401.39L642.94,399.59L642.95,398.92L641.94,398.54L641.19,397.53L639.92,395.79L638.26,395.24L636.2,394.84L634.64,393.73L633.38,391.64L633,389.2L633.37,388.64L633.63,387.36L633.28,387.09L632.47,388.15L630.7,390.05L628.6,392.03L626.68,394.1L624.99,394.01L622.67,393.93L620.48,394.41L620.37,393.57L619.87,393.72L619.34,392.55L619.95,390.74L619.9,388.93L619.05,387.96L618.29,388.3L617.53,389.92L617.72,392.16L617.3,391.41L616.92,390.4L616.12,389.53L615.76,388.49L616.04,387.46L615.87,386.17L613.96,384.86L613.48,383.75L612.1,383.04L611,380.31L610.1,377.9L610.35,377.17L609.77,375.76L611.43,375.91L612.48,374.65L614.26,375.72L615.77,375.2L617.84,379.47L619.71,382.48L622.41,383.38L625.24,385.79L628.67,386.82L631.49,385.31L633.65,384.75L634.99,385.31L636.19,389.12L639.35,389.53L642.41,390.24L647.68,391.17L648.74,387.57L652.78,385.96z`,
        name: 'Asia',
        class: 'asia',
        // No transform for Asia, it matches Africa
    },
    
    // Oceania (Australia + surrounding)
    oceania: {
        path: `M 860 400 Q 920 390 960 410 Q 975 430 970 470 Q 960 520 920 530 Q 880 540 850 510 Q 830 460 840 430 Q 850 410 860 400 Z
               M 890 395 Q 900 410 890 420 Q 880 410 890 395 Z
               M 940 360 Q 980 355 1000 370 Q 990 385 950 380 Q 930 370 940 360 Z
               M 1060 540 Q 1075 535 1085 550 Q 1070 560 1055 550 Q 1050 545 1060 540 Z
               M 1045 565 Q 1070 560 1080 580 Q 1060 595 1040 585 Q 1035 575 1045 565 Z`,
        name: 'Oceania',
        class: 'australia',
        transform: 'translate(200, 0)'
    }
};

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