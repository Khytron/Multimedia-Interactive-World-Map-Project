# Interactive World Map: Culture & History

An educational interactive web application that allows users to explore world regions (Asia, Middle East, Europe, Africa, Australia) to learn about culture and history.

## Features

- **Interactive World Map**: Click on regions to explore detailed cultural and historical information
- **Drag-to-Pan Navigation**: Click and drag to pan around the map like Google Maps (desktop and mobile touch supported)
- **Timeline Slider**: Travel through time from 3000 BCE to present day
- **6 World Regions**: North America, South America, Europe, Africa, Asia, and Oceania with unique content
- **Cultural Markers**: Interactive markers showing historical events and cultural achievements
- **Deep Dive Modals**: Detailed information about historical events, key figures, and cultural significance
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation and WCAG 2.1 compliance features

## Project Structure

```
Interactive World Map Web/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with earthy tones and parchment theme
├── app.js              # Main application logic
├── map.js              # SVG map generation and rendering
├── data.js             # Historical and cultural data
├── audio/              # Audio files for ambient sounds
├── images/             # Image assets
└── README.md           # This file
```

## How to Use

1. **Open the Application**: Open `index.html` in a modern web browser
2. **Navigate Regions**: Click on region buttons or click directly on the map
3. **Pan the Map**: Click and hold left mouse button, then drag to pan around the map (also works with touch on mobile)
4. **Explore Timeline**: Drag the timeline slider to explore different historical eras
5. **View Events**: Click on cultural markers (golden circles) to see detailed information
6. **Keyboard Shortcuts**:
   - `1-7`: Quick navigation to regions
   - `←/→ Arrow keys`: Navigate timeline
   - `Escape`: Close modals/panels

## Historical Eras

- **Ancient Era** (3000 BCE - 500 BCE): Pyramids, Babylon, Indus Valley, Shang Dynasty
- **Classical Era** (500 BCE - 500 CE): Greek Democracy, Silk Road, Roman Empire
- **Medieval Era** (500 - 1500 CE): Islamic Golden Age, Tang Dynasty, Mali Empire, Renaissance
- **Early Modern Era** (1500 - 1800 CE): Mughal Empire, Ottoman Empire, Edo Japan, Enlightenment
- **Modern Era** (1800 - Present): Industrial Revolution, Independence Movements, EU Formation

## Technical Stack

- Pure HTML5, CSS3, and JavaScript (no frameworks required)
- SVG-based interactive map
- CSS Grid and Flexbox for responsive layout
- CSS Custom Properties for theming
- Google Fonts (Cinzel and Lato)

## Design Philosophy

Following the research specifications:
- **"Window to the Past"** concept with earthy tones and parchment textures
- **Cinzel** (Serif) for historical headings
- **Lato** (Sans-serif) for body text legibility
- Cultural icons (Pagodas, Mosques, Colosseums) for rapid recognition

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Credits

This project was created as part of the FOM Interactive World Map educational initiative.

© 2025 Interactive World Map Project

---

## Changelog

### v1.2.0 (January 2026)
- Merged Middle East into Asia (6 regions total)
- Updated region data and cultural achievements

### v1.1.0 (January 2026)
- Added drag-to-pan map navigation (Google Maps style)
- Touch support for mobile devices
- Updated from 5 to 7 world regions
