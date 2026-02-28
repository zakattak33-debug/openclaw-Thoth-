// Glowing Orb Dashboard Three.js Implementation

import * as THREE from 'three';

let scene, camera, renderer, orb;
const orbs = [];
const numOrbs = 5;
const demos = ['demo1', 'demo2', 'demo3'];
let currentDemoIndex = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createOrbs();
    camera.position.z = 5;

    animate();
}

function createOrbs() {
    for (let i = 0; i < numOrbs; i++) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        orb = new THREE.Mesh(geometry, material);
        orb.position.x = Math.random() * 10 - 5;
        orb.position.y = Math.random() * 10 - 5;
        orb.position.z = Math.random() * 10 - 5;
        orbs.push(orb);
        scene.add(orb);
    }
}

function animate() {
    requestAnimationFrame(animate);
    orbs.forEach((orb, index) => {
        orb.rotation.x += 0.01;
        orb.rotation.y += 0.01;
        // Add glow effect
        orb.material.color.setHSL((index + performance.now() * 0.001) % 1, 1, 0.5 + 0.5 * Math.sin(performance.now() * 0.005));
    });
    renderer.render(scene, camera);
}

// WebSocket integration
const socket = new WebSocket('ws://yourwebsocketserver');

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    if (message.type === 'cycle') {
        currentDemoIndex = (currentDemoIndex + 1) % demos.length;
        console.log('Switched to demo:', demos[currentDemoIndex]);
    }
};

// Event listener to cycle demos
document.addEventListener('keypress', (e) => {
    if (e.code === 'Space') {
        currentDemoIndex = (currentDemoIndex + 1) % demos.length;
        console.log('Switched to demo:', demos[currentDemoIndex]);
    }
});

window.onload = init;