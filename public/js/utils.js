const s = selector=>document.querySelector(selector)
const ss = selector=>document.querySelectorAll(selector)

const rand = function(min = 0, max = 0) {
    if(!min && !max) return Math.random() 
    
    return Math.min(min, max) + Math.floor(rand() * (Math.max(max, min) + 1))  
} 
const LOG = value => {console.log(value); return value}

function readFileAsText(file){
    let fr = new FileReader()
    return new Promise((resolve, reject)=>{
        fr.onerror = reject
        fr.onload = ()=>resolve(fr.result)
        fr.readAsText(file, 'utf-8')
    })
}
function cutArray(arr, countElements = 1){
    if(countElements <= 0) throw new Error('count elements <= 0')
    return arr.reduce((total, curr, idx)=>{
        if(idx % countElements === 0) {
            total.push([])
        }
        const size = total.length
        total[size - 1].push(curr)
        return total
    }, [])
}