const s = selector=>document.querySelector(selector)
const ss = selector=>document.querySelectorAll(selector)

const rand = (min = 0, max = 0) => !min && !max? 
                                    Math.random(): 
                                    Math.min(min, max) + Math.floor(rand() * (Math.max(max, min) + 1))