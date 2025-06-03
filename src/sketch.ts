//@ts-nocheck
import './style.css'
import 'q5';

import { Particle } from "./utils/particle";
import { Recurve } from "./utils/recurve";
import { generateFlowField } from "./utils/flowfield";

let run = true
document.getElementById("button-play").addEventListener("mousedown", function (e) {
    if (run) {
        e.target.textContent = '▶️'
        noLoop()
    } else {
        e.target.textContent = '⏸️'
        loop()
    }
    run = !run
})
const zoffLabel = document.querySelector("#zoff-label");
const zoffSlider = document.querySelector("#zoff-slider");
zoffLabel.textContent = zoffSlider.value;

const bgOpLabel = document.querySelector("#bg-op-label");
const bgOpSlider = document.querySelector("#bg-op-slider");
bgOpLabel.textContent = bgOpSlider.value;

const particlesOpLabel = document.querySelector("#particles-op-label");
const particlesOpSlider = document.querySelector("#particles-op-slider");
particlesOpLabel.textContent = particlesOpSlider.value;

let bgOpacity = Number(bgOpSlider.value);
bgOpSlider.addEventListener("input", (event) => {
    bgOpLabel.textContent = bgOpSlider.value;
    bgOpacity = Number(bgOpSlider.value);
})

let particlesOpacity = Number(particlesOpSlider.value);
particlesOpSlider.addEventListener("input", (event) => {
    particlesOpLabel.textContent = particlesOpSlider.value;
    particlesOpacity = Number(particlesOpSlider.value);
})

let bgColor = '#000000'
let particlesColor = '#ffffff'

document.querySelector('#bg-color')?.addEventListener('change', (e) => {
    bgColor = e.target.value
})
document.querySelector('#particles-color')?.addEventListener('change', (e) => {
    particlesColor = e.target.value
})

let cw = 800
let ch = 800
let particles: Particle[] = []
let numParticles = 1000
let flowField = []
let scale = 20
let rows, cols
let zoff

zoffSlider.addEventListener("input", (event) => {
    zoffLabel.textContent = event.target.value;
    zoff = Number(event.target.value)

    // flowField = generateFlowField()
});

function setup() {
    createCanvas(cw, ch);
    window.COLOR_MODE = RGB
    colorMode(COLOR_MODE)
    textSize(20)

    const spawnOffset = floor(width / 3)
    const spawnMargin = 5
    const PARTICLE_SCL = 5
    for (let i = 0; i < width; i += PARTICLE_SCL) {
        // particles.push(new Particle(width, spawnOffset + i * spawnMargin))
        // particles.push(new Particle(i * 5, 0))
        particles.push(new Particle(i, 0))
        particles.push(new Particle(i, height))
        // particles.push(new Particle(width / 2, height / 2))
    }
    for (let i = 0; i < height; i += PARTICLE_SCL) {
        // particles.push(new Particle(width, spawnOffset + i * spawnMargin))
        // particles.push(new Particle(i * 5, 0))
        particles.push(new Particle(0, i))
        particles.push(new Particle(width, i))
        // particles.push(new Particle(width / 2, height / 2))
    }

    rows = floor(height / 2)
    cols = floor(width / 2)
    flowField = generateFlowField(rows, cols, 0.03)
    const MAX_ITER = 800
    for (const p of particles) {
        p.savePos()
        for (let i = 0; i < MAX_ITER; i++) {

            const xI = constrain(floor(p.pos.x / scale), 0, cols - 1)
            const yI = constrain(floor(p.pos.y / scale), 0, rows - 1)
            const ff = flowField[yI][xI]

            p.applyForce(ff)
            p.update()
            p.savePos()
        }
    }
    // stroke(255, 20)
    // strokeWeight(1)
    background(0)
}

function draw() {
    stroke(255, 20)
    noStroke()
    fill(255, 3)
    noFill()
    for (const p of particles) {

        p.drawBezier()

    }
    noLoop()
    setFrameRate()

};
function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let fs = fullscreen();
        cw = windowWidth
        ch = windowHeight
        resizeCanvas(cw, ch);
        redraw()
        fullscreen(!fs);
    }
}
function drawDetails(x, y, scale) {
    rect(x * scale, y * scale, scale)
    text(`${x}:${y}`, x * scale + 3, y * scale + 20)
}

function setFrameRate() {
    document.getElementById('framerate').textContent = floor(getFPS())
}
function drawArrow(from: Vector, to: Vector) {
    stroke(255)
    push()
    translate(from.x, from.y)
    line(0, 0, to.x, to.y)
    circle(to.x, to.y, 10)
    pop()
}

window.draw = draw
window.setup = setup
// window.mousePressed = mousePressed
