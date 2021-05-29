const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')



function draw(ctx, {cR, cG, cB}, cS){
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 6; j++){
            ctx.fillStyle = ctx.strokeStyle = `rgb(${cR? Math.floor(255 - i * cR): 0},${cG? Math.floor(255 - (cR? j: i) * cG): 0}, ${cB? Math.floor(255 - j * cB): 0})`
            ctx.beginPath()
            ctx.arc(j * cS + cS, i * cS + cS, cS / 2.5, 0, Math.PI * 2)
            ctx.fill()
        }
    }
}
draw(ctx, {cB: 255 / 6, cG: 255 / 6}, 40)