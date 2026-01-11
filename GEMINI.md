# GEMINI Project Analysis: Interactive World Map

## 1. Project Overview
**Name:** Interactive World Map: Culture & History
**Purpose:** An educational web application designed to foster spatial-historical literacy. It allows users to explore world history across six key regions and five historical eras (3000 BCE to 2025 CE).
**Status:** Functional prototype with advanced SVG interactivity.

## 2. Tech Stack
*   **Frontend Core:** Native HTML5, CSS3, JavaScript (ES6+).
*   **Graphics:** SVG (Scalable Vector Graphics) for the map and markers, manipulated via DOM API.
*   **Fonts:** Google Fonts (Cinzel for headings, Lato for body).
*   **External Dependencies:** None (No frameworks like React or Vue; pure vanilla implementation).
*   **Assets:** Local images in `images/` and placeholder audio in `audio/`.

## 3. Architecture
The project follows a modular vanilla JavaScript architecture:

*   **`index.html`**: The main entry point, providing the DOM structure (header, timeline, map container, modals).
*   **`styles.css`**: Handles all visual styling, utilizing CSS variables for theming ("Window to the Past"), responsive design, and transitions.
*   **Layout Structure**:
    *   **Header**: Fixed top.
    *   **Main Layout**: Flex container with Left Sidebar (Compass), Center Map, and Right Sidebar (Controls).
    *   **Footer**: Fixed bottom (Timeline).
*   **`app.js` (Controller)**:
    *   Manages the Global Application State (`appState`).
    *   Handles UI event listeners (navigation, timeline, modals).
    *   Coordinates between the map and the data.
    *   Initializes the application.
*   **`map.js` (View/Render Engine)**:
    *   Encapsulates all SVG map logic.
    *   Stores SVG path data for regions (`mapPaths`).
    *   Handles map rendering, coloring, and grid generation.
    *   Implements interactions: Zoom, Pan (Drag-to-move), and Click-to-select.
*   **`data.js` (Model)**:
    *   Contains static data structures for `regionsData` (metadata, key facts).
    *   Stores `historicalEvents` categorized by era.
    *   Includes data for cultural achievements and trade routes (though trade routes are currently unused).

## 4. Key Features
*   **Interactive SVG Map:**
    *   Custom-drawn SVG paths for 6 major regions (North America, South America, Europe, Africa, Asia, Oceania).
    *   **Geographical Refinements:**
        *   Added separate organic paths for major islands (Madagascar, Iceland, Sri Lanka).
        *   Refined Southeast Asia (Borneo, Sumatra, Java, Philippines, Malay Peninsula) with improved spacing.
        *   Redrew Oceania (Organic Australia, NZ elongated and moved closer, New Guinea).
        *   Smoothed Asia's northern coastline (Kamchatka).
    *   Dynamic coloring and hover effects.
    *   **Zoom & Pan:** ViewBox-based zooming for specific regions and drag-to-pan functionality when zoomed in.
    *   **Mouse Wheel Zoom:** Users can zoom in/out using the scroll wheel (dispatches `mapZoom` event to controller).
*   **Timeline System:**
    *   Slider control spanning -3000 to 2025.
    *   Updates the map "Era" (visual styling) and filters visible event markers.
*   **Region Exploration:**
    *   Clicking a region zooms into it and opens an "Info Panel" with key facts.
    *   Updates the list of visible historical markers to that specific region.
*   **Historical Markers:**
    *   SVG-based markers positioned by percentage coordinates.
    *   Clicking a marker opens a "Deep Dive Modal" with detailed history, images, and cultural significance.
*   **Navigation:**
    *   Button-based navigation for regions.
    *   Keyboard shortcuts (1-7 for regions, arrows for timeline/modals).

## 5. Data Structure
*   **`regionsData`**: Keyed by region ID (e.g., `'north-america'`). Contains metadata, styling colors, description, and specific `viewBox` coordinates for zooming.
*   **`historicalEvents`**: Nested object by era (e.g., `ancient`, `classical`). Each era contains an array of event objects:
    ```javascript
    {
        id: 'unique-id',
        region: 'region-id',
        title: 'Event Title',
        year: 1500,
        position: { x: 50, y: 50 }, // % relative to 1200x600 canvas
        icon: 'emoji',
        description: '...',
        details: '...',
        keyFigures: [...],
        culturalSignificance: '...'
    }
    ```
*   **`mapPaths`**: Contains the raw SVG path strings (`d` attribute) for drawing the continents.

## 6. Current Context & Constraints
*   **Design Style:** "Window to the Past" (earthy tones, parchment textures).
*   **Map Logic:** Markers are rendered *inside* the SVG coordinate system to scale correctly with the map.
*   **Ocean Rendering:** CSS `.water` class set to `transparent`. Map container provides the visible gradient background.
*   **Path Rendering:** SVG `d` attributes are strict strings; comments inside them have been removed to ensure all islands render correctly.
*   **Region Definition:** Explicitly defines 6 regions. "Middle East" is historically grouped under Asia for this project's simplification.
*   **Unimplemented Data:** `tradeRoutes` and `empires` data objects exist in `data.js` but are not currently rendered or used in the application.
