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
├── map.js          # SVG map generation, region paths, zoom functions
├── data.js         # All historical events, region data, cultural achievements
├── audio/          # Audio assets (placeholder)
├── images/         # Image assets (placeholder)
└── README.md       # User documentation
```

## Current Implementation

### 7 World Regions
1. **North America** - class: `north-america`, color: `#E67E22`
2. **South America** - class: `south-america`, color: `#16A085`
3. **Europe** - class: `europe`, color: `#3498DB`
4. **Africa** - class: `africa`, color: `#27AE60`
5. **Middle East** - class: `middle-east`, color: `#F39C12`
6. **Asia** - class: `asia`, color: `#E74C3C`
7. **Oceania** - class: `australia`, color: `#9B59B6`

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
- **Filtering** - World view shows all markers; continent view filters to that region
- **Modals** - Deep dive info with key figures, cultural significance
- **Info Panel** - Region overview with key facts and cultural achievements

## Design Decisions

1. **Markers inside SVG** - Fixed bug where markers didn't stick to map during zoom
2. **No hover effects/pulse on markers** - User requested simple, clean markers
3. **7 clean regions only** - User wanted simple continent shapes, not sub-regions
4. **Show markers in world view** - All markers visible, filtered when continent selected

## Data Structure

### Historical Events (in `data.js`)
```javascript
{
    id: 'event-id',
    region: 'region-class',      // e.g., 'north-america'
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
    viewBox: { x: 20, y: 30, width: 320, height: 280 }  // SVG zoom coordinates
}
```

## GitHub Repository

- URL: https://github.com/Khytron/Multimedia-Interactive-World-Map-Project
- Branch: main

## Known Issues / Future Work

- Audio/images folders are placeholders (no actual media files yet)
- Trade routes visualization defined in data but not rendered on map
- Empires data defined but timeline visualization not implemented
- Could add more events per region for richer content

## User Preferences (from conversation)

- Keep map layout clean with only 7 major regions
- No fancy hover effects or animations on markers
- Show markers in world view, filter when continent selected
- Simple tooltip on marker hover is fine
