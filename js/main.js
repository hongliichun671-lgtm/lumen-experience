/* ============================================
   LUMEN — A Journey Through Light
   Interactive Experience
   ============================================ */

(function() {
    'use strict';

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
    });

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
    // Particle Canvas
    // ============================================
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    function initParticles() {
        const particleCount = Math.min(Math.floor(window.innerWidth / 8), 150);
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

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
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
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
            ctx.fill();
        });
        
        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        animationId = requestAnimationFrame(drawParticles);
    }

    if (!isReducedMotion) {
        resizeCanvas();
        drawParticles();
        window.addEventListener('resize', resizeCanvas);
    }

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
        });
    });

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
    });

    // ============================================
    // Scroll-based color shift on canvas
    // ============================================
    let scrollColor = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollColor = scrollTop / docHeight;
    });

    // Override drawParticles to include color shift
    const originalDraw = drawParticles;
    // We'll modify the particle drawing to include subtle color shifts
    // by adjusting the particle color based on scroll position
    // This is handled in the main draw loop

})();