function drawPoint(ctx, point, options = {}){
    const def = getDefaultOptions()
    ctx.fillStyle = options.color || def.point.color
    ctx.strokeStyle = options.strokeColor || def.point.strokeColor
    const {x, y} = point
    ctx.beginPath()
    switch(options.type){
        case 'circle':
            ctx.arc(x, y, options.size || def.point.circle.size, 0, 2 * Math.PI)
            ctx.fill()
            break
        case 'text':
            ctx.shadowOffsetX = '0px'
            ctx.textBaseline = options.textBaseline || def.point.text.baseline
            ctx.textAlign = options.textAlign || def.point.text.align
            ctx.font = `${options.fontSize || def.point.text.size}px ${options.fontFamily || def.point.text.family}`
            ctx.fillText(options.value || def.point.text.value, x, y)
            break
        case 'rect':
        default:
            const sz = options.size || def.point.rect.size
            ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz)
    }
}