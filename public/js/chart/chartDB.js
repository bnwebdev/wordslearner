'use strict'

class ChartDB {
// public
    constructor(){}
    /* Array<Number> pointsId */ 
    addPoint(nameLine, ...points){
        let ids = points.map(p=>{
            if(p instanceof Array){
                return this.addPoint(nameLine, ...p)
            } else {
                return this._addOnePoint(nameLine, p)
            }
        })
        return ids
    }
    /* Map<Number, Point> always get line */ 
    getLine(nameLine){
        let lineId = this.linesIdByName.get(nameLine)
        const line = lineId === undefined? this._createLine(nameLine): this.dataLinesById.get(lineId)
        return line
    }
    /* Point/null */ 
    getPoint(nameLine, pointId){
        const line = this.getLine(nameLine)
        return line.get(pointId) === undefined? null: line.get(pointId)
    }
    /* Array<Number> */ 
    getPointId(nameLine, point){
        const line = this.getLine(nameLine)
        const result = []
        for(let [id, p] of line){
            if(p.equal(point)) result.push(id)
        }
        return result
    }

// private

    /* Number pointId*/ 
    _addOnePoint(nameLine, point){
        const line = this.getLine(nameLine)
        const lineId = this._getIdLine(nameLine)
        const id = this._getNewIdPoint(lineId)
        line.set(id, point)
        return id
    }
    _getIdLine(nameLine){
        return this.linesIdByName.get(nameLine)
    }
    _getNewIdPoint(lineId){
        if(this.pointid[lineId] === undefined) 
            this.pointid[lineId] = 0
        const id = this.pointid[lineId]
        this.pointid[lineId] += 1
        return id
    }
    /* Map<Number, Point> line */ 
    _createLine(nameLine){
        const id = this.lineid++
        this.linesIdByName.set(nameLine, id)
        this.dataLinesById.set(id, new Map())
        return this.dataLinesById.get(id)
    }
    /* Map<Name, Number> */ 
    linesIdByName = new Map()
    /* Map<Number, Map<Number, Point> */ 
    dataLinesById = new Map()
    lineid = 0
    pointid = []
}

(function TestChartDB(){
    const assert = function(bool, text){
        if(!bool) throw new Error(text)
    }
    String.prototype.equal = function(other){
        return other === this
    }
    const chDB = new ChartDB()
    let point1 = "hello"
    let point2 = "hi"
    let arr = chDB.addPoint('test1', point1, point2, [point1, point2], [[point2]])
    assert(chDB.getPoint('test1', arr[0]) === point1, 'test addPoint && getId')
    assert(chDB.getPoint('test1', arr[1]) === point2, 'test addPoint && getId')
    assert(chDB.getLine('test1').size === 5, `test1 line must has 5 point, cur: ${chDB.getLine('test1').size}`)
    assert(chDB.getLine('test2').size === 0, `test2 line must has 0 point, cur: ${chDB.getLine('test1').size}`)
    assert(chDB.getPointId('test1', point1).length === 2, 'point1 meet 2 time')
    assert(chDB.getPointId('test1', point2).length === 3, 'point1 meet 2 time')
    delete String.prototype.equal
})()