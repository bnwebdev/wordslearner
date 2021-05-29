const OPTIONS = {
    width: 600,
    height: 400,
    padding: 20,
    limits: {
        x: {
            min: -100,
            max: 100
        },
        y: {
            min: -100,
            max: 100
        }
    },
    axis: {
        x: 0,
        y: 0,
        lineWidth: 1,
        offsetX: {
            x: 0,
            y: 15 
        },
        offsetY: {
            x: -15, 
            y: 0
        },
        textSize: 10,
        color: "#000",
        step: {
            x: {
                main: 10
            }, 
            y: {
                main: 10
            }
        },
        arrow: {
            length: 13,
            width: 3
        }
    },
    point: {
        color: "#000",
        strokeColor: "#000",
        circle: {
            size: 3
        }, 
        rect: {
            size: 6
        },
        text: {
            size: 15,
            value: "+",
            baseline: "middle",
            align: "center",
            family: "monospace"
        }
    }
}
function getDefaultOptions(){
    return OPTIONS
}