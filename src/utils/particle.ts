export class Particle {
    pos: Vector
    vel: Vector
    acc: Vector
    size: number
    color: [number, number, number]
    constructor(x: number, y: number, size: number = 2) {
        this.pos = createVector(x, y)
        this.vel = createVector(random(-2, 2), random(-2, 2))
        this.acc = createVector(random(0, 2), random(0, 2))
        this.size = size
        this.color = [random(), random(), random()]
    }

    update() {
        this.pos.add(this.vel)
        this.edgeWebGpu(400, 400)
    }

    draw() {
        strokeWeight(10)
        stroke(this.color)
        point(this.pos.x, this.pos.y)
    }

    edge(w: number, h: number) {
        if (this.pos.x > w) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = w
        if (this.pos.y > h) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = h
    }
    edgeWebGpu(w: number, h: number) {
        if (this.pos.x > (w / 2)) this.pos.x = -w / 2
        if (this.pos.x < (-w / 2)) this.pos.x = w / 2
        if (this.pos.y > (h / 2)) this.pos.y = -h / 2
        if (this.pos.y < (-h / 2)) this.pos.y = h / 2
    }
}
