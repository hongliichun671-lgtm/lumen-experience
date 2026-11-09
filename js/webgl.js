// ============================================
// LUMEN — WebGL 3D Experience
// Advanced 3D particle system with Three.js
// Enhanced with scene-based color grading
// ============================================

(function() {
    'use strict';

    const canvas = document.getElementById('webglCanvas');
    if (!canvas) {
        console.error('WebGL canvas not found');
        return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Adaptive particle count based on device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const particleCount = isMobile ? 1200 : 2500;

    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] = (Math.random() - 0.5) * 18;
        posArray[i3 + 1] = (Math.random() - 0.5) * 18;
        posArray[i3 + 2] = (Math.random() - 0.5) * 12;

        const t = Math.random();
        colorsArray[i3] = 0.55 + t * 0.45;
        colorsArray[i3 + 1] = 0.55 + t * 0.45;
        colorsArray[i3 + 2] = 0.65 + t * 0.35;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Scroll state
    let scrollProgress = 0;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Scene color palettes matching the 5 scenes
    const scenePalettes = [
        { bg: 0x050508, accent: 0xffffff },    // Origin
        { bg: 0x0a0a14, accent: 0xff8800 },    // Spectrum
        { bg: 0x080a18, accent: 0x00aaff },    // Consciousness
        { bg: 0x0a0818, accent: 0x8800ff },    // Transcendence
        { bg: 0x050508, accent: 0xffffff }      // Final
    ];

    function getSceneColors(progress) {
        const idx = Math.min(Math.floor(progress * (scenePalettes.length - 1)), scenePalettes.length - 2);
        const t = progress * (scenePalettes.length - 1) - idx;
        const c1 = scenePalettes[idx];
        const c2 = scenePalettes[idx + 1];
        return {
            bg: new THREE.Color(c1.bg).lerp(new THREE.Color(c2.bg), t),
            accent: new THREE.Color(c1.accent).lerp(new THREE.Color(c2.accent), t)
        };
    }

    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 200;
        mouseY = (event.clientY - windowHalfY) / 200;
    }
    document.addEventListener('mousemove', onMouseMove, false);

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Store original positions for organic wave motion
    const originalPositions = new Float32Array(posArray);
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        // Dynamic scene color grading
        const { bg, accent } = getSceneColors(scrollProgress);
        scene.background.copy(bg);
        particlesMaterial.color = accent;
        pointLight.color = accent;

        // Organic wave motion across all particles
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const ox = originalPositions[i3];
            const oy = originalPositions[i3 + 1];
            const oz = originalPositions[i3 + 2];

            positions[i3] = ox + Math.sin(elapsedTime * 0.5 + oy * 1.5) * 0.15;
            positions[i3 + 1] = oy + Math.cos(elapsedTime * 0.4 + ox * 1.5) * 0.15;
            positions[i3 + 2] = oz + Math.sin(elapsedTime * 0.3 + i * 0.1) * 0.1;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Scroll listener
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    }, { passive: true });

})();
