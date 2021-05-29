class Axis {
    constructor(corrector, axisOptions, limits, step, settingsPoint, allLimits){
        this.corrector = corrector
        this.axis = axisOptions
        this.limits = limits
        this.setpoint = settingsPoint
        this.step = step
        this.allLimits = allLimits
    }
    draw(ctx){
        let { min, max } = this.limits
        let x, y, x1, y1, x2, y2
        x1 = y1 = min
        x2 = y2 = max
        
        if(this.setpoint.x === 'change'){
            y = this.axis.y
            const ylim = this.allLimits.y
            if(y < ylim.min || y > ylim.max ) y = ylim.min
            this.drawLine(ctx, new Point({ x: x1, y }), new Point({ x: x2, y }))
        } else if(this.setpoint.y === 'change'){    
            x = this.axis.x
            const xlim = this.allLimits.x
            if(x < xlim.min || x > xlim.max ) x = xlim.min
            this.drawLine(ctx, new Point({ x, y: y1 }), new Point({ x, y: y2 }))
        } else {
            throw new Error(ctx, 'setpoint.x or .y must be defined change')
        }
    }
    drawLine(ctx, point1, point2){
        let {x: x1, y: y1} = point1
        let {x: x2, y: y2} = point2

        ctx.fillStyle = ctx.strokeStyle = this.axis.color
        const lineWidth = this.axis.lineWidth
        ctx.lineWidth = lineWidth;

        const correct = this.corrector.correct.bind(this.corrector);

        // draw lines
        (function(){
            let p1 = correct(point1)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            let p2 = correct(point2)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
        }.bind(this)());

        // draw divisions
        const leny = y2 - y1
        const lenx = x2 - x1
        const step = this.step.main

        const ix = lenx / step
        const iy = leny / step
        // main division
        for(let i = 1; i < ix; i++){
            let {x, y} = correct({x: x1 + i * step, y: y1})
            ctx.fillRect(x - 0.5 * lineWidth, y - lineWidth * 3.5, lineWidth, lineWidth * 7)
        }
        for(let i = 1; i < iy; i++){
            let {x, y} = correct({x: x1, y: y1 + i * step})
            ctx.fillRect(x - lineWidth * 3.5, y - 0.5 * lineWidth, lineWidth * 7, lineWidth)
        }
        // draw signs
        for(let i = +(x1 !== this.axis.x); i < ix; i++){
            let {x, y} = correct({x: x1 + i * step, y: y1})
            ctx.textAlign = 'left'
            ctx.textBaseline = 'top'
            ctx.fillText(`${i * step + x1}`, x + lineWidth, y + lineWidth * 3)
        }
        for(let i = +(y1 !== this.axis.y); i < iy; i++){
            let {x, y} = correct({x: x1, y: y1 + i * step})
            ctx.textAlign = 'right'
            ctx.textBaseline = 'center'
            ctx.fillText(`${i * step + y1}`, x - lineWidth * 3, y + lineWidth)
        }

        // draw arrow
        const max = this.limits.max
        const arrowLength = this.axis.arrow.length
        const arrowWidth = this.axis.arrow.width
        if(this.setpoint.x === 'change'){
            let y = this.axis.y
            const ylim = this.allLimits.y
            if(y < ylim.min || y > ylim.max ) y = ylim.min

            ctx.beginPath()
            let p = correct({x: max, y: this.axis.y})
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p.x - arrowLength, p.y + arrowWidth)
            ctx.lineTo(p.x, p.y)
            ctx.lineTo(p.x - arrowLength, p.y - arrowWidth)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
        } else {
            let x = this.axis.x
            const xlim = this.allLimits.x
            if(x < xlim.min || x > xlim.max ) x = xlim.min

            ctx.beginPath()
            let p = correct({x, y: max})
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p.x + arrowWidth, p.y + arrowLength)
            ctx.lineTo(p.x, p.y)
            ctx.lineTo(p.x - arrowWidth, p.y + arrowLength)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
        }
    }
}

class Axises {
    constructor(corrector, options){
        this.corrector = corrector
        this.options = options
        this.init()
    }
    init(){
        this.x = new Axis(
            this.corrector, 
            this.options.axis,
            this.options.limits.x, 
            this.options.axis.step.x,
            {x: 'change'},
            this.options.limits,
        )
        this.y = new Axis(
            this.corrector, 
            this.options.axis,
            this.options.limits.y, 
            this.options.axis.step.y,
            {y: 'change'},
            this.options.limits,
        )
    }
    draw(ctx){
        this.x.draw(ctx)
        this.y.draw(ctx)
    }
}