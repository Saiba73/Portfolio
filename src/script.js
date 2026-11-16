import { vec3, time, positionLocal, uniform } from 'three/tsl';
import * as THREE from 'three/webgpu';

/**
 * Base Setup
 */
const canvas = document.querySelector('canvas.threejs');
const scene = new THREE.Scene();

/**
 * Sizes & Resize Handling
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 3.0);
scene.add(camera);

/**
 * Renderer (WebGPU)
 */
const renderer = new THREE.WebGPURenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0b0b0e);

/**
 * Wave Lines Animation (TSL / WebGPU)
 */
const lineCount = 100;
const pointsPerLine = 300;
const lines = [];


const startColor = new THREE.Color('#3f51b5');
const middleColor = new THREE.Color('#00bcd4');
const endColor = new THREE.Color('#e91e63');


function getLineGeometry() {
    const positions = new Float32Array(pointsPerLine * 3);
    for (let i = 0; i < pointsPerLine; i++) {
        positions[i * 3] = (i / (pointsPerLine - 1)) * 8.0 - 4.0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
}

const baseGeometry = getLineGeometry();

for (let i = 0; i < lineCount; i++) {
    const ratio = i / lineCount;
    const color = new THREE.Color();
    
    
    if (ratio < 0.5) {
        color.lerpColors(startColor, middleColor, ratio * 2);
    } else {
        color.lerpColors(middleColor, endColor, (ratio - 0.5) * 2);
    }

    const phase = i * 0.1;
    const verticalOffset = (i - lineCount / 2) * 0.03;

    
    const material = new THREE.LineBasicNodeMaterial();
    material.colorNode = uniform(color);
    material.transparent = false;
    // material.opacity = 1;

    
    const x = positionLocal.x;
    const waveHeight = 0.45;

    const waveY = x
        .mul(8.0).add(time).add(uniform(phase)).sin().mul(waveHeight).mul(0.4)
        .add(x.mul(4.0).sub(time.mul(1.2)).add(uniform(phase).mul(2.0)).sin().mul(waveHeight).mul(0.2))
        .add(x.mul(12.0).add(time.mul(0.8)).cos().mul(waveHeight).mul(0.1))
        .add(uniform(verticalOffset));

    material.positionNode = vec3(positionLocal.x, waveY, positionLocal.z);

    const line = new THREE.Line(baseGeometry, material);
    scene.add(line);
    lines.push(line);
}

/**
 * Render Loop
 */
const tick = () => {
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(tick);