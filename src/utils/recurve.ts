export class Recurve {
    constructor(p) {
        this.points = [p]
        this.strokeColor = '#AA4C7A'
        this.fillColor = '#2D5B8D'
    }
    addPoint(p) {
        this.points.push(p)
        if (p.x > this.points[0].x) {

        }
    }
    // perpendicular: N = (Ay - By, Bx - Ax)
    draw() {
        const delta = 10
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i]
            const p2 = this.points[i + 1]
            if (!p2) break

            const N = createVector(p1.y - p2.y, p2.x - p1.x)
            N.normalize()

            const pp4 = createVector(p1.x + N.x * 20, p1.y + N.y * 20)
            const pp3 = createVector(p2.x + N.x * 20, p2.y + N.y * 20)
            const pp1 = createVector(p1.x - N.x * 20, p1.y - N.y * 20)
            const pp2 = createVector(p2.x - N.x * 20, p2.y - N.y * 20)

            const a1 = createVector(pp1.x / 2 + pp2.x / 2 + delta, pp1.y / 2 + pp2.y / 2 - delta)
            const a2 = createVector(pp3.x / 2 + pp4.x / 2 + delta, pp4.y / 2 + pp3.y / 2 - delta)

            fill(this.fillColor)
            strokeWeight(delta * 2)
            stroke(this.strokeColor)

            beginShape()

            vertex(pp1.x, pp1.y)
            bezierVertex(a1.x, a1.y, a1.x, a1.y, pp2.x, pp2.y)
            vertex(pp3.x, pp3.y)
            bezierVertex(a2.x, a2.y, a2.x, a2.y, pp4.x, pp4.y)

            endShape(CLOSE)

        }
    }
}
