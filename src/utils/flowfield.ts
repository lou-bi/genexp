export function generateFlowField(rows, cols, inc = 0.01) {
    const flowField = []

    let yoff = 0
    for (let y = 0; y < rows; y++) {
        let xoff = 0
        flowField.push([])
        for (let x = 0; x < cols; x++) {
            const a = noise(xoff, yoff) * TAU * 2
            const v = Vector.fromAngle(a)
            v.setMag(10)

            flowField[y].push(v)

            xoff += inc
        }
        yoff += inc
    }
    return flowField
}

