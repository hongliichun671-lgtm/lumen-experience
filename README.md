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

## Tech

- Vanilla HTML/CSS/JS
- Canvas 2D for particles (spatial grid optimization)
- Web Audio API for sound
- Intersection Observer for scroll animations
- No external dependencies

## Performance Optimizations

- Spatial grid for O(n) particle connection detection (was O(n²))
- Debounced window resize
- Reduced particle count on mobile devices
- Passive scroll event listeners

## Deployment

Deployed via GitHub Pages.

## License

MIT
