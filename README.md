# LUMEN — A Journey Through Light

An immersive, cinematic interactive web experience exploring the nature of light, consciousness, and digital perception.

## 🌐 Live Demo

[https://hongliichun671-lgtm.github.io/lumen-experience/](https://hongliichun671-lgtm.github.io/lumen-experience/)

## Concept

LUMEN is a scroll-driven journey through five scenes:
1. **Origin** — The beginning, a cinematic entrance
2. **The Spectrum** — Interactive exploration of visible light frequencies
3. **Consciousness** — An interactive field representing the mind
4. **Transcendence** — Beyond the visible spectrum
5. **Final Reveal** — The culmination of the journey

## Features

### Visual
- **3D WebGL particle system** with scene-based color grading (background & accent shift as you scroll)
- Particle background with connection lines (spatial grid optimized)
- Scroll-based color shifting across scenes
- Custom cursor with magnetic effects
- Scroll-triggered animations
- Interactive spectrum explorer
- Consciousness field with ripple effects
- Animated counters
- Parallax effects
- Fully responsive design
- Reduced motion support

### Audio
- Ambient drone soundscape (Web Audio API)
- Interactive tones when selecting spectrum colors
- Sound effects on consciousness field interaction
- Audio toggle button

### Language
- **English** and **Khmer (ភាសាខ្មែរ)** support
- Language toggle in navigation
- Persists language preference via localStorage
- Khmer font support (Noto Sans Khmer)

### Gamification & Journey
- **Light Journey progress tracker** — fixed widget showing which of the 5 scenes you've visited, with clickable dots for quick navigation
- **Achievement system** — unlock badges for exploring scenes, interacting with the spectrum, touching the consciousness field, and more
- **Konami Code easter egg** (↑ ↑ ↓ ↓ ← → ← → B A) reveals a hidden "Beyond the Light" scene
- **Progress counter** (e.g., 3/5) updates in real time

### Dynamic Themes
- **Time-of-day theme engine** — the site's palette (background, accent, text) adapts to the current hour:
  - 🌅 Dawn (5–9h): warm orange/rose accents
  - ☀️ Day (9–17h): cool blue accents
  - 🌇 Dusk (17–20h): magenta/pink accents
  - 🌙 Night (20–5h): classic white-on-dark

### PWA
- Installable as a Progressive Web App
- Offline support via service worker
- Install prompt on desktop

## Tech

- Vanilla HTML/CSS/JS
- **Three.js** for 3D WebGL particles
- Canvas 2D for particles (spatial grid optimization)
- Web Audio API for sound
- Intersection Observer for scroll animations
- Web Speech API for speech-to-text (EN/KM)

## Performance Optimizations

- Spatial grid for O(n) particle connection detection (was O(n²))
- Adaptive particle count on mobile devices (1200 vs 2500 on desktop)
- Organic wave motion computed with delta-time normalization
- Debounced window resize
- Reduced particle count on mobile devices
- Passive scroll event listeners

## Deployment

Deployed via GitHub Pages.

## License

MIT
