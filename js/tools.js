/* ============================================
   LUMEN Lab — Tools Page JavaScript
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // Spectrum Calculator
    // ============================================
    const wavelengthInput = document.getElementById('wavelengthInput');
    const wavelengthValue = document.getElementById('wavelengthValue');
    const calcColorPreview = document.getElementById('calcColorPreview');
    const calcColorName = document.getElementById('calcColorName');
    const calcFrequency = document.getElementById('calcFrequency');
    const calcHex = document.getElementById('calcHex');

    function wavelengthToColor(wavelength) {
        let r = 0, g = 0, b = 0;
        
        if (wavelength >= 380 && wavelength < 440) {
            r = -(wavelength - 440) / (440 - 380);
            g = 0;
            b = 1;
        } else if (wavelength >= 440 && wavelength < 490) {
            r = 0;
            g = (wavelength - 440) / (490 - 440);
            b = 1;
        } else if (wavelength >= 490 && wavelength < 510) {
            r = 0;
            g = 1;
            b = -(wavelength - 510) / (510 - 490);
        } else if (wavelength >= 510 && wavelength < 580) {
            r = (wavelength - 510) / (580 - 510);
            g = 1;
            b = 0;
        } else if (wavelength >= 580 && wavelength < 645) {
            r = 1;
            g = -(wavelength - 645) / (645 - 580);
            b = 0;
        } else if (wavelength >= 645 && wavelength <= 750) {
            r = 1;
            g = 0;
            b = 0;
        }
        
        // Intensity falloff
        let factor = 1;
        if (wavelength >= 380 && wavelength < 420) {
            factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
        } else if (wavelength >= 700 && wavelength <= 750) {
            factor = 0.3 + 0.7 * (750 - wavelength) / (750 - 700);
        }
        
        r = Math.round(r * factor * 255);
        g = Math.round(g * factor * 255);
        b = Math.round(b * factor * 255);
        
        return { r, g, b };
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    function getColorName(wavelength) {
        if (wavelength >= 380 && wavelength < 450) return 'Violet';
        if (wavelength >= 450 && wavelength < 495) return 'Blue';
        if (wavelength >= 495 && wavelength < 570) return 'Green';
        if (wavelength >= 570 && wavelength < 590) return 'Yellow';
        if (wavelength >= 590 && wavelength < 620) return 'Orange';
        if (wavelength >= 620 && wavelength <= 750) return 'Red';
        return 'Unknown';
    }

    function updateSpectrum() {
        const wavelength = parseInt(wavelengthInput.value);
        const color = wavelengthToColor(wavelength);
        const hex = rgbToHex(color.r, color.g, color.b);
        const frequency = Math.round(299792458 / (wavelength * 1e-9) / 1e12 * 10) / 10;
        
        wavelengthValue.textContent = wavelength;
        calcColorPreview.style.background = hex;
        calcColorPreview.style.boxShadow = `0 0 40px ${hex}40`;
        calcColorName.textContent = getColorName(wavelength);
        calcFrequency.textContent = frequency + ' THz';
        calcHex.textContent = hex;
    }

    if (wavelengthInput) {
        wavelengthInput.addEventListener('input', updateSpectrum);
        updateSpectrum();
    }

    // ============================================
    // Color Palette Generator
    // ============================================
    const generatePalette = document.getElementById('generatePalette');
    const copyPalette = document.getElementById('copyPalette');
    const paletteDisplay = document.getElementById('paletteDisplay');

    function randomColor() {
        const hue = Math.random() * 360;
        const sat = 60 + Math.random() * 40;
        const light = 40 + Math.random() * 30;
        return hslToHex(hue, sat, light);
    }

    function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return rgbToHex(Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4)));
    }

    function generatePaletteColors() {
        const baseHue = Math.random() * 360;
        const colors = [];
        
        for (let i = 0; i < 5; i++) {
            const hue = (baseHue + i * 30 + Math.random() * 15) % 360;
            const sat = 55 + Math.random() * 35;
            const light = 35 + Math.random() * 35;
            colors.push(hslToHex(hue, sat, light));
        }
        
        return colors;
    }

    function renderPalette(colors) {
        paletteDisplay.innerHTML = '';
        colors.forEach(color => {
            const div = document.createElement('div');
            div.className = 'palette-color';
            div.style.background = color;
            div.innerHTML = `<span>${color}</span>`;
            paletteDisplay.appendChild(div);
        });
    }

    if (generatePalette) {
        generatePalette.addEventListener('click', () => {
            renderPalette(generatePaletteColors());
        });
    }

    if (copyPalette) {
        copyPalette.addEventListener('click', () => {
            const colors = Array.from(paletteDisplay.querySelectorAll('.palette-color span')).map(s => s.textContent);
            if (colors.length > 0) {
                navigator.clipboard.writeText(colors.join(', ')).then(() => {
                    copyPalette.textContent = 'Copied!';
                    setTimeout(() => {
                        copyPalette.textContent = 'Copy Hex Codes';
                    }, 2000);
                });
            }
        });
    }

    // ============================================
    // Light Refraction Simulator
    // ============================================
    const refractionCanvas = document.getElementById('refractionCanvas');
    const refractionIndex = document.getElementById('refractionIndex');
    const refractionIndexValue = document.getElementById('refractionIndexValue');

    if (refractionCanvas) {
        const ctx = refractionCanvas.getContext('2d');
        
        function drawRefraction() {
            const canvas = refractionCanvas;
            const w = canvas.width;
            const h = canvas.height;
            const n = parseFloat(refractionIndex.value);
            
            ctx.clearRect(0, 0, w, h);
            
            // Background
            ctx.fillStyle = '#0a0a12';
            ctx.fillRect(0, 0, w, h);
            
            // Draw interface line (horizontal)
            const interfaceY = h / 2;
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, interfaceY);
            ctx.lineTo(w, interfaceY);
            ctx.stroke();
            
            // Label materials
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText('Air (n=1.00)', 20, interfaceY - 20);
            ctx.fillText(`Material (n=${n.toFixed(2)})`, 20, interfaceY + 30);
            
            // Incident ray (from top-left)
            const startX = 100;
            const startY = 50;
            const incidentAngle = Math.PI / 4; // 45 degrees
            
            // Calculate refracted angle using Snell's Law
            const refractedAngle = Math.asin(Math.sin(incidentAngle) / n);
            
            // Draw incident ray
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(w / 2, interfaceY);
            ctx.stroke();
            
            // Draw refracted ray
            ctx.strokeStyle = '#00aaff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(w / 2, interfaceY);
            ctx.lineTo(w / 2 + Math.sin(refractedAngle) * 200, interfaceY + Math.cos(refractedAngle) * 200);
            ctx.stroke();
            
            // Draw normal line (dashed)
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(w / 2, interfaceY - 100);
            ctx.lineTo(w / 2, interfaceY + 100);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Angle labels
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText('θ₁ = 45°', w / 2 + 20, interfaceY - 20);
            ctx.fillText(`θ₂ = ${(refractedAngle * 180 / Math.PI).toFixed(1)}°`, w / 2 + 20, interfaceY + 30);
        }
        
        refractionIndex.addEventListener('input', () => {
            refractionIndexValue.textContent = parseFloat(refractionIndex.value).toFixed(2);
            drawRefraction();
        });
        
        drawRefraction();
    }

    // ============================================
    // Ambient Sound Generator
    // ============================================
    const ambientPlay = document.getElementById('ambientPlay');
    const ambientStop = document.getElementById('ambientStop');
    const ambientLow = document.getElementById('ambientLow');
    const ambientMid = document.getElementById('ambientMid');
    const ambientHigh = document.getElementById('ambientHigh');
    
    let ambientCtx = null;
    let ambientNodes = [];
    let ambientPlaying = false;

    function startAmbient() {
        if (ambientPlaying) return;
        
        try {
            ambientCtx = new (window.AudioContext || window.webkitAudioContext)();
            ambientPlaying = true;
            
            const masterGain = ambientCtx.createGain();
            masterGain.gain.value = 0.1;
            masterGain.connect(ambientCtx.destination);
            
            // Low frequency oscillator
            const oscLow = ambientCtx.createOscillator();
            oscLow.type = 'sine';
            oscLow.frequency.value = 55;
            const gainLow = ambientCtx.createGain();
            gainLow.gain.value = parseFloat(ambientLow.value) / 100;
            oscLow.connect(gainLow);
            gainLow.connect(masterGain);
            oscLow.start();
            
            // Mid frequency oscillator
            const oscMid = ambientCtx.createOscillator();
            oscMid.type = 'sine';
            oscMid.frequency.value = 220;
            const gainMid = ambientCtx.createGain();
            gainMid.gain.value = parseFloat(ambientMid.value) / 100;
            oscMid.connect(gainMid);
            gainMid.connect(masterGain);
            oscMid.start();
            
            // High frequency oscillator
            const oscHigh = ambientCtx.createOscillator();
            oscHigh.type = 'sine';
            oscHigh.frequency.value = 440;
            const gainHigh = ambientCtx.createGain();
            gainHigh.gain.value = parseFloat(ambientHigh.value) / 100;
            oscHigh.connect(gainHigh);
            gainHigh.connect(masterGain);
            oscHigh.start();
            
            ambientNodes = [oscLow, oscMid, oscHigh, gainLow, gainMid, gainHigh, masterGain];
            
            ambientPlay.textContent = '⏸ Pause';
        } catch (e) {
            console.warn('Audio not supported:', e);
        }
    }

    function stopAmbient() {
        if (!ambientPlaying) return;
        
        ambientNodes.forEach(node => {
            try {
                if (node.stop) node.stop();
                if (node.disconnect) node.disconnect();
            } catch (e) {}
        });
        ambientNodes = [];
        ambientPlaying = false;
        
        if (ambientCtx) {
            ambientCtx.close();
            ambientCtx = null;
        }
        
        ambientPlay.textContent = '▶ Play';
    }

    if (ambientPlay) {
        ambientPlay.addEventListener('click', () => {
            if (ambientPlaying) {
                stopAmbient();
            } else {
                startAmbient();
            }
        });
    }

    if (ambientStop) {
        ambientStop.addEventListener('click', stopAmbient);
    }

    // Update gains when sliders change
    function updateAmbientGains() {
        if (!ambientPlaying || ambientNodes.length < 7) return;
        
        ambientNodes[3].gain.value = parseFloat(ambientLow.value) / 100;
        ambientNodes[4].gain.value = parseFloat(ambientMid.value) / 100;
        ambientNodes[5].gain.value = parseFloat(ambientHigh.value) / 100;
    }

    if (ambientLow) ambientLow.addEventListener('input', updateAmbientGains);
    if (ambientMid) ambientMid.addEventListener('input', updateAmbientGains);
    if (ambientHigh) ambientHigh.addEventListener('input', updateAmbientGains);

})();
