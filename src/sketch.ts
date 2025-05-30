import './style.css'
import 'q5';

import { Particle } from "./utils/particle";

let q = await Q5.WebGPU();

const ps: Particle[] = []


for (let i = 0; i < 10000; i++) {
    ps.push(new Particle(0, 0))
}

createCanvas(400, 400);

q.draw = () => {
    background(0)
    stroke(1)
    for (let i = 0; i < ps.length; i++) {
        ps[i].update()
        ps[i].draw()
    }
    setFrameRate()
};

function setFrameRate() {
    document.getElementById('framerate').textContent = floor(frameRate())
}

