// ============================================
// LUMEN — WebGL 3D Experience
// Advanced 3D particle system with Three.js
// ============================================

(function() {
    'use strict';

    // WebGL Canvas Setup
    const canvas = document.getElementById('webglCanvas');
    if (!canvas) {
        console.error('WebGL canvas not found');
        return;
    }

    // Scene, Camera, Renderer
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

    // 3D Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);

    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
        colorsArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Scroll-based effects
    let scrollProgress = 0;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    });

    // Dynamic color system based on scroll
    const colorPalette = [
        new THREE.Color(0xffffff),
        new THREE.Color(0xff8800),
        new THREE.Color(0x00aaff),
        new THREE.Color(0x8800ff),
        new THREE.Color(0xffffff)
    ];

    function getScrollColor(progress) {
        const idx = Math.min(Math.floor(progress * (colorPalette.length - 1)), colorPalette.length - 2);
        const t = progress * (colorPalette.length - 1) - idx;
        const c1 = colorPalette[idx];
        const c2 = colorPalette[idx + 1];
        return c1.clone().lerp(c2, t);
    }

    // Mouse move effect
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

    // Animation loop
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

        // Dynamic color shift based on scroll
        const scrollColor = getScrollColor(scrollProgress);
        particlesMaterial.color = scrollColor;
        pointLight.color = scrollColor;

        // Wave motion
        const positions = particlesGeometry.attributes.position.array;
        for(let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.002;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Performance optimization for low-end devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && particleCount > 1000) {
        particlesMesh.geometry.setFromPoints(
            particlesMesh.geometry.attributes.position.array.slice(0, 1000 * 3)
        );
    }

})();
