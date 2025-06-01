export function generateFlowField(rows, cols, inc = 0.05) {
    const flowField = []

    let yoff = 0
    for (let y = 0; y < rows; y++) {
        let xoff = 0
        flowField.push([])
        for (let x = 0; x < cols; x++) {
            const a = noise(xoff, yoff) * PI
            const v = Vector.fromAngle(a)
            v.setMag(1)

            flowField[y].push(v)

            xoff += inc
        }
        yoff += inc
    }
    return flowField
}

