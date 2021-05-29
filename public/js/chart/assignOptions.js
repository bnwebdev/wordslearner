function assignOptions(options, defaultOptions){
    defaultOptions = Object.assign({}, defaultOptions)
    for(let prop in options){
        if(!options.hasOwnProperty(prop)) continue
        if(options[prop] instanceof Object){
            defaultOptions[prop] = assignOptions(options[prop], defaultOptions[prop])
        } else {
            defaultOptions[prop] = options[prop]
        }
    }
    return defaultOptions
}