const colorPalette = [
    '#EA638C',
    '#B33C86',
    '#7863E3',
    '#0E04C8',
    '#00A385',
]


export class Particle {
    pos: Vector
    prevPos: Vector[]
    vel: Vector
    acc: Vector
    size: number
    color: [number, number, number]
    lifeTime: number
    alive: boolean
    constructor(x: number, y: number, size: number = 2) {
        this.pos = new Vector(x, y)
        this.vel = new Vector(0, 0)
        // this.vel = new Vector(random(-2, 2), random(-2, 2))
        this.acc = new Vector(random(0, 2), random(0, 2))
        this.prevPos = []
        this.size = random()
        this.color = random(colorPalette)
        this.strokeColor = random(colorPalette)
        this.lifeTime = random(10, 1000)
        this.alive = true
        // this.color = [random(), random(), random()]
    }

    update() {
        // this.vel.add(this.acc)
        // this.vel.limit(2)
        this.pos.add(this.vel)
        // this.acc.mult(0)

        // this.edgeWebGpu(width, height)
        // this.edge()
        // this.edgeRandomEdge()
        // this.edgeRandomPos()
        this.lifeTime--
        if (this.lifeTime <= 0) this.alive = false
    }

    savePos() {
        this.prevPos.push(this.pos.copy())
    }
    applyForce(v: Vector) {
        this.vel = v.copy()
        // const f = v.copy()
        // f.div(this.size)
        // this.acc.add(f)
    }

    drawMono() {
        stroke(255)
        point(this.pos.x, this.pos.y)

    }
    drawPalette() {
        // stroke(this.color)
        // strokeWeight(this.size * 50)
        // point(this.pos.x, this.pos.y)
        // noStroke()
        stroke(this.strokeColor)
        fill(this.color)
        circle(this.pos.x, this.pos.y, this.size * 20)

    }
    draw() {
        const alpha = 0
        // const alpha = this.size
        let c = new Color(
            map(this.pos.x, 0, width, 0, 255),
            map(this.pos.y, 0, height, 0, 255),
            map(this.size, 0, 1, 0, 255),
            map(alpha, 0, 1, 0, 255)
        )
        switch (COLOR_MODE) {
            case RGB:
                break
            case HSB:
            case HSL:
                c = new Color(
                    map(this.pos.x, 0, width, 0, 360),
                    map(this.pos.y, 0, height, 0, 100),
                    map(this.size, 0, 1, 0, 100),
                    alpha
                )
                break
            case OKLCH:
                c = new Color(
                    map(this.pos.x, 0, width, 0, 1),
                    map(this.pos.y, 0, height, 0, 0.4),
                    map(this.size, 0, 1, 0, 360),
                    alpha
                )
                break
        }
        stroke(c)
        point(this.pos.x, this.pos.y)
    }

    drawBezier(close: boolean = false) {
        const vertices = []
        for (let i = 1; i < this.prevPos.length - 1; i++) {
            const p = this.prevPos[i]
            let c1 = this.prevPos[i - 1]
            let c2 = this.prevPos[i + 1]

            vertices.push([c1.x, c1.y, c2.x, c2.y, p.x, p.y])
        }
        const c = color(this.color + '50')
        // c.setAlpha(.2)
        fill(c)
        // stroke(this.color)
        beginShape()
        vertex(this.prevPos[0].x, this.prevPos[0].y)
        for (let i = 1; i < vertices.length; i++) {
            bezierVertex(...vertices[i])
            vertex(...vertices[i])
        }
        vertex(this.prevPos[this.prevPos.length - 1].x, this.prevPos[this.prevPos.length - 1].y)
        if (close) endShape(CLOSE)
        else endShape()
    }
    drawTrails() {
        // line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y)
        line(this.pos.x, this.pos.y, this.prevPos.x - 1, this.prevPos.y - 1)
    }

    edgeRandomKill() {
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
        }
    }
    edgeRandomPos() {
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.pos = new Vector(random(width), random(height))
            this.prevPos = this.pos.copy()
        }
    }
    edgeRandomEdge() {
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            switch (random([0, 1, 2, 3])) {
                case 0:
                    this.pos.x = random(width)
                    this.pos.y = 0
                    break
                case 1:
                    this.pos.x = width
                    this.pos.y = random(height)
                    break
                case 2:
                    this.pos.x = random(width)
                    this.pos.y = height
                    break

                case 3:
                    this.pos.x = 0
                    this.pos.y = random(height)
                    break
            }
        }
    }
    edge() {
        if (this.pos.x > width) {
            this.pos.x = 1
            this.prevPos.x = 1
        }
        else if (this.pos.x <= 0) {
            this.pos.x = width - 1
            this.prevPos.x = width - 1
        }
        if (this.pos.y > height) {
            this.pos.y = 1
            this.prevPos.y = 1
        }
        else if (this.pos.y <= 0) {
            this.pos.y = height - 1
            this.prevPos.y = height - 1
        }
    }
    edgeWebGpu(w: number, h: number) {
        if (this.pos.x > (w / 2)) this.pos.x = -w / 2
        if (this.pos.x < (-w / 2)) this.pos.x = w / 2
        if (this.pos.y > (h / 2)) this.pos.y = -h / 2
        if (this.pos.y < (-h / 2)) this.pos.y = h / 2
    }
}
