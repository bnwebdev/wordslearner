const chart = new Chart('#canvas', {
        width: 300, 
        height: 300, 
        limits: {
            x: {
                min: -40,
            }, 
            y: {
                min: -70
            }
        },
        axis: {
            color: 'red',
            x: -70,
            y: 0,
            lineWidth: 1,
            step: {
                x: {
                    main: 20
                },
                y: {
                    main: 20
                }
            }
        }
})
const canvas = chart.canvas
const ctx = chart.ctx
canvas.style.border = '1px solid grey';

chart.createPointPlace('test', {
    type: 'text'
}).add(new Point({x: 50, y: 90})).add(new Point({x: 50, y: 50}))

canvas.addEventListener('click', function(e){
    let {x, y} = e.target.getBoundingClientRect()
    x = e.clientX - x
    y = e.clientY - y
    const point = chart.corrector.reversecorrect({ x, y })
    chart.getPointPlace('test').add(new Point(point))
    console.log(point)
})