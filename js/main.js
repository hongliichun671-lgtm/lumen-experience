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
            preloaderSub: 'កំពុងត្រៀម...',
            navOrigin: 'ដើម',
            navSpectrum: 'វិសាលគម',
            navConsciousness: 'ស្មារតី',
            navTranscend: '超越',
            originBadge: 'បទពិសោធន៍អន្តរកម្ម',
            originSubtitle: 'រមូរចុះដើម្បីចាប់ផ្តើមការចុះទៅក្នុងជម្រៅនៃការយល់ឃើញ។',
            scroll: 'រមូរ',
            spectrumLabel: '០១ — វិសាលគម',
            spectrumTitle: 'ពណ៌គ្រប់ពណ៌គឺជាប្រេកង់នៃពន្លឺ។',
            spectrumDesc: 'អ្វីដែលអ្នកចាត់ទុកថាជាពណ៌គឺជាគំនិតរបស់អ្នកដែលបកស្រាយរលកអេឡិចត្រូម៉ាញ៉េទិច។',
            consciousnessLabel: '០២ — ស្មារតី',
            consciousnessTitle: 'ចិត្តគឺជាវាលពន្លឺ។',
            consciousnessDesc: 'ស្មារតីរបស់អ្នកមិនមែនជារបស់វត្ថុទេ តែជាគ្រប់ដំណើរការ។',
            fieldLabel: 'ប៉ះវាល',
            transcendLabel: '០៣ — ប្រសើរជាងនេះ',
            transcendTitle: 'លើសពីដែលអាចមើលឃើញ។',
            transcendDesc: 'មានចក្រវាលក្រៅពីអ្វីដែលភ្នែកអ្នកអាចមើលឃើញ។',
            finalTitle: 'អ្នកបានឃើញពន្លឺហើយ។',
            finalSubtitle: 'LUMEN គឺជាការរុករកនៃការយល់ឃើញ។',
            returnOrigin: 'ត្រឡប់ទៅដើម',
            finalFooter: 'បទពិសោធន៍អន្តរកម្ម'
        }
    };

    let currentLang = 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) el.textContent = t[key];
        });
        
        document.documentElement.lang = lang;
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        localStorage.setItem('lumen-lang', lang);
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.dataset.lang);
        });
    });

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
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        navProgress.style.width = progress + '%';
    }, { passive: true });

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
    // Scene Visibility
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
    // Particle Canvas
    // ============================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scrollProgress = 0;
    let resizeTimeout;

    const scrollColors = [
        { r: 255, g: 255, b: 255 },
        { r: 255, g: 136, b: 0 },
        { r: 0, g: 170, b: 255 },
        { r: 136, g: 0, b: 255 },
        { r: 255, g: 255, b: 255 }
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

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
    });

    function initParticles() {
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

    const CONNECTION_DIST = 100;
    const GRID_CELL = CONNECTION_DIST;

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const color = getScrollColor(scrollProgress);
        const grid = {};
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;
            
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            const pulseOpacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${pulseOpacity})`;
            ctx.fill();
            
            const gx = Math.floor(p.x / GRID_CELL);
            const gy = Math.floor(p.y / GRID_CELL);
            const key = gx + ',' + gy;
            if (!grid[key]) grid[key] = [];
            grid[key].push(p);
        });
        
        particles.forEach(p => {
            const gx = Math.floor(p.x / GRID_CELL);
            const gy = Math.floor(p.y / GRID_CELL);
            
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
            spectrumCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const color = card.dataset.color;
            const name = card.dataset.name;
            const wavelength = card.dataset.wavelength;
            const frequency = card.dataset.frequency;
            
            spectrumWavelength.textContent = wavelength;
            spectrumName.textContent = name;
            spectrumFrequency.textContent = frequency;
            
            const colors = ['#ff0000', '#ff8800', '#ffee00', '#00ff44', '#00aaff', '#8800ff'];
            const index = colors.indexOf(color);
            const position = (index / (colors.length - 1)) * 100;
            spectrumMarker.style.left = position + '%';
            
            spectrumMarker.style.background = color;
            spectrumMarker.style.boxShadow = `0 0 20px ${color}`;
            
            playColorSound(index);
        });
    });

    // ============================================
    // Audio Experience
    // ============================================
    let audioCtx = null;
    let audioStarted = false;
    let ambientNodes = [];

    function initAudio() {
        if (audioStarted) return;
        audioStarted = true;
        
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            const masterGain = audioCtx.createGain();
            masterGain.gain.value = 0.05;
            masterGain.connect(audioCtx.destination);
            
            const osc1 = audioCtx.createOscillator();
            osc1.type = 'sine';
            osc1.frequency.value = 55;
            
            const osc2 = audioCtx.createOscillator();
            osc2.type = 'sine';
            osc2.frequency.value = 82.41;
            
            const osc3 = audioCtx.createOscillator();
            osc3.type = 'sine';
            osc3.frequency.value = 110;
            
            osc1.detune.value = -5;
            osc2.detune.value = 3;
            osc3.detune.value = 7;
            
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
            
            const audioBtn = document.getElementById('audioToggle');
            if (audioBtn) {
                audioBtn.classList.add('active');
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
        }
    }

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

    function playColorSound(index) {
        if (!audioCtx || !audioStarted) return;
        
        const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 493.88];
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
    // Speech-to-Text with Web Speech API - Production Ready
    // ============================================
    let speechRecognition = null;
    let speechListening = false;
    const speechToggle = document.getElementById('speechToggle');
    let speechOutput = document.getElementById('speechOutput');

    // Create speech UI if not exists
    if (!speechOutput) {
        speechOutput = document.createElement('div');
        speechOutput.id = 'speechOutput';
        speechOutput.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(5,5,8,0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: #fff;
            padding: 16px 24px;
            border-radius: 16px;
            border: 1px solid rgba(255,255,255,0.1);
            font-size: 0.95rem;
            max-width: 90%;
            width: 560px;
            text-align: left;
            display: none;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
        `;
        document.body.appendChild(speechOutput);
    }

    function getSpeechLang() {
        return currentLang === 'km' ? 'km-KH' : 'en-US';
    }

    function initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            showSpeechOutput('Speech Recognition not supported. Use Chrome/Edge.', true);
            return null;
        }
        
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = getSpeechLang();
        
        return recognition;
    }

    function showSpeechOutput(text, isError = false) {
        if (!speechOutput) return;
        speechOutput.innerHTML = isError 
            ? `<div style="color:#ff6b6b;font-weight:500;">⚠ ${text}</div>`
            : `<div style="display:flex;align-items:flex-start;gap:12px;">
                <div style="width:8px;height:8px;background:#fff;border-radius:50%;margin-top:6px;animation:pulse 1.5s infinite;box-shadow:0 0 12px rgba(255,255,255,0.8);"></div>
                <div style="flex:1;">${text || 'Listening...'}</div>
               </div>`;
        speechOutput.style.display = 'block';
    }

    function hideSpeechOutput() {
        if (speechOutput) speechOutput.style.display = 'none';
    }

    if (speechToggle) {
        speechToggle.addEventListener('click', async () => {
            if (!speechRecognition) {
                speechRecognition = initSpeechRecognition();
                if (!speechRecognition) return;
                
                speechRecognition.onresult = (event) => {
                    let interimTranscript = '';
                    let finalTranscript = '';
                    
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript + ' ';
                        } else {
                            interimTranscript += transcript;
                        }
                    }
                    
                    if (finalTranscript) {
                        showSpeechOutput(`<strong>Final:</strong> ${finalTranscript.trim()}`);
                        console.log('Speech Final:', finalTranscript);
                        // Auto-hide after 3s
                        setTimeout(() => {
                            if (!speechListening) hideSpeechOutput();
                        }, 3000);
                    } else if (interimTranscript) {
                        showSpeechOutput(`<em>Listening:</em> ${interimTranscript}`);
                    }
                };
                
                speechRecognition.onerror = (event) => {
                    console.error('Speech error:', event.error);
                    let msg = 'Speech error';
                    if (event.error === 'not-allowed') msg = 'Microphone access denied. Please allow microphone.';
                    if (event.error === 'no-speech') msg = 'No speech detected. Try again.';
                    if (event.error === 'network') msg = 'Network error. Check connection.';
                    showSpeechOutput(msg, true);
                    speechListening = false;
                    speechToggle.classList.remove('active');
                    speechToggle.setAttribute('aria-pressed', 'false');
                };
                
                speechRecognition.onend = () => {
                    if (speechListening) {
                        // Auto-restart
                        try {
                            speechRecognition.start();
                        } catch(e){}
                    }
                };
            }
            
            if (!speechListening) {
                try {
                    speechRecognition.lang = getSpeechLang();
                    await speechRecognition.start();
                    speechListening = true;
                    speechToggle.classList.add('active');
                    speechToggle.setAttribute('aria-pressed', 'true');
                    showSpeechOutput('🎤 Listening... Speak now');
                } catch (e) {
                    console.error(e);
                    showSpeechOutput('Failed to start. Check microphone permission.', true);
                }
            } else {
                speechRecognition.stop();
                speechListening = false;
                speechToggle.classList.remove('active');
                speechToggle.setAttribute('aria-pressed', 'false');
                hideSpeechOutput();
            }
        });
    }

    // ============================================
    // Consciousness Field
    // ============================================
    const field = document.getElementById('consciousnessField');
    const fieldOrb = document.getElementById('fieldOrb');
    const fieldRipple = document.getElementById('fieldRipple');

    field.addEventListener('click', (e) => {
        fieldRipple.classList.remove('active');
        void fieldRipple.offsetWidth;
        fieldRipple.classList.add('active');
        
        fieldOrb.style.transform = 'scale(1.3)';
        fieldOrb.style.boxShadow = '0 0 100px rgba(255, 255, 255, 0.6)';
        
        setTimeout(() => {
            fieldOrb.style.transform = '';
            fieldOrb.style.boxShadow = '';
        }, 300);
        
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
    // Parallax Effect
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
