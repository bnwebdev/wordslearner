class PointPlace {
    constructor(placename, chartDB, options, handler){
        this.chartDB = chartDB
        this.placename = placename
        this.options = options
        this.handler = handler
    }
    add(points){
        const ids = this.chartDB.addPoint(this.placename, points)
        this.handler(this.placename, this.options, ids)
        return this
    }
    draw(){
        const line = this.chartDB.getLine(this.placename)
        this.handler(this.placename, this.options, Array.from(line.keys()))
    }
}