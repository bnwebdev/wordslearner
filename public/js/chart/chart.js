function getCanvas(options){
    const $canvas = document.createElement('canvas')
    $canvas.width = options.width
    $canvas.height = options.height
    return $canvas
}

class Chart {
    constructor(selector, options = {}){
        this.options = options = assignOptions(options, getDefaultOptions())

        this.$wrapper = document.querySelector(selector)
        this.canvas = getCanvas(options)
        this.ctx = this.canvas.getContext('2d')

        this.chartDB = new ChartDB()
        this.corrector = new CorrectorCords(options)
        
        this.axises = new Axises(this.corrector, options)
        this.init()
    }
    init(){
        this.$wrapper.append(this.canvas)
        this.axises.draw(this.ctx)
    }
    
    handlerPointPlace(placename, options, ids){
        const ids_ = []
        function pushId(value){
            if(value instanceof Array){
                value.forEach(pushId)
            } else {
                ids_.push(value)
            }
        }
        ids.forEach(pushId)
        ids = ids_
        ids.map(id=>this.chartDB.getPoint(placename, id))
            .forEach(p=>drawPoint(this.ctx, this.corrector.correct(p), options))
        
    }
    redraw(){
        this.ctx.clearRect(0, 0, this.options.width, this.options.height)
        this.axises.draw(ctx)
        for(let [_, pointplace] of this.pointPlaces){
            pointplace.draw()
        }
    }
    
    createPointPlace(placename, pointDrawOptions){
        const place = new PointPlace(
            placename, 
            this.chartDB, 
            pointDrawOptions, 
            this.handlerPointPlace.bind(this)
        )
        this.pointPlaces.set(placename, place)
        return this.getPointPlace(placename)
    }
    getPointPlace(placename){
        return this.pointPlaces.get(placename)
    }
    
    pointPlaces = new Map()
}