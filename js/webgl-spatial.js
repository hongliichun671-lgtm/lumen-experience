/* ============================================
   LUMEN — WebGL Spatial Engine
   Enhanced 3D Visual Experience
   ============================================ */

(function() {
    'use strict';

    // WebGL Context
    const canvas = document.createElement('canvas');
    canvas.id = 'webglCanvas';
    canvas.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
        console.warn('WebGL not supported');
        canvas.style.display = 'none';
        return;
    }

    // Resize handling
    function resizeWebGL() {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resizeWebGL();
    window.addEventListener('resize', resizeWebGL);

    // Shaders
    const vertexShaderSource = `
        attribute vec3 position;
        attribute float size;
        attribute vec3 color;
        uniform float scrollProgress;
        uniform float time;
        varying vec3 vColor;
        varying float vSize;

        void main() {
            float spiralX = cos(time * 0.5 + position.y * 0.1) * 100.0;
            float spiralY = sin(time * 0.5 + position.y * 0.1) * 100.0;
            float depth = 1.0 - (position.z * 0.01);

            vec3 pos = position;
            pos.x += spiralX * depth;
            pos.y += spiralY * depth;

            float sizeMultiplier = 2.0 + scrollProgress * 3.0;
            vSize = size * sizeMultiplier;
            vColor = color;

            float aspect = 800.0 / 600.0;
            float fov = 75.0;
            float f = 1.0 / tan(radians(fov * 0.5));
            float zNear = 0.1;
            float zFar = 1000.0;
            float zRange = zFar - zNear;

            float projectionZ = -(2.0 * zNear * zFar / zRange + (zNear + zFar) / zRange * (position.z - 500.0));

            gl_Position = vec4(
                pos.x * f / aspect / (position.z * 0.01),
                pos.y * f / (position.z * 0.01),
                projectionZ,
                1.0
            );
            gl_PointSize = vSize;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        varying float vSize;

        void main() {
            vec2 uv = gl_PointCoord.xy - 0.5;
            float dist = length(uv);
            float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

            float glow = exp(-dist * 4.0);
            vec3 glowColor = vColor * glow * 2.0;

            gl_FragColor = vec4(vColor + glowColor, alpha);
        }
    `;

    // Compile shaders
    function compileShader(source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return;
    }

    gl.useProgram(program);

    // Get attribute and uniform locations
    const positionLoc = gl.getAttribLocation(program, 'position');
    const sizeLoc = gl.getAttribLocation(program, 'size');
    const colorLoc = gl.getAttribLocation(program, 'color');
    const scrollProgressLoc = gl.getUniformLocation(program, 'scrollProgress');
    const timeLoc = gl.getUniformLocation(program, 'time');

    // Create particle data
    const particleCount = 150;
    const particleData = new Float32Array(particleCount * 9);

    for (let i = 0; i < particleCount; i++) {
        const idx = i * 9;
        particleData[idx] = (Math.random() - 0.5) * 400; // x
        particleData[idx + 1] = (Math.random() - 0.5) * 400; // y
        particleData[idx + 2] = Math.random() * 500; // z
        particleData[idx + 3] = Math.random() * 4 + 1; // size
        particleData[idx + 4] = 1; // r
        particleData[idx + 5] = Math.random(); // g
        particleData[idx + 6] = Math.random(); // b
        particleData[idx + 7] = (Math.random() - 0.5) * 0.3; // vx
        particleData[idx + 8] = (Math.random() - 0.5) * 0.3; // vy
    }

    // Create buffers
    const posBuffer = gl.createBuffer();
    const sizeBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData.subarray(0, particleCount * 3), gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData.subarray(3, particleCount * 3 + 3), gl.DYNAMIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData.subarray(4, particleCount * 3 + 4), gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(positionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(sizeLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(colorLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);

    // Render loop
    let startTime = performance.now();
    let scrollProgress = 0;

    function render() {
        const time = (performance.now() - startTime) * 0.001;
        scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        gl.clearColor(0.02, 0.02, 0.03, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        gl.uniform1f(scrollProgressLoc, scrollProgress);
        gl.uniform1f(timeLoc, time);

        // Update particle positions
        for (let i = 0; i < particleCount; i++) {
            const idx = i * 9;
            particleData[idx + 0] += particleData[idx + 7];
            particleData[idx + 1] += particleData[idx + 8];

            // Wrap around
            if (particleData[idx] > 200) particleData[idx] = -200;
            if (particleData[idx] < -200) particleData[idx] = 200;
            if (particleData[idx + 1] > 200) particleData[idx + 1] = -200;
            if (particleData[idx + 1] < -200) particleData[idx + 1] = 200;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, particleData.subarray(0, particleCount * 3));

        gl.drawArrays(gl.POINTS, 0, particleCount);

        requestAnimationFrame(render);
    }

    render();

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

})();
