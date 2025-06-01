//@ts-nocheck
import './style.css'
import 'q5';

import { Particle } from "./utils/particle";

let q = await Q5.WebGPU();

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


const particles: Particle[] = []
let scale = 30
let rows, cols

for (let i = 0; i < 1000; i++) {
    particles.push(new Particle(random(-width / 2, width / 2), random(-height / 2, height / 2)))
}

createCanvas(800, 800);

rows = floor(width / scale)
cols = floor(height / scale)

let wind = createVector(1, 0)
let friction = createVector(-0.05, 0)
let inc = 0.01
let yoff
let xoff
let speed = 0.0
textSize(20)

const flowField = []
xoff = 0
for (let y = 0; y < rows; y++) {
    yoff = 0
    flowField.push([])
    for (let x = 0; x < cols; x++) {
        const v = new Vector(
            cos(
                map(
                    noise(xoff, yoff, frameCount * speed), 0, 1, 0, TAU
                )
            ),
            sin(
                map(
                    noise(xoff, yoff, frameCount * speed), 0, 1, 0, TAU
                )
            )
        )
        v.setMag(10)
        flowField[y].push(v)
        xoff += inc
    }
    yoff += inc
}
q.draw = () => {
    // translate(-400, -400)
    background(255)

    // drawArrow(c, v)
    for (const p of particles) {
        const xI = constrain(floor(p.pos.x / scale), 0, cols - 1)
        const yI = constrain(floor(p.pos.y / scale), 0, rows - 1)
        const ff = flowField[yI][xI]

        p.update()
        p.draw()
        p.applyForce(ff)
    }
    setFrameRate()

};

function drawDetails(x, y, scale) {
    rect(x * scale, y * scale, scale)
    text(`${x}:${y}`, x * scale + 3, y * scale + 20)
}

q.mouseMoved = function () {
    wind.x = mouseX / 100
    wind.y = mouseY / 100
}

function setFrameRate() {
    document.getElementById('framerate').textContent = floor(getFPS())
}
function drawArrow(from: Vector, to: Vector) {
    push()
    translate(from.x, from.y)
    line(0, 0, to.x, to.y)
    // circle(to.x, to.y, 10)
    pop()
}
