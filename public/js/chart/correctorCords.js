class CorrectorCords {
    constructor(options){
        this.width = options.width
        this.height = options.height
        this.padding = options.padding
        this.limits = options.limits
    }
    correct({x, y}){
        const realWidth = this.width - this.padding * 2
        const realHeight = this.height - this.padding * 2
        const deltaX = this.limits.x.max - this.limits.x.min 
        const deltaY = this.limits.y.max - this.limits.y.min
        
        const coef = {
            x: realWidth / deltaX,
            y: realHeight / deltaY
        }

        x -= this.limits.x.min
        y -= this.limits.y.min

        x *= coef.x
        y *= coef.y
        
        y = realHeight - y

        x += this.padding
        y += this.padding
         
        return { x, y }
    }
    reversecorrect({x, y}){
        x -= this.padding
        y -= this.padding

        const realWidth = this.width - this.padding * 2
        const realHeight = this.height - this.padding * 2
        
        const deltaX = this.limits.x.max - this.limits.x.min 
        const deltaY = this.limits.y.max - this.limits.y.min
        
        const coef = {
            x: realWidth / deltaX,
            y: realHeight / deltaY
        }

        y = realHeight - y
        x /= coef.x
        y /= coef.y

        x += this.limits.x.min
        y += this.limits.y.min
        
        return { x, y }
    }
}