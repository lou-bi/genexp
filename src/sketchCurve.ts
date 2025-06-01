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

let recurves: Recurve[] = []
let numRecurves = 10

let flowField = []
let scale = 10
let rows, cols
let zoff

function setup() {
    createCanvas(800, 800);
    window.COLOR_MODE = RGB
    colorMode(COLOR_MODE)
    textSize(20)


    rows = floor(height / 2)
    cols = floor(width / 2)
    flowField = generateFlowField(rows, cols)

    for (let i = 0; i < numRecurves; i++) {
        const r = new Recurve(createVector(random(width), random(height)))
        const np = r.points[0].copy()

        const xI = constrain(floor(np.x / scale), 0, cols - 1)
        const yI = constrain(floor(np.y / scale), 0, rows - 1)
        const ff = flowField[yI][xI].copy()

        ff.setMag(random(100))
        np.add(ff)
        r.addPoint(np)

        recurves.push(r)
    }
    console.log(recurves)

    background(0)
}

function draw() {

    for (const p of recurves) {
        p.draw()
    }

    setFrameRate()

};

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
