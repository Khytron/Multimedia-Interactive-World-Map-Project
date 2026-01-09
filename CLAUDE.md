# Interactive World Map: Culture & History - Project Context

This file provides context for AI assistants working on this project.

## Project Overview

An educational interactive web application that allows users to explore world regions to learn about culture and history. Built for a FOM (Fundamentals of Multimedia) course project.

**Source Documents:**
- `Instructions.docx` - Project requirements (in parent folder)
- `research1.docx` - Research and design specifications (in parent folder)

## Tech Stack

- **Pure HTML5, CSS3, JavaScript** - No frameworks
- **SVG-based interactive map** - Regions drawn as SVG paths
- **Google Fonts** - Cinzel (headings) + Lato (body)
- **Design Theme** - "Window to the Past" with earthy tones, parchment textures

## File Structure

```
├── index.html      # Main HTML with navigation, timeline, modals
├── styles.css      # Styling with CSS variables, responsive design
├── app.js          # Main application logic, event handling
├── map.js          # SVG map generation, region paths, pan/drag, zoom functions
├── data.js         # All historical events, region data, cultural achievements
├── audio/          # Audio assets (placeholder)
├── images/         # Historical event images
└── README.md       # User documentation
```

## Current Implementation

### 6 World Regions
1. **North America** - class: `north-america`, color: `#E67E22`
   - Includes: Greenland, mainland (Alaska to Central America), Caribbean islands
2. **South America** - class: `south-america`, color: `#16A085`
3. **Europe** - class: `europe`, color: `#3498DB`
   - Includes: British Isles (Great Britain, Ireland), Scandinavia, mainland
4. **Africa** - class: `africa`, color: `#27AE60`
   - Includes: Main continent, Madagascar
5. **Asia** - class: `asia`, color: `#E74C3C`
   - Includes: Middle East, Russia, India, China, Japan, Southeast Asia, Indonesia, Sri Lanka
6. **Oceania** - class: `australia`, color: `#9B59B6`
   - Includes: Australia, New Zealand (North & South Islands), Papua New Guinea

### Timeline System
- Range: 3000 BCE to 2025 CE
- 5 Historical Eras:
  - Ancient Era (-3000 to -500)
  - Classical Era (-500 to 500)
  - Medieval Era (500 to 1500)
  - Early Modern Era (1500 to 1800)
  - Modern Era (1800 to 2025)

### Key Features
- **SVG Markers** - Events rendered inside SVG, scale with map zoom
- **ViewBox Zooming** - Click region → zooms using SVG viewBox (not CSS transform)
- **Drag-to-Pan** - Left-click and drag to pan when zoomed in (like Google Maps)
- **Filtering** - World view shows all markers; continent view filters to that region
- **Modals** - Deep dive info with key figures, cultural significance
- **Info Panel** - Region overview with key facts and cultural achievements
- **Keyboard Navigation** - Number keys (1-6) to select regions, 7 for world view

## Design Decisions

1. **Markers inside SVG** - Fixed bug where markers didn't stick to map during zoom
2. **No hover effects/pulse on markers** - User requested simple, clean markers
3. **6 clean regions only** - Middle East merged into Asia (not a separate continent)
4. **Show markers in world view** - All markers visible, filtered when continent selected
5. **Accurate continent shapes** - SVG paths traced from reference image with proper geography

## SVG Map Details

- **Canvas size**: 1200x600 viewBox
- **Continent paths**: Clean, closed polygons with accurate coastlines
- **Multi-part regions**: Some continents use multiple path segments (e.g., islands)
- **Label positions**: Centered on each continent's visual mass

### Map Path Structure (in `map.js`)
```javascript
const mapPaths = {
    northAmerica: {
        path: "M ... Z M ... Z",  // Multiple closed paths for mainland + islands
        name: 'North America',
        class: 'north-america'
    },
    // ... other regions
};
```

## Data Structure

### Historical Events (in `data.js`)
```javascript
{
    id: 'event-id',
    region: 'region-class',      // e.g., 'north-america', 'asia'
    title: 'Event Title',
    year: 1500,                  // negative for BCE
    position: { x: 20, y: 40 },  // percentage coordinates (0-100)
    icon: '🏛️',
    description: 'Short description',
    details: 'Longer details',
    keyFigures: ['Person 1', 'Person 2'],
    culturalSignificance: 'Why it matters'
}
```

### Region Data (in `data.js`)
```javascript
{
    id: 'region-id',
    name: 'Display Name',
    icon: '🦅',
    color: '#E67E22',
    description: 'Region description',
    keyFacts: [{ icon: '📜', text: 'Fact text' }],
    viewBox: { x: 0, y: 30, width: 400, height: 550 }  // SVG zoom coordinates
}
```

## GitHub Repository

- URL: https://github.com/Khytron/Multimedia-Interactive-World-Map-Project
- Branch: main

## Known Issues / Future Work

- Audio folder is placeholder (no actual audio files yet)
- Trade routes visualization defined in data but not rendered on map
- Empires data defined but timeline visualization not implemented
- Could add more events per region for richer content
- Pan only works when zoomed in (at 1x zoom, no room to pan)

## User Preferences (from conversation)

- Keep map layout clean with only 6 major regions (Middle East merged into Asia)
- No fancy hover effects or animations on markers
- Show markers in world view, filter when continent selected
- Simple tooltip on marker hover is fine
- Accurate continent shapes matching reference image

## Recent Changes

### January 2026
- Merged Middle East into Asia (reduced from 7 to 6 regions)
- Added drag-to-pan navigation (left-click drag when zoomed)
- Improved continent shapes with accurate SVG paths traced from reference image
- Updated keyboard shortcuts (1-6 for regions, 7 for world view)
- Added historical event images in `/images` folder
