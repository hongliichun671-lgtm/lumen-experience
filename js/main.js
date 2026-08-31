/* ============================================
   LUMEN — A Journey Through Light
   Interactive Experience
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // Language Support (EN/KM)
    // ============================================
    const translations = {
        en: {
            preloaderSub: 'Awakening...',
            navOrigin: 'Origin',
            navSpectrum: 'Spectrum',
            navConsciousness: 'Consciousness',
            navTranscend: 'Transcend',
            originBadge: 'An Interactive Experience',
            originSubtitle: 'Scroll to begin your descent into the luminous depths of perception.',
            scroll: 'Scroll',
            spectrumLabel: '01 — The Spectrum',
            spectrumTitle: 'Every color is a frequency of light.',
            spectrumDesc: 'What you perceive as color is merely your mind interpreting electromagnetic waves. Move through the spectrum and discover what lies beyond the visible.',
            consciousnessLabel: '02 — Consciousness',
            consciousnessTitle: 'The mind is a luminous field.',
            consciousnessDesc: 'Your consciousness is not a thing, but a process — a continuous flow of perception, thought, and awareness. Interact with the field below.',
            fieldLabel: 'Touch the field',
            transcendLabel: '03 — Transcendence',
            transcendTitle: 'Beyond the visible.',
            transcendDesc: 'There is a universe beyond what your eyes can see. A spectrum of light that exists outside your perception.',
            finalTitle: 'You have seen the light.',
            finalSubtitle: 'LUMEN is an exploration of perception, consciousness, and the infinite spectrum of existence.',
            returnOrigin: 'Return to Origin',
            finalFooter: 'An Interactive Experience'
        },
        km: {
            preloaderSub: 'កំពុងភ្ញាក់...',
            navOrigin: 'ប្រភព',
            navSpectrum: 'វិសាលគម',
            navConsciousness: 'មនសិការ',
            navTranscend: 'ឆ្លងផុត',
            originBadge: 'បទពិសោធន៍អន្តរកម្ម',
            originSubtitle: 'រមូរដើម្បីចាប់ផ្តើមដំណើរចូលទៅក្នុងជម្រៅដ៏ភ្លឺស្វាងនៃការយល់ឃើញ។',
            scroll: 'រមូរ',
            spectrumLabel: '០១ — វិសាលគម',
            spectrumTitle: 'ពណ៌នីមួយៗគឺជាប្រេកង់នៃពន្លឺ។',
            spectrumDesc: 'អ្វីដែលអ្នកយល់ឃើញថាជាពណ៌ គឺគ្រាន់តែជាការបកស្រាយរលកអេឡិចត្រូម៉ាញ៉េទិចដោយគំនិតរបស់អ្នកប៉ុណ្ណោះ។ ផ្លាស់ទីតាមវិសាលគម ហើយស្វែងរកអ្វីដែលនៅហួសពីអ្វីដែលអាចមើលឃើញ។',
            consciousnessLabel: '០២ — មនសិការ',
            consciousnessTitle: 'គំនិតគឺជាវាលដ៏ភ្លឺស្វាង។',
            consciousnessDesc: 'មនសិការរបស់អ្នកមិនមែនជាវត្ថុទេ ប៉ុន្តែជាដំណើរការ — លំហូរបន្តនៃការយល់ឃើញ ការគិត និងការដឹងខ្លួន។ ធ្វើអន្តរកម្មជាមួយវាលខាងក្រោម។',
            fieldLabel: 'ប៉ះវាល',
            transcendLabel: '០៣ — ឆ្លងផុត',
            transcendTitle: 'ហួសពីអ្វីដែលអាចមើលឃើញ។',
            transcendDesc: 'មានសកលលោកមួយហួសពីអ្វីដែលភ្នែករបស់អ្នកអាចមើលឃើញ។ វិសាលគមនៃពន្លឺដែលមាននៅខាងក្រៅការយល់ឃើញរបស់អ្នក។',
            finalTitle: 'អ្នកបានឃើញពន្លឺហើយ។',
            finalSubtitle: 'LUMEN គឺជាការស្វែងយល់អំពីការយល់ឃើញ មនសិការ និងវិសាលគមគ្មានកំណត់នៃអត្ថិភាព។',
            returnOrigin: 'ត្រឡប់ទៅប្រភព',
            finalFooter: 'បទពិសោធន៍អន្តរកម្ម'
        }
    };

    let currentLang = 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) el.textContent = t[key];
        });
        
        // Update document lang
        document.documentElement.lang = lang;
        
        // Update language toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Save preference
        localStorage.setItem('lumen-lang', lang);
    }

    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.dataset.lang);
        });
    });

    // Load saved language
    const savedLang = localStorage.getItem('lumen-lang');
    if (savedLang && translations[savedLang]) {
        applyLanguage(savedLang);
    }

    // ============================================
    // Preloader
    // ============================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });

    // Fallback: hide preloader after 3s regardless
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ============================================
    // Custom Cursor
    // ============================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover states for cursor
    const hoverTargets = document.querySelectorAll('a, button, .spectrum-card, .consciousness-field, .btn-magnetic');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        target.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    // ============================================
    // Navigation
    // ============================================
    const nav = document.getElementById('nav');
    const navProgress = document.getElementById('navProgress');

    window.addEventListener('scroll', () => {
        // Nav background
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Progress bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        navProgress.style.width = progress + '%';
    }, { passive: true });

    // Smooth scroll for nav links
    document.querySelectorAll('[data-scroll]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // Scene Visibility (Intersection Observer)
    // ============================================
    const scenes = document.querySelectorAll('.scene');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    scenes.forEach(scene => observer.observe(scene));

    // ============================================
    // Particle Canvas (Optimized)
    // ============================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scrollProgress = 0;
    let resizeTimeout;

    // Scroll-based color palette
    const scrollColors = [
        { r: 255, g: 255, b: 255 },   // White (Origin)
        { r: 255, g: 136, b: 0 },     // Orange (Spectrum)
        { r: 0, g: 170, b: 255 },     // Blue (Consciousness)
        { r: 136, g: 0, b: 255 },     // Violet (Transcendence)
        { r: 255, g: 255, b: 255 }    // White (Final)
    ];

    function getScrollColor(progress) {
        const idx = Math.min(Math.floor(progress * (scrollColors.length - 1)), scrollColors.length - 2);
        const t = progress * (scrollColors.length - 1) - idx;
        const c1 = scrollColors[idx];
        const c2 = scrollColors[idx + 1];
        return {
            r: Math.round(c1.r + (c2.r - c1.r) * t),
            g: Math.round(c1.g + (c2.g - c1.g) * t),
            b: Math.round(c1.b + (c2.b - c1.b) * t)
        };
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    // Debounced resize
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
    });

    function initParticles() {
        // Optimized particle count based on device
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile
            ? Math.min(Math.floor(window.innerWidth / 12), 80)
            : Math.min(Math.floor(window.innerWidth / 8), 120);
        
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    // Spatial grid optimization for connection lines
    const CONNECTION_DIST = 100;
    const GRID_CELL = CONNECTION_DIST;

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const color = getScrollColor(scrollProgress);
        
        // Build spatial grid
        const grid = {};
        const cols = Math.ceil(canvas.width / GRID_CELL);
        const rows = Math.ceil(canvas.height / GRID_CELL);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;
            
            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            const pulseOpacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);
            
            // Draw particle with scroll color
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${pulseOpacity})`;
            ctx.fill();
            
            // Add to grid
            const gx = Math.floor(p.x / GRID_CELL);
            const gy = Math.floor(p.y / GRID_CELL);
            const key = gx + ',' + gy;
            if (!grid[key]) grid[key] = [];
            grid[key].push(p);
        });
        
        // Draw connecting lines using spatial grid (O(n) instead of O(n²))
        particles.forEach(p => {
            const gx = Math.floor(p.x / GRID_CELL);
            const gy = Math.floor(p.y / GRID_CELL);
            
            // Check neighboring cells
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const neighbors = grid[(gx + dx) + ',' + (gy + dy)];
                    if (!neighbors) continue;
                    
                    neighbors.forEach(other => {
                        if (other === p) return;
                        const dist = Math.sqrt((p.x - other.x) ** 2 + (p.y - other.y) ** 2);
                        if (dist < CONNECTION_DIST) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.08 * (1 - dist / CONNECTION_DIST)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    });
                }
            }
        });
        
        animationId = requestAnimationFrame(drawParticles);
    }

    if (!isReducedMotion) {
        resizeCanvas();
        drawParticles();
    }

    // ============================================
    // Scroll Progress Tracking
    // ============================================
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    }, { passive: true });

    // ============================================
    // Spectrum Interaction
    // ============================================
    const spectrumCards = document.querySelectorAll('.spectrum-card');
    const spectrumMarker = document.getElementById('spectrumMarker');
    const spectrumWavelength = document.getElementById('spectrumWavelength');
    const spectrumName = document.getElementById('spectrumName');
    const spectrumFrequency = document.getElementById('spectrumFrequency');

    spectrumCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all
            spectrumCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Update spectrum info
            const color = card.dataset.color;
            const name = card.dataset.name;
            const wavelength = card.dataset.wavelength;
            const frequency = card.dataset.frequency;
            
            spectrumWavelength.textContent = wavelength;
            spectrumName.textContent = name;
            spectrumFrequency.textContent = frequency;
            
            // Move marker along the bar
            const colors = ['#ff0000', '#ff8800', '#ffee00', '#00ff44', '#00aaff', '#8800ff'];
            const index = colors.indexOf(color);
            const position = (index / (colors.length - 1)) * 100;
            spectrumMarker.style.left = position + '%';
            
            // Update marker color
            spectrumMarker.style.background = color;
            spectrumMarker.style.boxShadow = `0 0 20px ${color}`;
            
            // Play sound for color
            playColorSound(index);
        });
    });

    // ============================================
    // Audio Experience (Web Audio API)
    // ============================================
    let audioCtx = null;
    let audioStarted = false;
    let ambientNodes = [];

    function initAudio() {
        if (audioStarted) return;
        audioStarted = true;
        
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create ambient drone
            const masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.05;
            masterGain.connect(audioCtx.destination);
            
            // Low frequency drone
            const osc1 = audioCtx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.value = 55; // A1
            
            const osc2 = audioCtx.createOscillator();
            osc2.type = 'sine';
            osc2.frequency.value = 82.41; // E2
            
            const osc3 = audioCtx.createOscillator();
            osc3.type = 'sine';
            osc3.frequency.value = 110; // A2
            
            // Add subtle detune for richness
            osc1.detune.value = -5;
            osc2.detune.value = 3;
            osc3.detune.value = 7;
            
            // Lowpass filter for warmth
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 800;
            
            osc1.connect(filter);
            osc2.connect(filter);
            osc3.connect(filter);
            filter.connect(masterGain);
            
            osc1.start();
            osc2.start();
            osc3.start();
            
            ambientNodes = [osc1, osc2, osc3, masterGain, filter];
            
            // Update audio toggle button
            const audioBtn = document.getElementById('audioToggle');
            if (audioBtn) {
                audioBtn.classList.add('active');
                audioBtn.querySelector('.audio-icon').textContent = '♪';
            }
        } catch (e) {
            console.warn('Audio not supported:', e);
        }
    }

    function stopAudio() {
        if (!audioCtx) return;
        
        ambientNodes.forEach(node => {
            try {
                if (node.stop) node.stop();
                if (node.disconnect) node.disconnect();
            } catch (e) {}
        });
        ambientNodes = [];
        audioStarted = false;
        
        const audioBtn = document.getElementById('audioToggle');
        if (audioBtn) {
            audioBtn.classList.remove('active');
            audioBtn.querySelector('.audio-icon').textContent = '♪';
        }
    }

    // Audio toggle button
    const audioToggle = document.getElementById('audioToggle');
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            if (audioStarted) {
                stopAudio();
            } else {
                initAudio();
            }
        });
    }

    // Play a tone when selecting a spectrum color
    function playColorSound(index) {
        if (!audioCtx || !audioStarted) return;
        
        const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 493.88]; // C4, D4, E4, G4, A4, B4
        const freq = frequencies[index] || 440;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
    }

    // ============================================
    // Consciousness Field Interaction
    // ============================================
    const field = document.getElementById('consciousnessField');
    const fieldOrb = document.getElementById('fieldOrb');
    const fieldRipple = document.getElementById('fieldRipple');

    field.addEventListener('click', (e) => {
        // Create ripple
        fieldRipple.classList.remove('active');
        void fieldRipple.offsetWidth;
        fieldRipple.classList.add('active');
        
        // Orb burst effect
        fieldOrb.style.transform = 'scale(1.3)';
        fieldOrb.style.boxShadow = '0 0 100px rgba(255, 255, 255, 0.6)';
        
        setTimeout(() => {
            fieldOrb.style.transform = '';
            fieldOrb.style.boxShadow = '';
        }, 300);
        
        // Play sound
        if (audioCtx && audioStarted) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(220, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1);
        }
    });

    // Mouse move effect on field
    field.addEventListener('mousemove', (e) => {
        const rect = field.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        fieldOrb.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    field.addEventListener('mouseleave', () => {
        fieldOrb.style.transform = '';
    });

    // ============================================
    // Magnetic Button
    // ============================================
    const magneticBtn = document.querySelector('.btn-magnetic');
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            magneticBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        magneticBtn.addEventListener('mouseleave', () => {
            magneticBtn.style.transform = '';
        });
    }

    // ============================================
    // Counter Animation
    // ============================================
    const statValues = document.querySelectorAll('.stat-value[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                const duration = 2000;
                const start = performance.now();
                
                function updateCounter(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const value = Math.floor(eased * target);
                    entry.target.textContent = value;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => counterObserver.observe(stat));

    // ============================================
    // Parallax Effect on Scroll
    // ============================================
    const parallaxElements = document.querySelectorAll('.transcend-visual, .consciousness-field');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            const offset = center * -0.05;
            el.style.transform = `translateY(${offset}px)`;
        });
    }, { passive: true });

})();