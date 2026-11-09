/* ============================================
   LUMEN — Enhanced Features Module
   PWA + Konami Easter Egg + 3D Transcendence
   + Light Journey Tracker + Time-of-Day Themes
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // 1. PWA Service Worker Registration
  // ============================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('✨ LUMEN SW registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('SW registration failed:', err);
        });
    });
  }

  // PWA Install Prompt
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(showInstallPrompt, 5000);
  });

  function showInstallPrompt() {
    if (!deferredPrompt) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (sessionStorage.getItem('pwa-install-dismissed')) return;

    const prompt = document.createElement('div');
    prompt.className = 'pwa-install-prompt';
    prompt.innerHTML = `
      <div class="pwa-install-text">
        <strong>Install LUMEN</strong>
        <span>Add to home screen for offline access</span>
      </div>
      <button class="pwa-install-btn" id="pwaInstallBtn">Install</button>
      <button class="pwa-install-close" id="pwaCloseBtn" aria-label="Close">×</button>
    `;
    document.body.appendChild(prompt);

    document.getElementById('pwaInstallBtn').addEventListener('click', async () => {
      prompt.classList.add('hide');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') console.log('PWA installed');
      deferredPrompt = null;
      setTimeout(() => prompt.remove(), 500);
    });

    document.getElementById('pwaCloseBtn').addEventListener('click', () => {
      prompt.classList.add('hide');
      sessionStorage.setItem('pwa-install-dismissed', 'true');
      setTimeout(() => prompt.remove(), 500);
    });
  }

  // Detect if running as PWA
  window.addEventListener('appinstalled', () => {
    console.log('🎉 LUMEN installed as PWA');
    deferredPrompt = null;
  });

  function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  }
  if (isPWA()) {
    document.documentElement.classList.add('pwa-mode');
  }

  // ============================================
  // 2. Konami Code Easter Egg
  // ↑ ↑ ↓ ↓ ← → ← → B A
  // ============================================
  const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let konamiIndex = 0;
  let konamiUnlocked = sessionStorage.getItem('konami-unlocked') === 'true';

  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI_CODE[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI_CODE.length) {
        konamiIndex = 0;
        triggerKonamiEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerKonamiEasterEgg() {
    if (konamiUnlocked) {
      showSecretScene();
      return;
    }
    konamiUnlocked = true;
    sessionStorage.setItem('konami-unlocked', 'true');

    showKonamiNotification();
    showAchievement('👁️', 'Seeker of Secrets', 'You discovered the hidden path');
    setTimeout(() => {
      showSecretScene();
      unlockAchievement('secret-finder', '👁️', 'Seeker of Secrets', 'Discovered the hidden Konami code');
    }, 1500);
  }

  function showKonamiNotification() {
    const note = document.createElement('div');
    note.className = 'konami-notification';
    note.innerHTML = `
      <div class="konami-icon">✨</div>
      <div>
        <strong>Secret Unlocked</strong><br>
        <small style="color: rgba(255,255,255,0.6);">Hidden scene revealed</small>
      </div>
    `;
    document.body.appendChild(note);
    setTimeout(() => {
      note.classList.add('hide');
      setTimeout(() => note.remove(), 500);
    }, 4000);
  }

  function showSecretScene() {
    let scene = document.getElementById('secretScene');
    if (!scene) {
      scene = createSecretScene();
      document.body.appendChild(scene);
    }
    scene.classList.add('active');
  }

  function createSecretScene() {
    const scene = document.createElement('div');
    scene.id = 'secretScene';
    scene.className = 'secret-scene';
    scene.setAttribute('role', 'dialog');
    scene.setAttribute('aria-label', 'Secret scene');

    // Generate stars
    const stars = document.createElement('div');
    stars.className = 'secret-stars';
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      star.className = 'secret-star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.opacity = Math.random() * 0.5 + 0.3;
      stars.appendChild(star);
    }
    scene.appendChild(stars);

    const rainbow = document.createElement('div');
    rainbow.className = 'secret-rainbow';
    scene.appendChild(rainbow);

    const content = document.createElement('div');
    content.className = 'secret-content';
    content.innerHTML = `
      <div class="secret-emoji">🌌</div>
      <h2 class="secret-title" data-en="Beyond the Light" data-km="លើសពីពន្លឺ">Beyond the Light</h2>
      <p class="secret-message">
        <strong data-en="Welcome, Seeker." data-km="ស្វាគមន៍ អ្នកស្វែងរក។">Welcome, Seeker.</strong><br>
        <span data-en="You've found the path less traveled. The light you see is not the end — it's the beginning of a deeper question: What lies beyond perception?" data-km="អ្នកបានរកឃើញផ្លូវតិចតួចដែលអ្នកដទៃមិនទាន់បានដើរ។ ពន្លឺដែលអ្នកបានឃើញមិនមែនជាចំណុចបញ្ចប់ទេ — វាជាការចាប់ផ្តើមនៃសំណួរដ៏ជ្រៅជាងនេះ៖ តើមានអ្វីនៅហួសពីការយល់ឃើញ?">You've found the path less traveled. The light you see is not the end — it's the beginning of a deeper question: What lies beyond perception?</span>
      </p>
      <button class="secret-close" id="secretClose" data-en="Return to Light" data-km="ត្រឡប់ទៅរកពន្លឺ">Return to Light</button>
    `;
    scene.appendChild(content);

    // Apply current language
    const currentLang = document.documentElement.lang || 'en';
    content.querySelectorAll('[data-' + currentLang + ']').forEach(el => {
      if (el.tagName === 'INPUT') el.value = el.dataset[currentLang];
      else el.textContent = el.dataset[currentLang];
    });

    // Close handlers
    setTimeout(() => {
      const closeBtn = content.querySelector('.secret-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          scene.classList.remove('active');
          setTimeout(() => scene.remove(), 800);
        });
      }
    }, 10);

    scene.addEventListener('click', (e) => {
      if (e.target === scene) {
        scene.classList.remove('active');
        setTimeout(() => scene.remove(), 800);
      }
    });

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape' && scene.classList.contains('active')) {
        scene.classList.remove('active');
        setTimeout(() => scene.remove(), 800);
        document.removeEventListener('keydown', escHandler);
      }
    });

    return scene;
  }

  // ============================================
  // 3. Achievement System
  // ============================================
  const ACHIEVEMENTS_KEY = 'lumen-achievements';
  let achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '[]');

  function unlockAchievement(id, icon, title, desc) {
    if (achievements.includes(id)) return;
    achievements.push(id);
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
    showAchievement(icon, title, desc);
  }

  function showAchievement(icon, title, desc) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="achievement-icon">${icon}</div>
      <div class="achievement-text">
        <small>Achievement Unlocked</small>
        <strong>${title}</strong>
        <span style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">${desc}</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Track achievements based on user behavior
  let scrolledScenes = new Set();
  const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id && !scrolledScenes.has(id)) {
          scrolledScenes.add(id);
          if (scrolledScenes.size === 1) {
            setTimeout(() => unlockAchievement('first-step', '🌱', 'First Step', 'Began your journey through light'), 800);
          } else if (scrolledScenes.size === 3) {
            unlockAchievement('explorer', '🔭', 'Explorer', 'Discovered 3 scenes of perception');
          } else if (scrolledScenes.size === 5) {
            unlockAchievement('luminary', '✨', 'Luminary', 'Witnessed all five scenes');
          }
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.scene').forEach(s => sceneObserver.observe(s));

  // Audio interaction achievement
  document.addEventListener('click', function audioAch(e) {
    if (e.target.closest('#audioToggle') || e.target.closest('.audio-btn')) {
      unlockAchievement('sound-seeker', '🎵', 'Sound Seeker', 'Awakened the ambient soundscape');
    }
  });

  // Spectrum click achievement
  document.addEventListener('click', function specAch(e) {
    if (e.target.closest('.spectrum-card')) {
      setTimeout(() => unlockAchievement('color-master', '🎨', 'Color Master', 'Explored the visible spectrum'), 300);
    }
  });

  // Consciousness field achievement
  document.addEventListener('click', function consAch(e) {
    if (e.target.closest('.consciousness-field')) {
      unlockAchievement('mindful', '🧠', 'Mindful', 'Touched the field of consciousness');
    }
  });

  // ============================================
  // 4. Mouse Trail Particles
  // ============================================
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !window.matchMedia('(max-width: 768px)').matches) {
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTrailTime < 50) return;
      lastTrailTime = now;

      const particle = document.createElement('div');
      particle.className = 'cursor-trail-particle';
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    });
  }

  // ============================================
  // 5. Time-of-day Theme (Enhanced)
  // ============================================
  function applyTimeTheme() {
    const hour = new Date().getHours();
    let theme = 'default';
    if (hour >= 5 && hour < 9) theme = 'dawn';
    else if (hour >= 9 && hour < 17) theme = 'day';
    else if (hour >= 17 && hour < 20) theme = 'dusk';
    else theme = 'night';

    const themes = {
      dawn: {
        primary: '#1a0f1f',
        secondary: '#0f0a16',
        tertiary: '#1a1220',
        accent: '#ff8866',
        accentGlow: 'rgba(255,136,102,0.15)',
        textSecondary: 'rgba(255,220,210,0.7)',
        textTertiary: 'rgba(255,220,210,0.4)'
      },
      day: {
        primary: '#0a1520',
        secondary: '#0d1a28',
        tertiary: '#101c2c',
        accent: '#88ddff',
        accentGlow: 'rgba(136,221,255,0.15)',
        textSecondary: 'rgba(200,230,255,0.7)',
        textTertiary: 'rgba(200,230,255,0.4)'
      },
      dusk: {
        primary: '#1a0a1f',
        secondary: '#150a1a',
        tertiary: '#201024',
        accent: '#ff66aa',
        accentGlow: 'rgba(255,102,170,0.15)',
        textSecondary: 'rgba(255,200,230,0.7)',
        textTertiary: 'rgba(255,200,230,0.4)'
      },
      night: {
        primary: '#050508',
        secondary: '#0a0a12',
        tertiary: '#10101a',
        accent: '#ffffff',
        accentGlow: 'rgba(255,255,255,0.15)',
        textSecondary: 'rgba(255,255,255,0.6)',
        textTertiary: 'rgba(255,255,255,0.35)'
      },
      default: {
        primary: '#050508',
        secondary: '#0a0a12',
        tertiary: '#10101a',
        accent: '#ffffff',
        accentGlow: 'rgba(255,255,255,0.15)',
        textSecondary: 'rgba(255,255,255,0.6)',
        textTertiary: 'rgba(255,255,255,0.35)'
      }
    };

    const t = themes[theme];
    const root = document.documentElement.style;
    root.setProperty('--bg-primary', t.primary);
    root.setProperty('--bg-secondary', t.secondary);
    root.setProperty('--bg-tertiary', t.tertiary);
    root.setProperty('--accent', t.accent);
    root.setProperty('--accent-glow', t.accentGlow);
    root.setProperty('--text-secondary', t.textSecondary);
    root.setProperty('--text-tertiary', t.textTertiary);
    document.documentElement.dataset.timeTheme = theme;
  }
  applyTimeTheme();

  // ============================================
  // 6. Upgrade Transcendence Scene to 3D
  // ============================================
  function upgradeTranscendence() {
    const transcend = document.querySelector('.transcend-visual');
    if (!transcend) return;

    const existingRings = transcend.querySelectorAll('.transcend-ring');
    const existingCore = transcend.querySelector('.transcend-core');

    if (existingRings.length === 0) return;

    const container3d = document.createElement('div');
    container3d.className = 'transcend-rings-3d';
    container3d.style.cssText = 'position:relative;width:100%;height:100%;transform-style:preserve-3d;';

    existingRings.forEach((ring, i) => {
      ring.classList.add('transcend-ring-3d');
      const angleX = i * 35;
      const angleY = i * 25;
      ring.dataset.baseRotateX = angleX;
      ring.dataset.baseRotateY = angleY;
      ring.style.animation = 'none';
      ring.style.transform = `translate(-50%, -50%) rotateX(${angleX}deg) rotateY(${angleY}deg)`;

      const orbit = document.createElement('div');
      orbit.className = 'ring-orbit';
      orbit.style.animation = `ringOrbit${i} ${10 + i * 5}s linear infinite`;
      orbit.style.animationDelay = `-${i * 2}s`;
      ring.appendChild(orbit);
    });

    if (!document.getElementById('orbitKeyframes')) {
      const style = document.createElement('style');
      style.id = 'orbitKeyframes';
      style.textContent = `
        @keyframes ringOrbit0 {
          from { transform: translate(-50%, -50%) translateX(100px) translateY(0); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(100px) translateY(0) rotate(-360deg); }
        }
        @keyframes ringOrbit1 {
          from { transform: translate(-50%, -50%) translateX(130px) translateY(0); }
          to { transform: translate(-50%, -50%) rotate(-360deg) translateX(130px) translateY(0) rotate(360deg); }
        }
        @keyframes ringOrbit2 {
          from { transform: translate(-50%, -50%) translateX(160px) translateY(0); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(160px) translateY(0) rotate(-360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    existingRings.forEach(r => container3d.appendChild(r));
    transcend.appendChild(container3d);

    if (existingCore) {
      existingCore.classList.add('transcend-core-3d');
      container3d.appendChild(existingCore);
    }

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (!isCoarse) {
      let targetRotX = 0, targetRotY = 0;
      let currentRotX = 0, currentRotY = 0;

      document.addEventListener('mousemove', (e) => {
        const rect = transcend.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetRotY = ((e.clientX - cx) / window.innerWidth) * 30;
        targetRotX = -((e.clientY - cy) / window.innerHeight) * 30;
      });

      function animate3D() {
        currentRotX += (targetRotX - currentRotX) * 0.08;
        currentRotY += (targetRotY - currentRotY) * 0.08;
        container3d.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

        existingRings.forEach(ring => {
          const bx = parseFloat(ring.dataset.baseRotateX);
          const by = parseFloat(ring.dataset.baseRotateY);
          const time = Date.now() / 1000;
          const autoX = Math.sin(time * 0.5 + bx) * 5;
          const autoY = Math.cos(time * 0.3 + by) * 5;
          ring.style.transform = `translate(-50%, -50%) rotateX(${bx + currentRotX * 0.5 + autoX}deg) rotateY(${by + currentRotY * 0.5 + autoY}deg)`;
        });

        requestAnimationFrame(animate3D);
      }
      animate3D();
    }
  }

  // ============================================
  // 7. Light Journey Progress Tracker
  // ============================================
  function initJourneyTracker() {
    if (document.getElementById('journeyTracker')) return;

    const scenes = document.querySelectorAll('.scene');
    if (scenes.length === 0) return;

    const tracker = document.createElement('div');
    tracker.id = 'journeyTracker';
    tracker.className = 'journey-tracker';
    tracker.setAttribute('aria-label', 'Journey progress');

    const label = document.createElement('div');
    label.className = 'journey-label';
    label.innerHTML = '<span class="journey-label-icon">✦</span><span class="journey-label-text">Journey</span>';
    tracker.appendChild(label);

    const dots = document.createElement('div');
    dots.className = 'journey-dots';

    const dotEls = [];
    scenes.forEach((scene, i) => {
      const dot = document.createElement('button');
      dot.className = 'journey-dot';
      dot.setAttribute('aria-label', `Scene ${i + 1}`);
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        scene.scrollIntoView({ behavior: 'smooth' });
      });
      dots.appendChild(dot);
      dotEls.push(dot);
    });
    tracker.appendChild(dots);

    const counter = document.createElement('div');
    counter.className = 'journey-counter';
    counter.textContent = '0/' + scenes.length;
    tracker.appendChild(counter);

    document.body.appendChild(tracker);

    // Show tracker after a short delay
    setTimeout(() => tracker.classList.add('visible'), 1500);

    // Observe scenes
    let visited = 0;
    const journeyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(scenes).indexOf(entry.target);
          if (idx >= 0 && !dotEls[idx].classList.contains('visited')) {
            dotEls[idx].classList.add('visited');
            visited++;
            counter.textContent = visited + '/' + scenes.length;

            if (visited === scenes.length) {
              setTimeout(() => unlockAchievement('journey-complete', '🌟', 'Journey Complete', 'You traversed the full spectrum of light'), 600);
            }
          }
        }
      });
    }, { threshold: 0.4 });

    scenes.forEach(s => journeyObserver.observe(s));
  }

  // ============================================
  // 8. Run DOM-dependent initializations
  // ============================================
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(() => {
    setTimeout(upgradeTranscendence, 100);
    setTimeout(initJourneyTracker, 100);
  });

  // ============================================
  // 9. Expose debug API (for development)
  // ============================================
  window.LUMEN = {
    unlockAchievement,
    showSecretScene,
    triggerKonami: triggerKonamiEasterEgg,
    achievements: () => achievements,
    version: '1.2.0'
  };

  console.log('%c✨ LUMEN v1.2.0', 'color: #fff; font-size: 16px; font-weight: bold;');
  console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: rgba(255,255,255,0.6); font-size: 12px;');
  console.log('%cWindow.LUMEN API available for debugging', 'color: rgba(255,255,255,0.4); font-size: 11px;');

})();
