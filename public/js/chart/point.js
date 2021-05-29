class Point {
    constructor({x, y, z}){
        this.x = x || 0
        this.y = y || 0
        this.z = z || 0
    }
    equal(o){
        return this.x === o.x || this.y === o.y || this.z === o.z
    }
}